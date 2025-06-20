"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./style.module.scss";
import { postV1, putV1 } from "@/lib/actions/general";

const schema = z.object({
  profileImage: z.any().nullable(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  anonymousName: z.string().nullable().optional(),
  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .nullable()
    .optional(),
});

type FormData = z.infer<typeof schema>;

const PersonalDetails = ({
  userPersonalData,
}: {
  userPersonalData: FormData;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (userPersonalData.profileImage) {
      if (userPersonalData.profileImage instanceof File) {
        setPreview(URL.createObjectURL(userPersonalData.profileImage));
      } else if (typeof userPersonalData.profileImage === "string") {
        setPreview(userPersonalData.profileImage); // CDN URL
      }
    }
  }, [userPersonalData.profileImage]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: userPersonalData,
  });

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl = null;

      // 1. If a new file is selected, rename and upload it
      if (data.profileImage instanceof File) {
        const timestamp = Date.now();
        const ext = data.profileImage.name.split(".").pop() || "jpg";
        console.log("Timestamp:", ext);
        const newName = `${data.profileImage.name
          .split(".")[0]
          .replaceAll(" ", "_")}_${timestamp}.${ext}`;
        console.log(data.profileImage);
        const renamedFile = new File([data.profileImage], newName, {
          type: data.profileImage.type,
        });

        const formData = new FormData();
        formData.append("file", renamedFile);

        console.log(renamedFile);
        const uploadRes = await postV1("/common/upload-file", formData);
        if (uploadRes?.image_url) {
          imageUrl = uploadRes.image_url;
        } else {
          throw new Error("Image upload failed");
        }
      } else {
        // Keep existing image if unchanged
        imageUrl = userPersonalData.profileImage || "";
      }

      console.log("Image URL:", imageUrl);

      // 2. Prepare payload
      const payload = {
        name: data.name,
        anonymousName: data.anonymousName || null,
        gender: data.gender || null,
        phoneNumber: data.phoneNumber || null,
        profileImage: imageUrl,
      };

      // 3. Update API
      const updateRes = await putV1("/users/update-personal-details", payload);
      console.log(updateRes);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Personal Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {/* <h1 className={styles.heading}>Personal Details</h1> */}

        {/* Profile Image Upload */}
        <div className={styles.imageUploadWrapper}>
          {preview && (
            <img src={preview} alt="Preview" className={styles.imagePreview} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.inputFile}
          />
        </div>

        {/* Name */}
        <div className={styles.formRow}>
          <label className={styles.label}>Name</label>
          <input type="text" {...register("name")} className={styles.input} />
        </div>
        {errors.name && (
          <p className={styles.errorText}>{errors.name.message}</p>
        )}

        {/* Anonymous Name */}
        <div className={styles.formRow}>
          <label className={styles.label}>Anonymous Name</label>
          <input
            type="text"
            {...register("anonymousName")}
            className={styles.input}
          />
        </div>

        {/* Gender */}
        <div className={styles.formRow}>
          <label className={styles.label}>Gender</label>
          <select {...register("gender")} className={styles.select}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className={styles.formRow}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber")}
            className={styles.input}
          />
        </div>
        {errors.phoneNumber && (
          <p className={styles.errorText}>{errors.phoneNumber.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default PersonalDetails;
