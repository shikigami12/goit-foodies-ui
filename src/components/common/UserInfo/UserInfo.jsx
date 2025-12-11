import React from "react";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import styles from "./UserInfo.module.css";
import UserAvatarInput from "../UserAvatarInput/UserAvatarInput";

const stats = ["email", "recipes", "favorites", "followers", "following"];
export default function UserInfo() {
  const userData = {
    name: "Victoria",
    email: "victoria28682@gmai.com",
    recipes: 9,
    favorites: 9,
    followers: 5,
    following: 5,
  };
  return (
    <div className={styles["wrapper"]}>
      <UserAvatarInput />
      <p className={styles["title-H3"]}>{userData.name}</p>

      {/** stats */}
      <ul className={styles["stats"]}>
        {stats.map((key) => (
          <li key={key} className={styles["stat-item"]}>
            <span className={styles["stat-title"]}>
              {capitalizeFirstLetter(key)}:
            </span>
            {userData[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}
