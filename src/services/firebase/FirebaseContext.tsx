import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import LocalFirebaseClient from "./LocalFirebaseClient";

const initialValues = {
  currentUser: "",
  // getUser: "",
  // login: "",
  // signOut: "",
};
const FirebaseContext = createContext(initialValues);
const auth = getAuth(LocalFirebaseClient);

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<string>();
  const [loading, setLoading] = useState(true);

  // function login(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  // function signOut() {
  //   return auth.signOut();
  // }

  //   function signUp(email, password) {
  //     return auth.createUserWithEmailAndPassword(email, password);
  //   }

  // function getUser() {
  //   return auth.currentUser;
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser(user.uid);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser : currentUser || "",
    // getUser,
    // login,
    // signOut,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
