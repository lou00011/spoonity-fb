import firebase from 'firebase'
import {firebaseKey} from './secrets'

// Initialize firebase
firebase.initializeApp(firebaseKey)

// return centralized firebase instances
export function getFirestore () {
  return firebase.firestore()
}

export function getFirebaseAuth () {
  return firebase.auth()
}
