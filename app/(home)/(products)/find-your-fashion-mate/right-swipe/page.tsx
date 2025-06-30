import RightSwipe from "@/components/molecule/Page/Products/FashionMate/RightSwipe";
import React from "react";

import axios from "axios";
import { MATCHMAKING_URL } from "@/lib/constants/Env";
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
  let matches: MatchedUser[] = [];

  try {
    const userAttributes = await getV1("/users/attributes");

    if (!userAttributes || Object.keys(userAttributes).length === 0) {
      console.warn("User attributes are empty or invalid.");
      return <RightSwipe matchesData={[]} />;
    }

    // attributes to matchmaking service
    const { data } = await axios.post(`${MATCHMAKING_URL}/match`, userAttributes);
    matches = data.matches || [];

  } catch (error: any) {
    console.error("Error fetching match data:", error?.response?.data?.detail || error.message || error);
  }

  return <RightSwipe matchesData={matches} />;
};

export default RightSwipePage;
