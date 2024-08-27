"use client";
import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
const Navigation = () => {
  const { data: session } = useSession();
  return (
    <div className="flex h-[10vh] w-full items-center justify-between bg-blue-700 text-white">
      <div className="mx-3">
        {!session ? (
          <button className="bg-red-600 px-10 py-2" onClick={() => signIn()}>
            Sign In
          </button>
        ) : (
          <button className="bg-blue-600 px-10 py-2" onClick={() => signOut()}>
            Sign Out
          </button>
        )}
      </div>
      <div className="mx-10">
        {session ? (
          <div className="text-center text-white">
            Welcome, <br />
            {session.user.name}
          </div>
        ) : (
          <div>Default icon </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
