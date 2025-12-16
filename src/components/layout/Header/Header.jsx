import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Logo } from "../../common/Logo/Logo";
import { Nav } from "../Nav/Nav";
import { AuthBar } from "../AuthBar/AuthBar";
import { UserBar } from "../UserBar/UserBar";
import { Modal } from "../../common/Modal/Modal";
import { useModal } from "../../../hooks";
import { SignInModal, SignUpModal, LogOutModal } from "../../modals";
import { getCurrentUser, logout } from "../../../redux/slices/authSlice";

export const Header = ({ isDarkTheme = false }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

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
        const token = localStorage.getItem("token");
        if (token && !isAuthenticated) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, isAuthenticated]);

    const handleLogout = async () => {
        await dispatch(logout());
        closeLogoutModal();
    };

    return (
        <>
            <header className="w-full">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                    <Logo isDarkTheme={isDarkTheme} />
                    {isAuthenticated && <Nav isDarkTheme={isDarkTheme} />}
                    {isAuthenticated ? (
                        <UserBar
                            isDarkTheme={isDarkTheme}
                            user={user}
                            onLogoutClick={openLogoutModal}
                        />
                    ) : (
                        <AuthBar
                            onSignInClick={openSignInModal}
                            onSignUpClick={openSignUpModal}
                        />
                    )}
                </div>
            </header>

            <Modal isOpen={isSignInOpen} onClose={closeSignInModal}>
                <SignInModal
                    onSwitchToSignUp={() => {
                        closeSignInModal();
                        openSignUpModal();
                    }}
                    onClose={closeSignInModal}
                />
            </Modal>

            <Modal isOpen={isSignUpOpen} onClose={closeSignUpModal}>
                <SignUpModal
                    onSwitchToSignIn={() => {
                        closeSignUpModal();
                        openSignInModal();
                    }}
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