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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)


    const snapshot = await userRef.get()

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.error('error creating user', error.message)
        }

    }
    return userRef;
}



firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;