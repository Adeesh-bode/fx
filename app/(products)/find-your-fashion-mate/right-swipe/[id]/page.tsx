"use client";
// TODO: Modularize
import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { BiDownArrow } from "react-icons/bi";
import { fetchUser } from "@/utils/actions";
import { swapProductI, swapProducts } from "@/utils/constants/swapProducts";
import { IoIosCloseCircleOutline, IoMdSend } from "react-icons/io";

interface Message {
  id: string;
  body: string;
  date: string;
  userId: string;
  media: string;
}

const templateMessages = [
  "I want to exchange",
  "I want to buy",
  "Is this available?",
  "Got matched with you? I wanna swap this",
];

const ExchangeMatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(), 
      body: text,
      date: new Date().toISOString(),
      userId: id,
      media: "",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(()=>{
    setMessages([]);
  },[id, selectedProduct])

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUser(id);
      if (data?.error) {
        setError(data.error);
      } else {
        setUserData(data);
      }
      setLoading(false);
    };

    getUserData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="h-full lg:h-screen w-full md:w-[80%] lg:w-[70%] mx-auto py-5 md:py-10 lg:py-16">
      <section className="w-full h-full bg-white flex rounded-xl ">
        <aside className=" flex-shrink-0 py-8 px-5 lg:px-8 w-full lg:w-[250px] lg:h-full flex lg:flex-col justify-between items-center lg:items-start gap-4 border-r-[1px] border-black">
          <ul className="flex flex-col gap-1 text-base  md:text-lg">
            <li className="font-semibold">
              {userData?.name || "Rahul Sharma"}
            </li>
            <li>{userData?.gender || "Male"}</li>
            <li>{userData?.reviewCount || "45 reviews"}</li>
            <Rating readOnly value={userData?.rating || 3.5} precision={0.5} />
            <li>
              Badges:
              <span className="flex gap-2 mt-2">
                <img
                  src="/badges/fashionista.png"
                  alt="Fashionista Badge"
                  className="w-16"
                />
                <img
                  src="/badges/sustainable.png"
                  alt="Sustainable Badge"
                  className="w-16"
                />
              </span>
            </li>
          </ul>
          <span className="lg:w-full flex justify-center items-center">
            <img
              src={"/images/product/fashionx/avatar.png"}
              alt="User Profile Image"
              className="w-28 lg:w-36 rounded-full object-contain"
            />
          </span>
        </aside>

        {/* Message box */}

        {selectedProduct && (
          <div className="flex flex-col justify-center items-center h-full border-r-[1px] border-black">
            <div className="relative w-full text-left text-base md:text-lg px-2 lg:px-3 py-2  border-b-2 border-gray-600/40">
              <IoIosCloseCircleOutline
                className="absolute top-3 right-3 text-black"
                onClick={() => setSelectedProduct(null)}
                size={20}
              />
              {selectedProduct.name.length > 25
                ? selectedProduct.name.slice(0, 25) + "..."
                : selectedProduct.name}
            </div>
            <div className="w-full h-full flex flex-col gap-2 justify-start items-end p-2 ">
              {messages.length > 0 &&
                messages.map((msg, index) => (
                  <div key={index} className="">
                    <span className={`w-full text-center px-2 py-1 h-6 text-sm rounded-md bg-green-300/40  ${msg.userId==id? "text-right self-end " : "text-left self-start"}`}>
                      {msg.body}
                    </span>
                  </div>
                ))}
            </div>

            {messages.length === 0 && (
              <div className="w-full h-full text-base text-gray-300 flex flex-col justify-center items-center overflow-y-auto">
                no message
              </div>
            )}

            {/* Template Message Buttons */}
            <div className="w-full px-2 py-2 lg:px-4 lg:py-3 flex flex-wrap gap-1 items-stretch">
              {templateMessages.map((msg) => (
                <button
                  key={msg}
                  onClick={() => addMessage(msg)}
                  className="text-center px-2 h-6 text-sm rounded-md bg-gray-300/40"
                >
                  {msg}
                </button>
              ))}
            </div>

            <div className="w-full h-12 lg:h-16 flex px-2 lg:px-4 pb-2">
              <input
                type="text"
                className="w-full  h-full border-2 border-gray-500/40 text-base px-2"
                placeholder="enter message"
                onClick={(e: React.FormEvent<HTMLInputElement>)=>addMessage(e.currentTarget.value)}
              ></input>
              <span className="w-10 h-10 flex justify-center items-center bg-green-500 ">
                <IoMdSend className="text-black" size={20} />
              </span>
            </div>
            <div className="w-full flex gap-3 py-2 px-2 lg:px-4 ">
              <button className="w-full bg-green-500/70 text-white px-2 py-2 rounded-md ">
                Swap Request
              </button>
              
              <button className="w-full bg-green-500/70 text-white px-2 py-2 rounded-md text-nowrap ">
                Purchase Request
              </button>

            </div>
          </div>
        )}

        {/* swap pruducts listed */}

        <div className=" relative w-full h-full overflow-hidden">
          <span
            className="w-16 h-16 rounded-full bg-white flex justify-center items-center fixed bottom-24 right-36 cursor-pointer"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ top: 200, behavior: "smooth" });
              }
            }}
          >
            <BiDownArrow className="text-black" size={35} />
          </span>
          <div
            ref={scrollRef}
            className="h-full w-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] "
          >
            {swapProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => setSelectedProduct(product)}
                className="w-full h-full flex flex-col justify-center items-center "
              >
                <img
                  src={`/images/product/fashionx/Outfits/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover overflow-hidden"
                />
                {/* <div className="w-full h-full flex flex-col justify-center items-center px-3 py-3 ">
                <span className="text-center text-lg">{product.name}</span>
                <span className="text-center text-lg">{product.type}</span>
                <span className="text-center text-lg">{product.status}</span>
              </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExchangeMatePage;
