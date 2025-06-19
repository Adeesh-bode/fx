// FIXME: Improve cards hovering details show and zoom in effect image 
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postV1 } from "@/lib/actions/general";
import styles from "./styles.module.scss";

const schema = z.object({
  accessoryName: z
    .string()
    .min(3, "Product name must be at least 3 characters"),
  accessoryType: z.enum([
    "Casual",
    "Formal",
    "Funky",
    "Sporty",
    "Traditional",
    "Streetwear",
  ]),
  accessoryColor: z.enum([
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
  ]),
  accessorySize: z.enum(["XS", "S", "M", "L", "XL", "XXL", "SIZENOTREQUIRED"]),
  image: z.any().nullable(),
});

type FormData = z.infer<typeof schema>;

const AddProductModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accessoryName: "",
      accessoryType: "Casual",
      accessoryColor: "Black",
      accessorySize: "SIZENOTREQUIRED",
      image: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let imageUrl = "";

      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image);
        const upload = await postV1("/common/upload-file", formData);
        console.log(upload);
        if (!upload?.image_url) throw new Error("Image upload failed");
        imageUrl = upload.image_url;
      }

      const payload = {
        accessoryName: data.accessoryName,
        accessoryType: data.accessoryType,
        accessoryColor: data.accessoryColor,
        accessorySize: data.accessorySize,
        imageUrl,
      };

      const res = await postV1("/accessory/add-accessory", payload);
      console.log(res);
      onSuccess();
      onClose();
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add Product</h2>

        {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>Product Name</label>
            <input
              placeholder="Appealing Product Name"
              {...register("accessoryName")}
              className={styles.input}
            />
          </div>
          {errors.accessoryName && (
            <p className={styles.errorText}>{errors.accessoryName.message}</p>
          )}

          <div className={styles.formRow}>
            <label className={styles.label}>Type</label>
            <select {...register("accessoryType")} className={styles.select}>
              {schema.shape.accessoryType.options.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Color</label>
            <select {...register("accessoryColor")} className={styles.select}>
              {schema.shape.accessoryColor.options.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Size</label>
            <select {...register("accessorySize")} className={styles.select}>
              {schema.shape.accessorySize.options.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
            />
          </div>

          {preview && (
            <img src={preview} className={styles.preview} alt="Preview" />
          )}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.actionButton}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
