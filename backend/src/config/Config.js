import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg-TxNJGlYDTURf8m06elb6QRjAb1yQ4s",
  authDomain: "shop-9c09c.firebaseapp.com",
  projectId: "shop-9c09c",
  storageBucket: "shop-9c09c.appspot.com",
  messagingSenderId: "878404090717",
  appId: "1:878404090717:web:8a2161ce23e56e43cec6b4",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export  { auth, db, storage, googleProvider };
