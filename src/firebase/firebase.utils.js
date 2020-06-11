import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyCf7JmucA3aUesde0vt5TJCosGnTZDvd2Q",
  authDomain: "weconnect-5903d.firebaseapp.com",
  databaseURL: "https://weconnect-5903d.firebaseio.com",
  projectId: "weconnect-5903d",
  storageBucket: "weconnect-5903d.appspot.com",
  messagingSenderId: "567355468744",
  appId: "1:567355468744:web:3d691910e16c68e0652efd",
  measurementId: "G-LQ0H7TGJPM"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export default firebase

