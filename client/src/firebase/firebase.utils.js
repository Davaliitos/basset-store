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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    console.log(collections)
    const transformedCollection = collections.docs.map(doc =>{
        const { title, items } = doc.data();

        return{
            routeName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;