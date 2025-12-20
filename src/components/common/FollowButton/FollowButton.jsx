import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import {
  followUser,
  unfollowUser,
  currentUserProfileSelector,
} from '../../../redux/slices/usersSlice';
import { useParams } from 'react-router-dom';

export const FollowButton = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(currentUserProfileSelector);
  const isFollowLoading = useSelector(state => state.users.isFollowLoading);

  if (!user || user.id !== id) return null;

  const isFollowing = user.isFollowing;

  const handleToggleFollow = () => {
    if (isFollowLoading) return;

    if (isFollowing) {
      dispatch(unfollowUser(id));
    } else {
      dispatch(followUser(id));
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
    />
  );
};
