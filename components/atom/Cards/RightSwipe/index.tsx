import React from "react";

const RightSwipeCard = ({user}) => {
  return (
    <div
      className={`absolute bg-white w-52 md:w-56 lg:w-[350px] rounded-md overflow-hidden`}
    >
      <span className="absolute top-3 right-3 px-2 py-1 bg-gray-200 rounded-lg text-black">
        {user.type}
      </span>
      <img
        src={
          (`/images/styleType/${user.type.toLowerCase()}.jpg`) ||
           (`/images/styleType/${user.type.toLowerCase()}.webp`)
        }
        alt={user.type}
        className="w-full h-full object-cover overflow-hidden h-[180px]"
      />
      <div className="p-4 md:px-5 flex flex-col justify-start items-start gap-3">
        <span>John</span>
        <span>Age: {user.age}</span>
        <span>Height: {user.height}</span>
        <span>Weight: {user.weight}</span>
        <span>Size Top: {user.sizeTop}</span>
        <span>Size Bottom: {user.sizeBottom}</span>
        <span>Preferred Color: {user.preferredColor}</span>
      </div>
    </div>
  );
};

export default RightSwipeCard;
