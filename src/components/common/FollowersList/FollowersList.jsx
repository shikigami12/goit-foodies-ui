import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { userService } from '../../../services/userService';
import { UserRelationsList } from '../UserRelationsList/UserRelationsList';
import { Loader } from '../Loader';

export default function FollowersList() {
  const location = useLocation();
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentRoute = location.pathname.split('/').pop() || '';

  const followersSlug = ROUTES.FOLLOWERS_LIST.replace('/', '');
  const followingSlug = ROUTES.FOLLOWING_LIST.replace('/', '');

  const isFollowersTab = currentRoute === followersSlug;
  const isFollowingTab = currentRoute === followingSlug;

  const actionLabel = isFollowersTab ? 'Follow' : 'Unfollow';
  const emptyMessage = isFollowersTab
    ? EMPTY_LIST_MESSAGES.FOLLOWERS
    : EMPTY_LIST_MESSAGES.FOLLOWING;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');

        // TODO: Підгружати дані чужого акаунта для таба Followers (якщо ця сторінка не поточного користувача)
        
        if (isFollowersTab && id) {
          const data = await userService.getFollowers(id);
          const list = (data.followers ?? data ?? []).map(u => ({
            id: u.id,
            name: u.name,
            avatar: u.avatar,
            recipesCount: u.recipesCount ?? 0,
            recipesThumbs: u.recipesThumbs ?? [],
          }));
          setItems(list);
        }

        if (isFollowingTab) {
          const data = await userService.getFollowing();
          const list = (data.following ?? data ?? []).map(u => ({
            id: u.id,
            name: u.name,
            avatar: u.avatar,
            recipesCount: u.recipesCount ?? 0,
            recipesThumbs: u.recipesThumbs ?? [],
          }));
          setItems(list);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load users');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if ((isFollowersTab && id) || isFollowingTab) {
      load();
    }
  }, [id, isFollowersTab, isFollowingTab]);

  const handleAction = async userId => {
    try {
      if (isFollowersTab) {
        await userService.followUser(userId);
      } else if (isFollowingTab) {
        await userService.unfollowUser(userId);
        setItems(prev => prev.filter(u => u.id !== userId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="mt-10 text-center text-red-500">{error}</p>;
  }

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
      actionLabel={actionLabel}
      onAction={handleAction}
    />
  );
}
