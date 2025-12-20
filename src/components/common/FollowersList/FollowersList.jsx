import { useEffect, useState } from 'react';
import { useLocation, useParams, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentUserProfileSelector } from '../../../redux/slices/usersSlice';
import { ROUTES } from '../../../constants';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { userService } from '../../../services/userService';
import { UserRelationsList } from '../UserRelationsList/UserRelationsList';
import { Loader } from '../Loader';

export default function FollowersList() {
  const location = useLocation();
  const { id } = useParams();
  const { isCurrentUser } = useOutletContext() || {};

  const userProfile = useSelector(currentUserProfileSelector);
  const authUser = useSelector(state => state.auth.user);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentRoute = location.pathname.split('/').pop() || '';
  const followersSlug = ROUTES.FOLLOWERS_LIST.replace('/', '');
  const followingSlug = ROUTES.FOLLOWING_LIST.replace('/', '');

  const isFollowersTab = currentRoute === followersSlug;
  const isFollowingTab = currentRoute === followingSlug;

  const emptyMessage = isFollowersTab
    ? EMPTY_LIST_MESSAGES.FOLLOWERS
    : EMPTY_LIST_MESSAGES.FOLLOWING;

  const mapUserToItem = (u, myFollowingIds = new Set()) => ({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    recipesCount: u.recipesCount ?? 0,
    recipesThumbs: u.recipesThumbs ?? [],
    isFollowing: isFollowingTab ? true : myFollowingIds.has(u.id),
  });

  useEffect(() => {
    const load = async () => {
      try {
        if (items.length === 0) setLoading(true);
        setError('');

        let listData = [];
        let myFollowingSet = new Set();

        if (authUser?.id) {
          try {
            const myFollowingData = await userService.getFollowing();
            const myFollowingList = Array.isArray(myFollowingData)
              ? myFollowingData
              : myFollowingData.following || [];
            myFollowingList.forEach(u => myFollowingSet.add(u.id));
          } catch (err) {
            console.error('Failed to load my following list', err);
          }
        }

        if (isFollowersTab && id) {
          const response = await userService.getFollowers(id);
          listData = Array.isArray(response)
            ? response
            : response.followers || [];
        } else if (isFollowingTab) {
          if (isCurrentUser) {
            const response = await userService.getFollowing();
            listData = Array.isArray(response)
              ? response
              : response.following || [];
          }
        }

        setItems(listData.map(u => mapUserToItem(u, myFollowingSet)));
      } catch (e) {
        console.error(e);
        setError('Failed to load users');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [
    id,
    isFollowersTab,
    isFollowingTab,
    isCurrentUser,
    userProfile?.followersCount,
    userProfile?.followingCount,
    authUser?.id,
  ]);

  const handleAction = async (userId, currentIsFollowing) => {
    try {
      setItems(prev =>
        prev.map(item =>
          item.id === userId
            ? { ...item, isFollowing: !currentIsFollowing }
            : item
        )
      );

      if (currentIsFollowing) {
        await userService.unfollowUser(userId);

        if (isFollowingTab) {
          setItems(prev => prev.filter(u => u.id !== userId));
        }
      } else {
        await userService.followUser(userId);
      }
    } catch (e) {
      console.error(e);
      setItems(prev =>
        prev.map(item =>
          item.id === userId
            ? { ...item, isFollowing: currentIsFollowing }
            : item
        )
      );
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  if (!items.length) {
    return (
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-[#bfbebe] md:text-[#1a1a1a] mt-20 md:mt-[100px]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <UserRelationsList
      items={items}
      onAction={handleAction}
      currentUserId={authUser?.id}
    />
  );
}
