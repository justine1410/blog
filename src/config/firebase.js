import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxB5HOTabt1a0qYhEwsnpK9Sq46G9qWGs",
    authDomain: "blog-react-9fec8.firebaseapp.com",
    databaseURL: "https://blog-react-9fec8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blog-react-9fec8",
    storageBucket: "blog-react-9fec8.appspot.com",
    messagingSenderId: "1060588488849",
    appId: "1:1060588488849:web:cf7a8281cbd4670756d730",

  };
  
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire