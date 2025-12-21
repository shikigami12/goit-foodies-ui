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
import { PathInfo } from '../components/common/PathInfo/PathInfo';
import {
  currentUserProfileSelector,
  getCurrentUser,
  getUserById,
  setIsFollowing,
} from '../redux/slices/usersSlice';
import { FollowButton } from '../components/common/FollowButton/FollowButton';
import { Loader } from '../components/common/Loader';

export const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(currentUserProfileSelector);
  const authUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const isCurrentUser = isAuthenticated && authUser?.id === id;
  const isLoaded = user && user.id === id;

  useEffect(() => {
    if (typeof id === 'undefined' && isAuthenticated && authUser?.id) {
      navigate(`/user/${authUser.id}`, { replace: true });
    }
  }, [id, isAuthenticated, authUser?.id, navigate]);

  useEffect(() => {
    if (id && (!user || user.id !== id)) {
      if (isCurrentUser) {
        dispatch(getCurrentUser());
      } else {
        dispatch(getUserById(id));
      }
    }
  }, [dispatch, id, isCurrentUser, user]);

  useEffect(() => {
    const checkStatus = async () => {
      if (!isCurrentUser && authUser?.id && isLoaded) {
        try {
          const data = await userService.getFollowing();
          const followingList = data.following || data || [];

          const isFollowing = followingList.some(u => u.id === id);

          if (isFollowing) {
            dispatch(setIsFollowing(true));
          }
        } catch (error) {
          console.error('Failed to check following status:', error);
        }
      }
    };

    checkStatus();
  }, [dispatch, id, isCurrentUser, authUser, isLoaded]);

  if (!isLoaded) return <Loader />;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-20 py-10">
      <div className="flex flex-col gap-4 mb-8">
        <PathInfo currentPage="Profile" />
        <MainTitle>Profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <div className="xl:flex xl:flex-row xl:gap-10">
        <div className="flex flex-col gap-5 max-w-[375px] md:max-w-[394px] xl:min-w-[394px] mx-auto xl:mx-0 mb-16">
          <UserInfo isCurrentUser={isCurrentUser} />
          {isCurrentUser ? (
            <LogOutButton />
          ) : (
            isAuthenticated && <FollowButton />
          )}
        </div>
        <div className="flex-grow">
          <UserTabList isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </main>
  );
};
