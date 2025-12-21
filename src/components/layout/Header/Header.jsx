import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Logo } from '../../common/Logo/Logo';
import { Nav } from '../Nav/Nav';
import { AuthBar } from '../AuthBar/AuthBar';
import { UserBar } from '../UserBar/UserBar';
import { Modal } from '../../common/Modal/Modal';
import { useModal } from '../../../hooks';
import { SignInModal, SignUpModal, LogOutModal } from '../../modals';
import { getCurrentUser, logout } from '../../../redux/slices/authSlice';
import { clearFavorites } from '../../../redux/slices/favoritesSlice';
import { tokenManager } from '../../../services';

export const Header = ({ isDarkTheme = false }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const {
    isOpen: isSignInOpen,
    openModal: openSignInModal,
    closeModal: closeSignInModal,
  } = useModal();

  const {
    isOpen: isSignUpOpen,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();

  const {
    isOpen: isLogoutOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();

  useEffect(() => {
    const token = tokenManager.getToken();
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleSwitchToSignUp = () => {
    closeSignInModal();
    setTimeout(() => {
      openSignUpModal();
    }, 300);
  };

  const handleSwitchToSignIn = () => {
    closeSignUpModal();
    setTimeout(() => {
      openSignInModal();
    }, 300);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearFavorites());
    closeLogoutModal();
  };

  return (
    <>
      <header className="w-full">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 sm:px-6 py-5">
          <Logo isDarkTheme={isDarkTheme} />
          <Nav isDarkTheme={isDarkTheme} />
          <div className="relative">
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isAuthenticated
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-8 scale-95 absolute inset-0 pointer-events-none'
              }`}
            >
              {isAuthenticated && (
                <UserBar
                  isDarkTheme={isDarkTheme}
                  user={user}
                  onLogoutClick={openLogoutModal}
                />
              )}
            </div>
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                !isAuthenticated
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-8 scale-95 absolute inset-0 pointer-events-none'
              }`}
            >
              {!isAuthenticated && (
                <AuthBar
                  onSignInClick={openSignInModal}
                  onSignUpClick={openSignUpModal}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <Modal isOpen={isSignInOpen} onClose={closeSignInModal}>
        <SignInModal
          onSwitchToSignUp={handleSwitchToSignUp}
          onClose={closeSignInModal}
        />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={closeSignUpModal}>
        <SignUpModal
          onSwitchToSignIn={handleSwitchToSignIn}
          onClose={closeSignUpModal}
        />
      </Modal>

      <Modal isOpen={isLogoutOpen} onClose={closeLogoutModal}>
        <LogOutModal onCancel={closeLogoutModal} onLogOut={handleLogout} />
      </Modal>
    </>
  );
};

Header.propTypes = {
  isDarkTheme: PropTypes.bool,
};
