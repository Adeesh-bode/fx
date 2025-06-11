"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { logInSchema , LogIntype } from "@/lib/validations/login";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


export default function LogInPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogIntype>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogIntype) => {
    console.log("Form submitted:", data);

    const res = await signIn("login",{
      email: data.email,
      password: data.password,
      redirect:true,
      callbackUrl: callbackUrl,
    })

    console.log(res);
    if (!res?.ok) throw new Error('Invalid Credentials')


    setTimeout(() => {
      setServerMessage(`Welcome, Successfully Logged In.`);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex justify-center items-center" >
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 border-2 rounded-lg bg-white/40 backdrop-blur-lg shadow-lg"
      >
      <h1 className="text-center text-3xl font-bold text-black">Login In</h1>

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
        {isSubmitting ? "Submitting..." : "Login In"}
      </button>
      <p className=" text-center">Not Registered? <Link href={`/signup?callbackUrl=${callbackUrl}`}className="text-green-500" >Sign Up</Link></p>
      {serverMessage && <p className="text-green-500">{serverMessage}</p>}
    </form>
    </div>

  );
}
