import React from 'react';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

import UserAvatarInput from '../UserAvatarInput/UserAvatarInput';
import { useSelector } from 'react-redux';
import { currentUserProfileSelector } from '../../../redux/slices/usersSlice';

const statsOrder = ['email', 'recipes', 'favorites', 'followers', 'following'];
const stats = {
  email: 'email',
  recipes: 'recipesCount',
  favorites: 'favoritesCount',
  followers: 'followersCount',
  following: 'followingCount',
};

export default function UserInfo({ isCurrentUser }) {
  const user = useSelector(currentUserProfileSelector);

  const filteredStatsOrder = statsOrder.filter(key => {
    if (isCurrentUser) return true;
    return key !== 'favorites' && key !== 'following';
  });

  return (
    <div className="border border-borders rounded-[30px] px-[54px] py-[30px] flex flex-col gap-4 md:gap-5 w-full">
      <UserAvatarInput />
      <p className="font-extrabold text-[18px] md:text-[20px] leading-[133%] md:leading-[120%] tracking-[-0.02em] uppercase text-center">
        {user.name}
      </p>

      {/** stats */}
      <ul className="flex flex-col justify-start items-start gap-1.5 list-none m-0 p-0">
        {filteredStatsOrder.map(key => (
          <li
            key={key}
            className="font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] text-brand-dark"
          >
            <span className="inline-block mr-2 font-medium text-[12px] md:text-[14px] leading-[150%] md:leading-[143%] tracking-[-0.02em] text-borders">
              {capitalizeFirstLetter(key)}:
            </span>
            {String(user[stats[key]])}
          </li>
        ))}
      </ul>
    </div>
  );
}
