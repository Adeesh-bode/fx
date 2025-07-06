/* eslint-disable */
"use client";
// import { signOut } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, LogOut } from "lucide-react";

const AuthButtons = () => {
  // const router = useRouter();
  const { data, status } = useSession(); // session as alias
  if (status === "loading") return null;
  const session: any = (data as any)?.session;
  // console.log("useSession raw output", useSession());

  // console.log(data);
  // console.log(session);
  // console.log(session?.user);
  if (session && session?.user) {
    return (
      <div className="flex items-center gap-4 text-xl md:text-2xl">
        <Bell color="white" size={30} />
        {/* <span className="relative" >
          <Image src={'/icons/in.png'} alt="Country Flag" width={40} height={40} className="w-10 h-10" />
        </span> */}
        {/* <p className="text-gray-600 " onClick={()=>router.push("/my-profile")}  >{session?.accessToken}</p> */}
        <p className="text-gray-600 ">{session?.user?.name}</p>
        <span
          className="relative rounded-full overflow-hidden"
          onClick={() => window.open("/my-profile", "_blank")}
        >
          <Image
            src={
              session?.user?.profileImage ||
              "/images/product/fashionx/avatar.png"
            }
            alt="Profile Image"
            width={40}
            height={40}
            className="w-10 h-10 aspect-square object-cover"
            unoptimized={true}
            priority
          />
        </span>
        {/* <p className="text-gray-600 " onClick={()=>router.push("/my-profile")}  >{session?.user?.email}</p> */}
        <span
          onClick={() => signOut()}
          // href="/api/auth/signout"
          className="flex gap-4 text-red-500 cursor-pointer"
        >
          {/* Sign Out */}
          <LogOut color="white" size={30} />
        </span>
      </div>
    );
  }
  return (
    <div className="flex gap-4 items-center">
      <Link
        href="/api/auth/signin"
        className="flex gap-4 text-black text-lg lg:text-2xl hover:text-green-500 "
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className="flex gap-4 bg-green-500 text-white px-3 py-2 rounded-lg text-lg lg:text-xl"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
