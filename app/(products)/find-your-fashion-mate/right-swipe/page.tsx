import RightSwipe from "@/components/molecule/Page/Products/FashionMate/RightSwipe";
import React from "react";

import axios from "axios";

export interface UserI {
  userId : string;
  height: number;
  weight: number;
  age: DoubleRange;
  sizeTop: string;
  sizeBottom:string;
  preferredColor : string[];
  type: string;
}

export interface MatchedUser extends User {
  id: number;
}

const RightSwipePage = async () => {
  let data: MatchedUser[] = [];
  await axios
    .post("http://localhost:8000/match", {
      "sizeTop": "XS",
      "sizeBottom": "XS",
      "age": 23,
      "weight": 80,
      "height": 180,
      "type": "Casual",
      "preferedColor": "Red"
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
