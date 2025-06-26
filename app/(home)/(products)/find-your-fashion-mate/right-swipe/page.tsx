import RightSwipe from "@/components/molecule/Page/Products/FashionMate/RightSwipe";
import React from "react";

import axios from "axios";

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
  await axios
    .post("http://localhost:8000/match", {
      sizeTop: "XS",
      sizeBottom: "XS",
      age: 0,
      weight: 0,
      height: 0,
      preferenceType: "Casual",
      preferedColor: "Red",
    })
    .then((response) => {
      data = response.data.matches;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <RightSwipe matchesData={data} />
    </>
  );
};

export default RightSwipePage;
