import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCElRz_rGssjwtqw-waJybsT4EPmF3D58c",
    authDomain: "pi-2-pillarouyheine.firebaseapp.com",
    projectId: "pi-2-pillarouyheine",
    storageBucket: "pi-2-pillarouyheine.firebasestorage.app",
    messagingSenderId: "283081050336",
    appId: "1:283081050336:web:1c4c130e7bdcc1c5f46885"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();