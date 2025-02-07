"use client"
import { signOut , useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthButtons = () => {
  const { data: session } = useSession(); // session as alias

  if (session && session?.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-gray-600">{session?.user?.name}</p>
        <Link
        //   onClick={()=>signOut()}
          href="/api/auth/signout"
          className="flex gap-4 ml-auto text-red-500"
        >
          Sign Out
        </Link>
      </div>
    );
  }
  return <div className="flex gap-4 ml-auto items-center" >
    <Link href="/api/auth/login" className="flex gap-4 ml-auto text-white text-lg lg:text-2xl hover:text-green-500 ">
        Log In
    </Link>
    <Link href="/signup" className="flex gap-4 ml-auto bg-green-500 text-white  px-3 py-2 rounded-lg text-lg lg:text-xl ">
        Sign Up
    </Link>

  </div>;
};

export default AuthButtons;
