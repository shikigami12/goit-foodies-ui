import { act, useEffect, useState } from 'react';
import styles from './UserTabList.module.css';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { TABS } from '../../../constants';

export default function UserTabList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    navigate(activeTab);
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname.split('/').pop());
  }, [location]);

  return (
    <>
      <ul className={styles['list']}>
        {TABS.map(tab => (
          <li key={tab}>
            <NavLink
              to={tab}
              className={({ isActive }) => {
                return styles['link'] + ' ' + (isActive && styles['active']);
              }}
            >
              {capitalizeFirstLetter(tab.replace('_', ' '))}
            </NavLink>
          </li>
        ))}
      </ul>

      <Outlet />
    </>
  );
}
