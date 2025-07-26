// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-homes-99ccb.firebaseapp.com",
  projectId: "next-homes-99ccb",
  storageBucket: "next-homes-99ccb.firebasestorage.app",
  messagingSenderId: "180112732764",
  appId: "1:180112732764:web:de502b13ef9c6cea0cac99",
  measurementId: "G-28C06802LL",
};

// Initialize Firebase
const currentApps = getApps()
let auth:Auth
let storage:FirebaseStorage

if(!currentApps.length){
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    storage = getStorage(app)
}else{
const app = currentApps[0]
auth = getAuth(app);
storage = getStorage(app);
}


export {auth,storage}
//const analytics = getAnalytics(app);
