import { getUserDetails } from "@/lib/actions";
import React from "react";

const page = async () => {
    const userData = await getUserDetails();
    console.log(userData);
  return <div>page:</div>;
};

export default page;
