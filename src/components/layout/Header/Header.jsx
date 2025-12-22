import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Logo } from '../../common/Logo/Logo';
import { Nav } from '../Nav/Nav';
import { AuthBar } from '../AuthBar/AuthBar';
import { UserBar } from '../UserBar/UserBar';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Modal } from '../../common/Modal/Modal';
import { useModal } from '../../../hooks';
import { getCurrentUser, logout } from '../../../redux/slices/authSlice';
import { clearFavorites } from '../../../redux/slices/favoritesSlice';
import { tokenManager } from '../../../services';

// Lazy load modals - not needed on initial render
const SignInModal = lazy(() => import('../../modals/SignInModal').then(m => ({ default: m.SignInModal })));
const SignUpModal = lazy(() => import('../../modals/SignUpModal').then(m => ({ default: m.SignUpModal })));
const LogOutModal = lazy(() => import('../../modals/LogOutModal').then(m => ({ default: m.LogOutModal })));

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
          <div className="flex items-center gap-4 relative">
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isAuthenticated
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
              className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${!isAuthenticated
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

            <BurgerMenu isDarkTheme={isDarkTheme} />
          </div>
        </div>
      </header>

      <Modal isOpen={isSignInOpen} onClose={closeSignInModal}>
        <Suspense fallback={null}>
          <SignInModal
            onSwitchToSignUp={handleSwitchToSignUp}
            onClose={closeSignInModal}
          />
        </Suspense>
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={closeSignUpModal}>
        <Suspense fallback={null}>
          <SignUpModal
            onSwitchToSignIn={handleSwitchToSignIn}
            onClose={closeSignUpModal}
          />
        </Suspense>
      </Modal>

      <Modal isOpen={isLogoutOpen} onClose={closeLogoutModal}>
        <Suspense fallback={null}>
          <LogOutModal onCancel={closeLogoutModal} onLogOut={handleLogout} />
        </Suspense>
      </Modal>
    </>
  );
};

Header.propTypes = {
  isDarkTheme: PropTypes.bool,
};
