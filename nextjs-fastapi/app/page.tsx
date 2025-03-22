"use client"
import Home from "./Home/page";
import { useAuth } from "@clerk/nextjs";
import LandingPage from "./Landing/page";
import { useEffect, useState } from "react";

export default function AppPage() {
  const { isSignedIn } = useAuth(); // Call useAuth as a function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn !== undefined) {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <Home />;
  }

  return <LandingPage />;
}