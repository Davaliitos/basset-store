import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBlHtmHfc1U8PYpRH1XRowPILEISJCg5k4",
    authDomain: "basset-store.firebaseapp.com",
    databaseURL: "https://basset-store.firebaseio.com",
    projectId: "basset-store",
    storageBucket: "basset-store.appspot.com",
    messagingSenderId: "608887315281",
    appId: "1:608887315281:web:edc6bf8dc7fbe77fe51170",
    measurementId: "G-C3CBH5BF81"
};

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;