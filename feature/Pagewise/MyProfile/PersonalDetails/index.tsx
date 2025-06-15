"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./style.module.scss";

const schema = z.object({
  profileImage: z.any().nullable(),
  name: z.string().email("Invalid email address"),
  anonymousName: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other"]).nullable().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .nullable()
    .optional(),
});

type FormData = z.infer<typeof schema>;

const PersonalDetails = ({ userPersonalData }: { userPersonalData: FormData }) => {
  const [preview, setPreview] = useState<string | null>(
    userPersonalData.profileImage ? URL.createObjectURL(userPersonalData.profileImage) : null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: userPersonalData,
  });

  const onSubmit = (data: FormData) => {
    console.log("PATCH data:", data);
    // PATCH API call logic here
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h1 className={styles.heading}>Personal Details</h1>

      {/* Profile Image */}
      <div className={styles.formField}>
        <label>Profile Image</label>
        <div className={styles.imageUploadWrapper}>
          {preview && <img src={preview} alt="Preview" className={styles.imagePreview} />}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputFile}
          />
        </div>
      </div>

      {/* Email */}
      <div className={styles.formField}>
        <label>Email</label>
        <input type="email" {...register("name")} className={styles.inputField} />
        {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
      </div>

      {/* Anonymous Name */}
      <div className={styles.formField}>
        <label>Anonymous Name</label>
        <input type="text" {...register("anonymousName")} className={styles.inputField} />
      </div>

      {/* Gender */}
      <div className={styles.formField}>
        <label>Gender</label>
        <select {...register("gender")} className={styles.inputField}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone Number */}
      <div className={styles.formField}>
        <label>Phone Number</label>
        <input type="text" {...register("phoneNumber")} className={styles.inputField} />
        {errors.phoneNumber && (
          <p className={styles.errorText}>{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Submit */}
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </form>
  );
};

export default PersonalDetails;
