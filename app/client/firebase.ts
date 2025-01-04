import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'

const FB_API_KEY = process.env.NEXT_PUBLIC_FB_API_KEY ?? ''

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: 'arcmindagent.firebaseapp.com',
  projectId: 'arcmindagent',
  storageBucket: 'arcmindagent.firebasestorage.app',
  messagingSenderId: '83382664586',
  appId: '1:83382664586:web:3be0cc8e4f753a73779c73',
  measurementId: 'G-1JV6P2PF37',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

const FB_AUTH_DEFAULT_USER_EMAIL = process.env.NEXT_PUBLIC_FB_AUTH_DEFAULT_USER_EMAIL ?? ''
const FB_AUTH_DEFAULT_USER_PASSWORD = process.env.NEXT_PUBLIC_FB_AUTH_DEFAULT_USER_PASSWORD ?? ''

const auth = getAuth()

export const loginToDefaultUser = async (): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    FB_AUTH_DEFAULT_USER_EMAIL,
    FB_AUTH_DEFAULT_USER_PASSWORD
  )

  return userCredential
}
