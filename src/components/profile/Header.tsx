"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="my-4 flex items-center gap-5">
      <Image
        width={125}
        height={125}
        src={session?.user?.image || ""}
        className="overflow-hidden rounded-full"
        alt="Picture of user's profile"
      />
      <div>
        <p className="text-2xl font-bold">{session.user.name}</p>
        <p className="text-base">{session.user.email}</p>
      </div>
    </div>
  );
};

export default Header;
