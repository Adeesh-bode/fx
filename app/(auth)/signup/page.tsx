"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signupSchema, SignUptype } from "@/utils/validations/signup";

export default function SignUpForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUptype>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUptype) => {
    console.log("Form submitted:", data);

    setTimeout(() => {
      setServerMessage(`Welcome, ${data.name}! Your account has been created.`);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex justify-center items-center" >
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 border-2 rounded-lg bg-white/40 backdrop-blur-lg shadow-lg"
      >
      <h1 className="text-center text-3xl font-bold text-black">Sign Up</h1>
      <label>
        Name:
        <input
          {...register("name")}
          className="border p-2 w-full"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>

      <label>
        Email:
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>

      <label>
        Password:
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>

      {serverMessage && <p className="text-green-500">{serverMessage}</p>}
    </form>
    </div>

  );
}
