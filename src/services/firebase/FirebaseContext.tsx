/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import LocalFirebaseClient from "./LocalFirebaseClient";
import { useLocalStorage } from "usehooks-ts";

interface FirebaseContextType {
  currentUser: string | undefined;
  handleSignOut: () => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);
const auth = getAuth(LocalFirebaseClient);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useLocalStorage("isLoggedIn", "false");
  console.log(value)

  // function login(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setValue("false");

        console.log("SIGNED OUT");
        localStorage.setItem("isLoggedIn", "false");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  return (
    <FirebaseContext.Provider value={{ currentUser, handleSignOut }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
