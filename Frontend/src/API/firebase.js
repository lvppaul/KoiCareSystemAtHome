// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithRedirect, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGY901ggyY4ugb7tHNHGDgOKmzRUo_5oI",
  authDomain: "koi-care-system-at-home-32e49.firebaseapp.com",
  databaseURL: "https://koi-care-system-at-home-32e49-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "koi-care-system-at-home-32e49",
  storageBucket: "koi-care-system-at-home-32e49.appspot.com",
  messagingSenderId: "589677478934",
  appId: "1:589677478934:web:1b9621a2080aa95f68e137",
  measurementId: "G-JN92F1331P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, provider, signInWithRedirect, storage };