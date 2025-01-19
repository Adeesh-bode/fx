"use client";
import RightSwipeCard from "@/components/atom/Cards/RightSwipe";
import React, { useState } from "react";

const RightSwipe = ({ matchesData }: { matchesData: any }) => {
  const [matches, setMatches] = useState(matchesData);

  const handleNext = () => {
    console.log("next");
    if (matches.length > 0) {
      setMatches(matches.slice(1));
    }
  };

  const handleRedirection = () => {
    console.log("redirection");
    if (matches.length > 0) {
      const currentMatch = matches[0];
      window.open(`/products/fashion-mate/${currentMatch.userId}`, "_blank");
    }
  };

  const currentMatch = matches.length > 0 ? matches[0] : null;

  return (
    <div className="relative flex justify-center items-center h-full w-full">
      <span className="text-[120px] cursor-pointer " onClick={handleNext}>
        -
      </span>
      <div className="relative flex justify-center items-center h-2/3 overflow-hidden w-[40%]">
        {matches.length === 0 ? (
          <span>No match</span>
        ) : (
          <RightSwipeCard user={currentMatch} />
        )}
      </div>
      <span className="text-[120px] cursor-pointer" onClick={handleRedirection}>
        +
      </span>
    </div>
  );
};

export default RightSwipe;
