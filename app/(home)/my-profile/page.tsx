import MyProfile from "@/feature/Pagewise/MyProfile";
import { getPersonalDetails } from "@/lib/actions";
import React from "react";

const page = async () => {
  const userData = await getPersonalDetails();
  console.log(userData);
  return <main className="flex justify-center items-center min-h-screen w-full" >
    <MyProfile userData={userData} />
  </main>;
};

export default page;
