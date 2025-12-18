import { Outlet, useNavigate, useParams } from 'react-router-dom';
import LogOutButton from '../components/common/LogOutButton';
import { MainTitle } from '../components/common/MainTitle/MainTitle';
import { Subtitle } from '../components/common/Subtitle/Subtitle';
import UserInfo from '../components/common/UserInfo/';
import UserTabList from '../components/common/UserTabList';
import { Icon } from '../components/common/Icon/Icon';
import { useEffect } from 'react';
import { userService } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserProfileSelector,
  getCurrentUser,
} from '../redux/slices/usersSlice';

export const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(currentUserProfileSelector);
  const authUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  console.log('user', user);

  const isCurrentUser = authUser.id === id;
  const isLoaded = user && user.id === id;

  useEffect(() => {
    if (typeof id === 'undefined')
      navigate(`/user/${authUser.id}`, { replace: true });
  }, []);

  useEffect(() => {
    if (!user) {
      if (isCurrentUser) dispatch(getCurrentUser());
    }
  }, [dispatch, isCurrentUser]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        {/* TODO: Replace title and subtitle with components relative to page */}
        <MainTitle>Profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <div className="xl:flex xl:flex-row xl:gap-10 xl:max-w-[1440px]">
        <div className="flex flex-col gap-5 max-w-[375px] md:max-w-[394px] xl:min-w-[394px] mx-auto xl:mx-0 mb-16">
          <UserInfo />
          {isCurrentUser && <LogOutButton />}
        </div>
        <div>
          <UserTabList />
        </div>
      </div>
    </>
  );
};
