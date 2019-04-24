import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyBTAiz0pqr_2wsEsGYctttXfRgMb1imAoM",
  authDomain: "react-git-forks.firebaseapp.com",
  databaseURL: "https://react-git-forks.firebaseio.com",
  projectId: "react-git-forks",
  storageBucket: "react-git-forks.appspot.com",
  messagingSenderId: "203069104889"
}

firebase.initializeApp(config)

const database = firebase.database()

export default database