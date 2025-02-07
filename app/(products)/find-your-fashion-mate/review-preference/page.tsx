"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import React from 'react';

import { useRouter } from 'next/navigation';

const sizeEnum = ["XS", "S", "M", "L", "XL", "XXL", "SIZENOTREQUIRED"] as const ;
const preferenceEnum = ["Casual", "Formal", "Funky", "Sporty", "Traditional", "Streetwear"] as const;
const colorEnum = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Grey"] as const;

const schema = z.object({
  sizeTop: z.enum(sizeEnum),
  sizeBottom: z.enum(sizeEnum),
  age: z.number().min(1, "Age must be at least 1"),
  weight: z.number().min(1, "Weight must be at least 1"),
  height: z.number().min(1, "Height must be at least 1"),
  type: z.enum(preferenceEnum),
  preferedColor: z.enum(colorEnum),
});

const ReviewPreference = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      sizeTop: "XS",
      sizeBottom: "XS",
      age: 23,
      weight: 80,
      height: 180,
      type: "Casual",
      preferedColor: "Red",
    }
  });

  const onSubmit = (data : any) => {
    console.log(data);
    router.push("/find-your-fashion-mate/right-swipe");
    // TODO: Save data to server

  };

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-lg'>
        <label className='flex justify-between text-nowrap gap-4 ' >Top Size:
          <select className='w-[150px] border ' {...register("sizeTop")}>
            {sizeEnum.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <p className='text-red-500'>{errors.sizeTop?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Bottom Size:
          <select className='w-[150px] border ' {...register("sizeBottom")}>
            {sizeEnum.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <p className='text-red-500'>{errors.sizeBottom?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Age:
          <input className='w-[150px] border ' type='number' {...register("age", { valueAsNumber: true })} />
        </label>
        <p className='text-red-500'>{errors.age?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Weight (kg):
          <input className='w-[150px] border ' type='number' {...register("weight", { valueAsNumber: true })} />
        </label>
        <p className='text-red-500'>{errors.weight?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Height (cm):
          <input className='w-[150px] border ' type='number' {...register("height", { valueAsNumber: true })} />
        </label>
        <p className='text-red-500'>{errors.height?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Preference Type:
          <select className='w-[150px] border ' {...register("type")}>
            {preferenceEnum.map(pref => <option key={pref} value={pref}>{pref}</option>)}
          </select>
        </label>
        <p className='text-red-500'>{errors.type?.message}</p>

        <label className='flex justify-between text-nowrap gap-4 ' >Preferred Color:
          <select className='w-[150px] border ' {...register("preferedColor")}>
            {colorEnum.map(color => <option key={color} value={color}>{color}</option>)}
          </select>
        </label>
        <p className='text-red-500'>{errors.preferedColor?.message}</p>

        {/* <Link href="/find-your-fashion-mate/right-swipe"> */}
        <button type='submit' className='mt-4 bg-transparent border-2 border-gray-500 text-black px-3 py-1 rounded-xl text-lg md:text-xl lg:text-2xl'>
          Let&apos;s Go
        </button>
      {/* </Link> */}

        {/* <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Submit</button> */}
      </form>
      

    </main>
  );
};

export default ReviewPreference;