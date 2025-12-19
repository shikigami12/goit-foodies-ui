import { NavLink, Outlet } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { ROUTES, TABS } from '../../../constants';

export default function UserTabList({ isCurrentUser }) {
  const filteredTabs = TABS.filter(tab => {
    if (isCurrentUser) return true;
    return tab === ROUTES.RECIPES_MY || tab === ROUTES.FOLLOWERS_LIST;
  });

  const getTabLabel = (tab) => {
    if (tab === ROUTES.RECIPES_MY) {
      return isCurrentUser ? 'My recipes' : 'recipes';
    }
    if (tab === ROUTES.RECIPES_FAVORITES) {
      return 'My Favorites';
    }
    return capitalizeFirstLetter(tab.replace('_', ' '));
  };

  return (
    <>
      <div className="mb-8 md:mb-10 xl:flex-1">
        <ul className="tabs flex gap-[30px] md:gap-10 uppercase text-borders font-extrabold text-lg md:text-xl leading-[133%] md:leading-[120%] tracking-[-0.02em] border-b border-borders w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {filteredTabs.map(tab => (
            <li key={tab}>
              <NavLink
                to={tab}
                className={({ isActive }) => {
                  return `pb-3.5 inline-block cursor-pointer whitespace-nowrap ${
                    isActive ? '!text-brand border-b-[3px] border-brand' : ''
                  }`;
                }}
              >
                {getTabLabel(tab)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Outlet context={{ isCurrentUser }} />
    </>
  );
}
