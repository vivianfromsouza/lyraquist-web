import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const LocalFirebaseClient = initializeApp(firebaseConfig);

const auth = getAuth(LocalFirebaseClient);
// const userCredential = "";
const userCredential = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("THIS IS MY USER:" + uid);
    console.log("CREDENTIAL" + user);

    // ...
  } else {
    console.log("USER GOODBYE");
    // User is signed out
    // ...
  }
});

export default LocalFirebaseClient;
