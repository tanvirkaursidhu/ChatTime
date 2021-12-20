import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBPqCGyKFkZHtuj02DfSXee50UwtkWgxFs",
    authDomain: "chattime-7affb.firebaseapp.com",
    projectId: "chattime-7affb",
    storageBucket: "chattime-7affb.appspot.com",
    messagingSenderId: "827321075435",
    appId: "1:827321075435:web:33c3203baada8a0faea0ae"
  }).auth();