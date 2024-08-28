"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

type props = {
  children: React.ReactNode;
};

const Protected = ({ children }: props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      getSession()
        .then((session) => {
          if (!session || !session.user) {
            // router.push("/api/auth/signin");
          } else {
            setIsAuthenticated(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error checking session:", error);
          setLoading(false);
        });
    };
  
    checkSession();
  }, [router]);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-semibold text-center">
        This Page is Protected
        <br />
        Please sign in
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
