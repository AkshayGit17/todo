import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const resp = await signInWithPopup(auth, provider);
    console.log(resp);
  } catch (error) {
    console.log("Error signing in with Google:", error);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out", error);
  }
};
