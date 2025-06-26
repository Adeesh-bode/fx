"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getV1, postV1, putV1 } from "@/lib/actions/general"; // make sure your import path is correct

const sizeEnum = ["XS", "S", "M", "L", "XL", "XXL", "SIZENOTREQUIRED"] as const;
const preferenceEnum = [
  "Casual",
  "Formal",
  "Funky",
  "Sporty",
  "Traditional",
  "Streetwear",
] as const;
const colorEnum = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Black",
  "White",
  "Grey",
] as const;

const schema = z.object({
  sizeTop: z.enum(sizeEnum),
  sizeBottom: z.enum(sizeEnum),
  age: z.number().min(1, "Age must be at least 1"),
  weight: z.number().min(1, "Weight must be at least 1"),
  height: z.number().min(1, "Height must be at least 1"),
  preferenceType: z.enum(preferenceEnum),
  preferedColor: z.enum(colorEnum),
});

type FormData = z.infer<typeof schema>;

const ReviewPreference = () => {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   sizeTop: "XS",
    //   sizeBottom: "XS",
    //   age: 23,
    //   weight: 80,
    //   height: 180,
    //   preferenceType: "Casual",
    //   preferedColor: "Red",
    // },
  });

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await getV1("/users/attributes");
        if (res && typeof res === "object" && !("error" in res)) {
          console.log("Existing user attributes:", res);
          reset(res);
          setIsUpdate(true);
        }
      } catch (error) {
        console.error("Error fetching existing user attributes:", error);
        console.log("No existing user attributes, will create new.");
      }
    };
    fetchExisting();
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    try {
      let res: any;
      console.log(data);
      if (isUpdate) {
        res = await putV1("/users/attributes", data);
      } else {
        console.log(data);
        res = await postV1("/users/attributes", data);
      }
      console.log(res);
      if (res) {
        router.push("/find-your-fashion-mate/right-swipe");
      }
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-3 p-4">
      <h1 className="text-lg md:text-2xl">Fashion Preferences</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-lg"
      >
        <label className="flex justify-between text-nowrap gap-4 ">
          Top Size:
          <select className="w-[150px] border " {...register("sizeTop")}>
            {sizeEnum.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <p className="text-red-500">{errors.sizeTop?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Bottom Size:
          <select className="w-[150px] border " {...register("sizeBottom")}>
            {sizeEnum.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <p className="text-red-500">{errors.sizeBottom?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Age:
          <input
            className="w-[150px] border "
            type="number"
            {...register("age", { valueAsNumber: true })}
          />
        </label>
        <p className="text-red-500">{errors.age?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Weight (kg):
          <input
            className="w-[150px] border "
            type="number"
            {...register("weight", { valueAsNumber: true })}
          />
        </label>
        <p className="text-red-500">{errors.weight?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Height (cm):
          <input
            className="w-[150px] border "
            type="number"
            {...register("height", { valueAsNumber: true })}
          />
        </label>
        <p className="text-red-500">{errors.height?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Preference Type:
          <select className="w-[150px] border " {...register("preferenceType")}>
            {preferenceEnum.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>
        <p className="text-red-500">{errors.preferenceType?.message}</p>

        <label className="flex justify-between text-nowrap gap-4 ">
          Preferred Color:
          <select className="w-[150px] border " {...register("preferedColor")}>
            {colorEnum.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <p className="text-red-500">{errors.preferedColor?.message}</p>

        <button
          type="submit"
          className="mt-4 bg-transparent border-2 border-gray-500 text-black px-3 py-1 rounded-xl text-lg md:text-xl lg:text-2xl"
        >
          Let&apos;s Go
        </button>
      </form>
    </main>
  );
};

export default ReviewPreference;
