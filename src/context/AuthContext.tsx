import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import {
  logInWithEmailAndPassword,
  signOutUser,
  signUpWithEmailAndPassword,
} from "../services/auth";
import { auth } from "../firebaseConfig";

interface AuthContextProps {
  user: User | null;
  signUp: (email: string, password: string) => Promise<{ data: UserCredential | null , errorMessage: string | null, success: boolean }>;
  signIn: (email: string, password: string) => Promise<{ data: UserCredential | null , errorMessage: string | null, success: boolean }>;
  signOut: () => Promise<{ errorMessage: string | null, success: boolean }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await signUpWithEmailAndPassword(email, password);
      return { data: userCredential, errorMessage: null, success: true};
    } catch (err) {
      const error = err as Error;
      return { data: null, errorMessage: error.message, success: false };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await logInWithEmailAndPassword(email, password);
      return { data: userCredential, errorMessage: null, success: true};
    } catch (err) {
      const error = err as Error;
      return { data: null, errorMessage: error.message, success: false };
    }
  };
  const signOut = async () => {
    try {
      await signOutUser();
      return { errorMessage: null, success: true };
    } catch (err) {
      const error = err as Error;
      return { errorMessage: error.message, success: false };

    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
