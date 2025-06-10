import { getUserDetails } from "@/lib/actions";
import React from "react";

const page = async () => {
    const userData = await getUserDetails();
    console.log(userData);
//   console.log(access.next-authOptions.session-token);
  return <div>page:</div>;
};

export default page;
