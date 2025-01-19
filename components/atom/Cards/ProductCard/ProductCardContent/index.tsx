import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { ProductDataI } from "@/utils/interface/shared";
import { useRouter } from "next/navigation";

const ProductCardContent = ({
  name,
  description,
  imagePath,
  color,
  redirectionPath,
}: ProductDataI) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(redirectionPath);
  };
  return (
    <div className={styles.ProductCardContent} onClick={handleClick}>
      <span
        style={{ background: color, display: "hidden", position: "absolute" }}
      ></span>
      <div className={styles.cardHeader}>
        <Image
          src={`${imagePath}` || "/default.svg"}
          alt={name}
          width={60}
          height={60}
          className="opacity-65"
        />
        {/* <Link href={`${redirectionPath}`}> */}
        <span className="hidden md:block ">
          <Image
            src={"/icons/redirection-button.svg"}
            alt="Redirection Button"
            width={50}
            height={50}
          />
        </span>
        {/* </Link> */}
      </div>
      <div className={styles.cardContent}>
        <p>{description}</p>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default ProductCardContent;
