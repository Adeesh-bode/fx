import { BACKEND_URL } from "@/utils/constants/Env";
import axios from "axios";
import React from "react";
import Rating from "@mui/material/Rating";

const ExchangeMatePage = async ({ params }: {params:{id:string}}) => {
  const { id } = params;
  let userData;
  try {
    const url = BACKEND_URL + "/users/user-details/" + id;
    const response = await axios.get(url);
    console.log(response?.data);
    userData = response?.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="h-full lg:h-screen w-full  px-5 lg:px-16 py-5 lg:py-16 ">
      <section className="w-full h-full bg-white overflow-y-auto rounded-xl ">
        <aside className=" py-8 px-5 lg:px-8 w-full lg:w-[250px] lg:h-full  flex lg:flex-col justify-between items-center lg:items-start gap-4  border-r-[1px]  border-black">
          {/* <span className="lg:w-full flex justify-center items-center">
            <img
              src={"/images/product/fashionx/avatar.png"}
              // src={userData.profileImage || "/images/product/fashionx/avatar.png"}
              alt="User Profile Image"
              className="w-32 rounded-full object-contain"
            />
          </span> */}
          <ul className="flex flex-col gap-1">
            <li>{userData.name || "Rahul Sharma"}</li>
            <li>{userData.gender || "Male"}</li>
            <li>{userData?.reviewCount || "45 reviews"}</li>
            <Rating readOnly value={userData?.rating || 3.5} precision={0.5} />
            <li>Badges:
             <span className="flex gap-2 !mt-2" >
            <img src={"/badges/fashionista.png"} alt="Eco Badge" className="w-16" />
            <img src={"/badges/sustainable.png"} alt="Eco Badge" className="w-16" />
              </span>
            </li>
          </ul>
          <span className="lg:w-full flex justify-center items-center">
            <img
              src={"/images/product/fashionx/avatar.png"}
              // src={userData.profileImage || "/images/product/fashionx/avatar.png"}
              alt="User Profile Image"
              className="w-32 rounded-full object-contain"
            />
          </span>
        </aside>
        
      </section>
    </main>
  );
};

export default ExchangeMatePage;
