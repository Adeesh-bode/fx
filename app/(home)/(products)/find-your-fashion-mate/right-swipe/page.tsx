import RightSwipe from "@/components/molecule/Page/Products/FashionMate/RightSwipe";
import React from "react";

import axios from "axios";
import { BACKEND_URL, MATCHMAKING_URL } from "@/lib/constants/Env";
import { getV1 } from "@/lib/actions/general";

export interface UserI {
  userId: string;
  height: number;
  weight: number;
  age: number;
  sizeTop: string;
  sizeBottom: string;
  preferedColor: string[];
  preferenceType: string;
}

export interface MatchedUser extends UserI {
  id: number;
}

const RightSwipePage = async () => {
  let data: MatchedUser[] = [];
  const url1= "/users/attributes";
  console.log(url1);
  const userAttributes = await getV1(url1);
  console.log(userAttributes);
  const url2 = MATCHMAKING_URL + "/match";
  console.log(url2);

  await axios
    .post(url2, userAttributes)
    .then((response) => {
      data = response.data.matches;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      console.error(error.response.data.detail);
    });

  return (
    <>
      <RightSwipe matchesData={data} />
    </>
  );
};

export default RightSwipePage;
