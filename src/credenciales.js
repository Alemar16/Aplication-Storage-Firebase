// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALLuZYILxtEXAJW611NOle6nkg6yp9oGs",
  authDomain: "fir-storage-react-65008.firebaseapp.com",
  projectId: "fir-storage-react-65008",
  storageBucket: "fir-storage-react-65008.appspot.com",
  messagingSenderId: "769513847477",
  appId: "1:769513847477:web:f5e58e92972c857c6b5cfc",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
