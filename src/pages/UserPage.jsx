import { Outlet, useNavigate, useParams } from 'react-router-dom';
import LogOutButton from '../components/common/LogOutButton';
import { MainTitle } from '../components/common/MainTitle/MainTitle';
import { Subtitle } from '../components/common/Subtitle/Subtitle';
import UserInfo from '../components/common/UserInfo/';
import UserTabList from '../components/common/UserTabList';
import styles from './UserPage.module.css';
import { Icon } from '../components/common/Icon/Icon';
import { useEffect, useState } from 'react';
import { TABS } from '../constants';

export const UserPage = () => {
  const { id } = useParams();
  const isCurrentUser = true; //TODO: need to take from storage

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    if (!id) navigate('current');
  }, [id]);

  return (
    <>
      <div className={styles['text-block']}>
        <MainTitle>Profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <Icon name="burger" color="red" />
      <div className={styles['columns']}>
        <div className={styles['left-column']}>
          <UserInfo />
          {isCurrentUser && <LogOutButton />}
        </div>
        <div className={styles['right-column']}>
          <UserTabList />
        </div>
      </div>
      {/* TODO: Add PathInfo, MainTitle, Subtitle, UserInfo, TabsList, ListItems, ListPagination */}
    </>
  );
};
