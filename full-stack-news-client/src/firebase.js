// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp3YI_eCgKpaX0GcSoOHCLcfyihC-aP1E",
  authDomain: "full-stack-news.firebaseapp.com",
  projectId: "full-stack-news",
  storageBucket: "full-stack-news.appspot.com",
  messagingSenderId: "841677928599",
  appId: "1:841677928599:web:b3dffe677de903743f11d2",
  measurementId: "G-B00YKX406W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

    }).catch((error) => {
        console.log(error);
    });
};