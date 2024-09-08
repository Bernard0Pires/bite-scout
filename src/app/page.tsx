"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, loading] = useAuthState(auth); // Include loading state
  const [checkingSession, setCheckingSession] = useState(true); // State to handle session check
  const router = useRouter();

  useEffect(() => {
    // This ensures the code runs only on the client side
    if (typeof window !== "undefined") {
      const userSession = sessionStorage.getItem("user");

      if (!user && !userSession) {
        router.push("/auth");
      } else {
        setCheckingSession(false); // Done checking session
      }
    }
  }, [user, router]); // Runs when `user` or `router` changes

  const handleSignOut = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
  };

  if (loading || checkingSession) {
    return null; // Or a loading spinner, e.g., <LoadingSpinner />
  }

  return (
    <main>
      <button onClick={handleSignOut}>Sign Out</button>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        Test
      </div>
    </main>
  );
}
