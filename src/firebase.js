// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase';
 
const firebaseConfig = {
    apiKey: "AIzaSyDAObVe_cSl6kr4Mhgy_sj_94h1EOYXIgs",
  authDomain: "crud-504dc.firebaseapp.com",
  databaseURL: "https://crud-504dc-default-rtdb.firebaseio.com",
  projectId: "crud-504dc",
  storageBucket: "crud-504dc.appspot.com",
  messagingSenderId: "46809090237",
  appId: "1:46809090237:web:0be1dca810512a80518fd4",
  measurementId: "G-4TZPD04Z2E"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;