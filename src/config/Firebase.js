// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVl75-B3PlytBu0vCV9M6T6zxD33iz-1M",
  authDomain: "firecontactapp-77ab8.firebaseapp.com",
  projectId: "firecontactapp-77ab8",
  storageBucket: "firecontactapp-77ab8.firebasestorage.app",
  messagingSenderId: "714941189405",
  appId: "1:714941189405:web:ab17fbe2f044cbdb62e5f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
