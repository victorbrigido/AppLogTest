
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, serverTimestamp } from "firebase/firestore";

//Coloque as suas informações e chaves aqui *****

const firebaseConfig = {
  apiKey: "*****************************",
  authDomain: "**************************",
  databaseURL: "*************************",
  projectId: "*************************",
  storageBucket: "*************************",
  messagingSenderId: "*************************",
  appId: "*************************",
  measurementId: "*************************",
};






const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);


export { firebaseApp, auth, firestore , database, addDoc, doc, collection, deleteDoc, getDocs };


