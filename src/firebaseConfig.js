import firebase from 'firebase/app'
import 'firebase/auth'

const APIKEY = process.env.REACT_APP_FB_APIKEY;

const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: "pruebafirebase-4ac21.firebaseapp.com",
    projectId: "pruebafirebase-4ac21",
    storageBucket: "pruebafirebase-4ac21.appspot.com",
    messagingSenderId: "220378841279",
    appId: "1:220378841279:web:faec83e491bfb5b848c60a",
    measurementId: "G-E5WP6WFPPJ"
};

// Initialize Firebase
const inicializarFirebase = firebase.initializeApp(firebaseConfig);
const auth = inicializarFirebase.auth()
// firebase.analytics();

export { auth }