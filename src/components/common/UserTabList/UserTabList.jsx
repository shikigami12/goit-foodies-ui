import { NavLink, Outlet } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { TABS } from '../../../constants';

export default function UserTabList() {
  return (
    <>
      <div className="mb-8 md:mb-10 xl:flex-1">
        <ul className="flex gap-[30px] md:gap-10 uppercase text-borders font-extrabold text-lg md:text-xl leading-[133%] md:leading-[120%] tracking-[-0.02em] border-b border-borders w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {TABS.map(tab => (
            <li key={tab}>
              <NavLink
                to={tab}
                className={({ isActive }) => {
                  return `pb-3.5 inline-block cursor-pointer whitespace-nowrap ${
                    isActive ? '!text-brand border-b-[3px] border-brand' : ''
                  }`;
                }}
              >
                {capitalizeFirstLetter(tab.replace('_', ' '))}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </>
  );
}
