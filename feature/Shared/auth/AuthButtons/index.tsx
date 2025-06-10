"use client"
// import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const router = useRouter();
  const { data: session } = useSession(); // session as alias
  console.log(session);
  if (session && session?.user) {
    return (
      <div className="flex gap-4 text-xl md:text-2xl">
        <p className="text-gray-600 " onClick={()=>router.push("/my-profile")}  >{session?.accessToken}</p>
        <p className="text-gray-600 " onClick={()=>router.push("/my-profile")}  >{session?.user?.email}</p>
        <Link
          // onClick={()=>signOut()}
          href="/api/auth/signout"
          className="flex gap-4 text-red-500"
        >
          Sign Out
        </Link>
      </div>
    );
  }
  return <div className="flex gap-4 items-center" >
    <Link href="/api/auth/signin" className="flex gap-4 text-black text-lg lg:text-2xl hover:text-green-500 ">
        Log In
    </Link>
    <Link href="/signup" className="flex gap-4 bg-green-500 text-white px-3 py-2 rounded-lg text-lg lg:text-xl">
        Sign Up
    </Link>

  </div>;
};

export default AuthButtons;
