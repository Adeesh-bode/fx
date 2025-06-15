"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./style.module.scss";

const schema = z.object({
  profileImage: z.any().nullable(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  anonymousName: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other"]).nullable().optional(),
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
  const [preview, setPreview] = useState<string | null>(
    userPersonalData.profileImage
      ? URL.createObjectURL(userPersonalData.profileImage)
      : null
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

  import { postV1, putV1 } from "@/lib/api/v1"; // adjust path if needed

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl = null;

      // 1. Upload new profile image (if changed)
      if (data.profileImage instanceof File) {
        const formData = new FormData();
        formData.append("image", data.profileImage);

        const uploadRes = await postV1("/common/upload-image", formData);
        if (uploadRes?.image_url) {
          imageUrl = uploadRes.image_url;
        } else {
          throw new Error("Image upload failed");
        }
      } else {
        // Keep the previous image if not updated
        imageUrl = userPersonalData.profileImage;
      }

      // 2. Prepare the final payload
      const payload = {
        name: data.name,
        anonymousName: data.anonymousName || null,
        gender: data.gender || null,
        phoneNumber: data.phoneNumber || null,
        profileImage: imageUrl || null,
      };

      // 3. Update user details
      const updateRes = await putV1("/users/update-personal-details", payload);

      if (updateRes?.success || updateRes?.status === "ok") {
        alert("Details updated successfully!");
      } else {
        console.warn("Unexpected response:", updateRes);
        alert("Update may have failed. Please check console.");
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h1 className={styles.heading}>Personal Details</h1>

      {/* Profile Image */}
      <div className={styles.formField}>
        <label>Profile Image</label>
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
      </div>

      {/* Name */}
      <div className={styles.formField}>
        <label>Name</label>
        <input
          type="text"
          {...register("name")}
          className={styles.inputField}
        />
        {errors.name && (
          <p className={styles.errorText}>{errors.name.message}</p>
        )}
      </div>

      {/* Anonymous Name */}
      <div className={styles.formField}>
        <label>Anonymous Name</label>
        <input
          type="text"
          {...register("anonymousName")}
          className={styles.inputField}
        />
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
        <input
          type="text"
          {...register("phoneNumber")}
          className={styles.inputField}
        />
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
