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
import { useModal } from '../../../hooks';
import { Modal } from '../Modal/Modal';
import { SignInModal, SignUpModal } from '../../modals';
import { useState } from 'react';

export const FollowButton = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(currentUserProfileSelector);
  const isFollowLoading = useSelector(state => state.users.isFollowLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [showSignIn, setShowSignIn] = useState(true);

  const {
    isOpen: isAuthOpen,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
  } = useModal();

  if (!user || user.id !== id) return null;

  const isFollowing = user.isFollowing;

  const handleToggleFollow = async () => {
    if (isFollowLoading) return;

    // Якщо користувач не авторизований, показати модальне вікно
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

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

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
  };

  const handleSwitchToSignIn = () => {
    setShowSignIn(true);
  };

  const handleCloseAuth = () => {
    closeAuthModal();
    // Скинути на SignIn після закриття
    setTimeout(() => {
      setShowSignIn(true);
    }, 300);
  };

  return (
    <>
      <Button
        label={isFollowing ? 'Unfollow' : 'Follow'}
        variant={isFollowing ? 'light' : 'dark'}
        onClick={handleToggleFollow}
        isLoading={isFollowLoading}
        disabled={isFollowLoading}
        fullWidth
        type="button"
      />

      <Modal isOpen={isAuthOpen} onClose={handleCloseAuth}>
        {showSignIn ? (
          <SignInModal
            onSwitchToSignUp={handleSwitchToSignUp}
            onClose={handleCloseAuth}
          />
        ) : (
          <SignUpModal
            onSwitchToSignIn={handleSwitchToSignIn}
            onClose={handleCloseAuth}
          />
        )}
      </Modal>
    </>
  );
};
