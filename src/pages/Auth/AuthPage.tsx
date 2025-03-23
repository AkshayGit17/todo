import React, { useState } from "react";
import { useNavigate } from "react-router";
import { UserCredential } from "firebase/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { useAuth } from "../../context/AuthContext";
import { displayToast } from "../../utils";

interface AuthResponse {
  data: UserCredential | null;
  errorMessage: string | null;
  success: boolean;
}

const Auth = () => {
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    let data: AuthResponse;
    e.preventDefault();

    if (isSignUp) {
      data = await signUp(email, password);
    } else {
      data = await signIn(email, password);
    }

    if (data.success) {
      displayToast({
        message: `${isSignUp ? "Signup successful!" : "Login successful!"}`,
        type: "success",
      });
      setTimeout(() => {
        navigate("/todos");
      }, 1500);
    } else {
      displayToast({ message: `${data.errorMessage}`, type: "error" });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="relative mb-6">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {!isPasswordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp((isSignUp) => !isSignUp)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
