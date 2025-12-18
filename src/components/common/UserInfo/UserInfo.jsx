import React from "react";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

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
    <div className="border border-borders rounded-[30px] px-[54px] py-[30px] flex flex-col gap-4 w-full">
      <UserAvatarInput />
      <p className="font-extrabold text-[18px] md:text-[20px] leading-[133%] md:leading-[120%] tracking-[-0.02em] uppercase text-center">{userData.name}</p>

      {/** stats */}
      <ul className="flex flex-col justify-start items-start gap-1.5 list-none m-0 p-0">
        {stats.map((key) => (
          <li key={key} className="font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] text-brand-dark">
            <span className="inline-block mr-2 font-medium text-[12px] md:text-[14px] leading-[150%] md:leading-[143%] tracking-[-0.02em] text-borders">
              {capitalizeFirstLetter(key)}:
            </span>
            {userData[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}
