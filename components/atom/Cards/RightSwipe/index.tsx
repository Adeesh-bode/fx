import React from "react";
import { motion } from "motion/react";
import { MatchedUser } from "@/app/(home)/(products)/find-your-fashion-mate/right-swipe/page";

const RightSwipeCard = ({ user }: { user: MatchedUser }) => {
  return (
    <motion.div
      key={user.id}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute bg-white w-52 md:w-56 lg:w-[350px] rounded-md overflow-hidden`}
    >
      <span className="absolute top-3 right-3 px-2 py-1 bg-gray-200 rounded-lg text-black">
        {user.preferenceType}
      </span>
      <img
        src={
          `/images/styleType/${user.preferenceType.toLowerCase()}.jpg` ||
          `/images/styleType/${user.preferenceType.toLowerCase()}.webp`
        }
        alt={user.preferenceType}
        className="w-full object-cover overflow-hidden !h-[180px]"
      />
      <div className="p-4 md:px-5 flex flex-col justify-start items-start gap-3">
        {/* <span>John</span> */}
        <span>Age: {user.age}</span>
        <span>Height: {user.height}</span>
        <span>Weight: {user.weight}</span>
        <span>Size Top: {user.sizeTop}</span>
        <span>Size Bottom: {user.sizeBottom}</span>
        <span>Preferred Color: {user.preferedColor}</span>
      </div>
    </motion.div>
  );
};

export default RightSwipeCard;
