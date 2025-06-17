"use client";
import React from "react";
import AuthButtons from "../auth/AuthButtons";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header
      className={styles.navbar}
      style={{
        justifyContent: pathname !== "/" ? "space-between" : "flex-end",
      }}
    >
      {pathname != "/" && (
        <a href="/" className={styles.logo} aria-label="Homepage">
          Fashion<span>X</span>
        </a>
      )}
      <AuthButtons />
    </header>
  );
};

export default Navbar;
