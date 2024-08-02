// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACY9zK3fjWw9WaodggoJ5HzUR_xAZiSe8",
  authDomain: "no-hackeamos-ni-la-puerta.firebaseapp.com",
  projectId: "no-hackeamos-ni-la-puerta",
  storageBucket: "no-hackeamos-ni-la-puerta.appspot.com",
  messagingSenderId: "519695891613",
  appId: "1:519695891613:web:2c283ebb2627e654a76874",
  measurementId: "G-7DX0PWNNK6"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase