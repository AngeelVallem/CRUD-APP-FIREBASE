import firebase from "firebase/app"
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC-2pgEmkl9u2AEzlGbIk_6PKZ4gavdbXs",
    authDomain: "fb-react-crud-dbad5.firebaseapp.com",
    databaseURL: "https://fb-react-crud-dbad5.firebaseio.com",
    projectId: "fb-react-crud-dbad5",
    storageBucket: "fb-react-crud-dbad5.appspot.com",
    messagingSenderId: "953313979547",
    appId: "1:953313979547:web:d26a9d57c8033d5a996a3e"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);


export const db = fb.firestore();