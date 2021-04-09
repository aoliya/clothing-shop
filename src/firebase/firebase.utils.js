import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC4unLEvSUJdYnKiGsD0vrFcEVkGkUZZL8",
    authDomain: "crwn-db-65348.firebaseapp.com",
    projectId: "crwn-db-65348",
    storageBucket: "crwn-db-65348.appspot.com",
    messagingSenderId: "965716832166",
    appId: "1:965716832166:web:4bdc622638aa8ab1c36967",
    measurementId: "G-BKCHK3JT5W"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;