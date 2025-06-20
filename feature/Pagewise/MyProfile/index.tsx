"use client";
// TODO: Current Tab push to query params for necessary renderings only
import React, { useState } from "react";
import dynamic from "next/dynamic";

import PersonalDetails from "./PersonalDetails";
import styles from "./style.module.scss";
import FashionPreference from "./FashionPreferences";

//  only load when that tab is active
const Orders = dynamic(() => import("./Orders"));
const MyProducts = dynamic(() => import("./MyProducts"));
const Reviews = dynamic(() => import("./Reviews"));
const Settings = dynamic(() => import("./Settings"));

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

const MyProfile = ({ userData }: { userData: any }) => {
  const [currentTab, setCurrentTab] = useState<string>("personal");

  const Tabs: Tab[] = [
    {
      id: "personal",
      title: "Personal Details",
      content: <PersonalDetails userPersonalData={userData} />,
    },
    // {
    //   id: "preference",
    //   title: "Fashion Preference",
    //   content: <FashionPreference />,
    // },
    {
      id: "products",
      title: "My Products",
      content: <MyProducts />,
    },
    {
      id: "orders",
      title: "Orders",
      content: <Orders />,
    },
    {
      id: "reviews",
      title: "Reviews",
      content: <Reviews />,
    },
    {
      id: "settings",
      title: "Settings",
      content: <Settings />,
    },
  ];

  const activeTab = Tabs.find((tab) => tab.id === currentTab);

  return (
    <section className={styles.profileContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <span className={styles.avatarContainer}>
          <img
            src={ userData?.profileImage || "/images/product/fashionx/avatar.png"}
            alt="User Profile Image"
            className={styles.avatarImage}
          />
        </span>

        {/* Tabs Menu */}
        <ul className={styles.tabList}>
          {Tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${styles.tabItem} ${
                currentTab === tab.id ? styles.activeTab : ""
              }`}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.tabContent}>
        {activeTab?.content}
      </div>
    </section>
  );
};

export default MyProfile;
