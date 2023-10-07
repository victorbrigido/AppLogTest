
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, serverTimestamp } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD1OaezIfvtv6KxhPh_BUGXanv5-WfocxM",
  authDomain: "log-auth-c31cd.firebaseapp.com",
  databaseURL: "https://log-auth-c31cd-default-rtdb.firebaseio.com",
  projectId: "log-auth-c31cd",
  storageBucket: "log-auth-c31cd.appspot.com",
  messagingSenderId: "199338007194",
  appId: "1:199338007194:web:787361298fe1cd848e1d23",
  measurementId: "G-WBJNPKT36E",
};






const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);


export { firebaseApp, auth, firestore , database, addDoc, doc, collection, deleteDoc, getDocs };


