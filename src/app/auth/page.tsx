"use client";

import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { verifyPasswordRequirements } from "@/utility/verifications/authAuxilaryFunctions";
import { useRouter } from "next/navigation";

export default function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    // Reset all inputs when toggling between sign-in and sign-up
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp && verifyPasswordRequirements(password, confirmPassword)) {
      try {
        const res = await createUserWithEmailAndPassword(email, password);
        sessionStorage.setItem('user', "true")
        console.log({ res });
        setEmail("");
        setPassword("");
        return;
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem('user', "true")
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          onClick={toggleMode}
          className="w-full text-sm text-indigo-600 hover:underline"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
