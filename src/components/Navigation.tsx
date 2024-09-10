"use client";
import React from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Mode from "./Mode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const Navigation = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-10 drop-shadow">
      <div className="flex h-[10vh] w-full items-center justify-between bg-blue-700 text-white">
        <div className="mx-3 text-xl">
          <Link href={"/"}> Home </Link>
        </div>
        <div className="flex">
          <div className="mx-3 flex items-center gap-5">
            <Mode />
          </div>
          <div className="mx-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white">
                  {session ? (
                    <>
                      Welcome, <br />
                      {session.user.name}
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {session ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <Link href={"profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => signIn()}>
                    <span>Sign In</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
