import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import {
  followUser,
  unfollowUser,
  currentUserProfileSelector,
  setIsFollowing,
  incrementFollowersCount,
  decrementFollowersCount,
} from '../../../redux/slices/usersSlice';
import { useParams } from 'react-router-dom';

export const FollowButton = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(currentUserProfileSelector);
  const isFollowLoading = useSelector(state => state.users.isFollowLoading);

  if (!user || user.id !== id) return null;

  const isFollowing = user.isFollowing;

  const handleToggleFollow = async () => {
    if (isFollowLoading) return;

    try {
      if (isFollowing) {
        await dispatch(unfollowUser(id)).unwrap();
        dispatch(setIsFollowing(false));
        dispatch(decrementFollowersCount());
      } else {
        await dispatch(followUser(id)).unwrap();
        dispatch(setIsFollowing(true));
        dispatch(incrementFollowersCount());
      }
    } catch {
      // Silent fail - UI will remain unchanged
    }
  };

  return (
    <Button
      label={isFollowing ? 'Unfollow' : 'Follow'}
      variant={isFollowing ? 'light' : 'dark'}
      onClick={handleToggleFollow}
      isLoading={isFollowLoading}
      disabled={isFollowLoading}
      fullWidth
      type="button"
    />
  );
};
