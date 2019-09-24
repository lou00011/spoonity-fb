import { getFirestore, getFirebaseAuth } from './init'

const auth = getFirebaseAuth()
const dbUsers = getFirestore().collection('users')

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
  })
}

// fetchSignInMethodForEmail return list of sign-in method for the email. If the list is of 0 length then the email is not present in the system
export function isEmailPresent(email) {
  return auth.fetchSignInMethodsForEmail(email).then(v => { return v.length !== 0 })
}
