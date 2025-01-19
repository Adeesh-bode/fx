import { fashionMateSteps } from "@/utils/constants/fashionMateSteps";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      className="w-full h-full flex flex-col md:flex-row justify-start items-start gap-8"
      //   className="w-full h-full flex flex-col md:flex-row justify-start items-start gap-8  pt-5 md:pt-8 lg:pt-16"
      aria-label="Main Section for Fashion Mate Page"
    >
      <header className="w-full h-full flex flex-col gap-6 justify-center items-start">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl lg:text-5xl">
            Find Your Lifelong Fashion Mate
          </h1>
          <p className="text-gray-500 md:text-lg lg:text-xl">
            Unite with your perfect style companion for the ultimate Fashion
            exchange!
          </p>
        </div>
        <Link href="/find-your-fashion-mate/review-preference">
          <button className="bg-transparent border-2 border-gray-500 text-black px-3 py-1 rounded-xl text-lg md:text-xl lg:text-2xl ">
            Try Now
          </button>
        </Link>
      </header>
      <aside
        aria-label="instruction for how finding fashion mate works!"
        className="h-full flex flex-col justify-center items-center gap-6 "
      >
        <h3 className="w-full flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
          How it Works!
        </h3>
        <ul className="grid grid-cols-1 gap-1 md:gap-2">
          {fashionMateSteps.map((step, index) => (
            <li key={index} className="rounded-xl p-3 bg-white shadow-md">
              <h4>{step.title}</h4>
              <p className="text-gray-500">{step.description}</p>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Hero;
