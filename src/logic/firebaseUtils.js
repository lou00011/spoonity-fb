import { getFirestore, getFirebaseAuth } from './init'
import { cleanPhoneNumber } from './utils'

const auth = getFirebaseAuth()
const dbUsers = getFirestore().collection('users')
const dbDiaries = getFirestore().collection('diaries')

/**
Function used to register an account
@param:
an object o with the following structure:
{ email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string }

@return: Promise<UserCredential>
*/

export function register(o) {
  createAccount(o.email, o.password)
    .then(userCredential => pushAdditionalRegInfo(userCredential.user.uid, o.firstName, o.lastName, o.phoneNumber))
}

function createAccount(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

function pushAdditionalRegInfo(userid, firstName, lastName, phoneNumber) {
  const document = dbUsers.doc(userid)
  document.set({
    'firstName': firstName,
    'lastName': lastName,
    'phoneNumber': phoneNumber
  }).then(console.log('data written to firestore'))
}

/**
  returns list of sign-in method for the email
  @param: String
  @return: Promise<Boolean>, with true = email exists
*/

export function isEmailPresent(email) {
  return auth.fetchSignInMethodsForEmail(email).then(v => { return v.length !== 0 })
}

/**
 * Checks authentication status of the current session
 * @param: none
 * @return: boolean with false denoting unauthenticated session
 */
export function isSessionAuthenticated() {
  return auth.currentUser !== null
}

/**
  Login an existing user
  @param: (String, String)
  @return: Promise<T>, where T = UserCredential | ErrorObject containing errorCode and errorMsg property
*/
export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password).catch(
    function (error) {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    }
  )
}

/**
  Login an existing user
  @param:  Callback function, typically this is a redirection to homepage
  @return: void | Promise<T>, where T = ErrorObject containing ErrorCode and errorMsg property
*/
export function signout() {
  return auth.signOut().catch(function (error) {
    return {
      errorCode: error.code,
      errorMessage: error.message
    }
  })
}

/**
 * @param: return info of user currently logged in
 * @return an objec with the following structure:
 * { email: string,
 *   firstName: string,
 *   lastName: string,
 *   phoneNumber: string
 * }
 * on failure, all fields of the above structure contain null
 */
export async function getCurrentUserInfo() {
  const currentUser = auth.currentUser
  if (currentUser) {
    let a = await getUserInfoFromDB(currentUser.uid)
    let b = await a.get()
    let data = await b.data()

    return {
      email: currentUser.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber
    }
  }
  return null
}

export function updateCurrentUserInfo(o) {
  const userid = auth.currentUser.uid
  pushAdditionalRegInfo(userid, o.firstName, o.lastName, cleanPhoneNumber(o.phoneNumber))
  console.log('Updated user info')
}

function getUserInfoFromDB(userid) {
  return dbUsers.doc(userid)
}

// Diary functions
export function addUserDiaryEntry(title, text) {
  const userid = auth.currentUser.uid
  console.log(`${title}, ${text}`)
  console.log(userid)
  console.log(dbDiaries.doc(userid).collection('entries'))
  const timestr = Date.now().toString()
  dbDiaries.doc(userid)
    .collection('entries')
    .doc(timestr)
    .set({
      title: title,
      text: text,
      created: timestr
    })
    .then(() => console.log('entry added'))
}

export function deleteUserDiaryEntry(entryid) {
  const userid = auth.currentUser.uid
  dbDiaries.doc(userid)
    .collection('entries')
    .doc(entryid)
    .delete()
    .then(() => console.log('entry deleted'))
}

export async function getCurrentUserDiaries() {
  const userid = auth.currentUser.uid
  // console.log(dbDiaries.doc(userid).collection('entries').get())
  const snapshot = await dbDiaries.doc(userid)
    .collection('entries')
    .orderBy('created', 'desc')
    .get()

  const result = await snapshot.docs.reduce((accumulator, element) => {
    return [...accumulator, { id: element.id, data: element.data() }]
  }, [])

  return result
}
