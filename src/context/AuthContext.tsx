import React, { createContext, useState } from "react";
import { User } from "firebase/auth";
import {
  logInWithEmailAndPassword,
  signOutUser,
  signUpWithEmailAndPassword,
} from "../services/auth";

interface AuthContextProps {
  user: User | null;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    try {
      await signUpWithEmailAndPassword(email, password);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await logInWithEmailAndPassword(email, password);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };
  const signOut = async () => {
    try {
      await signOutUser();
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
