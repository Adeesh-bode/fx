"use client";

import React, { useEffect, useState } from "react";
import { getV1, postV1 } from "@/lib/actions/general";
import AddProductModal from "./AddProductModal";

import styles from "./styles.module.scss";
export interface AccessoryI {
  id: string; // Assuming each product has a unique id
  accessoryName: string;
  imageUrl: string;
  accessoryType: "Clothing" | "Footwear" |"Watch" |"Handbag" |"Belt" |"Scarf" |"Sunglasses" |"Jewelry" | "Hat" |"Techwear";
  accessoryColor: "Red" | "Blue" | "Green" | "Yellow" | "Orange" | "Purple" | "Pink" | "Brown" | "Black" | "White" | "Grey";
  accessorySize: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "SIZENOTREQUIRED";
}

const MyProducts = () => {
  const [products, setProducts] = useState<AccessoryI[] | []> ([]);
  const [category, setCategory] = useState<string>("all");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const res: AccessoryI[] = await getV1("/accessory/get-accessories");
      if (Array.isArray(res)) {
        setProducts(res || []);
      }

      console.log(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>My Products</h1>

      <div className={styles.topBar}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.dropdown}
        >
          <option value="all">All</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Funky">Funky</option>
          <option value="Sporty">Sporty</option>
          <option value="Traditional">Traditional</option>
          <option value="Streetwear">Streetwear</option>
        </select>

        <button onClick={() => setShowModal(true)} className={styles.addBtn}>
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center" >{loading ? "Loading..." : "No products available."}</p>
      ) : (
        <div className={styles.grid}>
          {products
            .filter(
              (product) =>
                category === "all" || product.accessoryType === category
            )
            .map((product) => (
              <div key={product.id} className={styles.card}>
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.accessoryName || "Unnamed Product"}
                />
                <div className={styles.overlay}>
                  <p className={styles.productName}>{product.accessoryName}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchProducts}
        />
      )}
    </section>
  );
};

export default MyProducts;
