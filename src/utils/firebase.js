import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAKhlOxWp7TTZRwuCA7JcwdrYaXrAxCCs8",
    authDomain: "rawbloom-51270.firebaseapp.com",
    databaseURL: "https://rawbloom-51270-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rawbloom-51270",
    storageBucket: "rawbloom-51270.appspot.com",
    messagingSenderId: "238709112229",
    appId: "1:238709112229:web:72c5edf0f3a9b3ca09bc4c",
    measurementId: "G-2CPZ7N11W9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
