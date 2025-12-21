import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import css from "./Hero.module.css";

import bigCard from "../../assets/bigCard.png";
import smallCard from "../../assets/smallCard.png";

import { Modal } from "../common/Modal/Modal";
import { SignInModal } from "../modals/SignInModal";
import { SignUpModal } from "../modals/SignUpModal";
import { Logo } from "../common/Logo/Logo";
import { Nav } from "../layout/Nav/Nav";
import { AuthBar } from "../layout/AuthBar/AuthBar";
import { UserBar } from "../layout/UserBar/UserBar";
import { useModal } from "../../hooks";
import { logout } from "../../redux/slices/authSlice";
import { clearFavorites } from "../../redux/slices/favoritesSlice";
import { useDispatch } from "react-redux";
import { LogOutModal } from "../modals";

export const Hero = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signin");

  const {
    isOpen: isLogoutOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();

  const handleAddRecipe = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      setModalType("signin");
    } else {
      navigate("/add");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setModalType("signup");
  };

  const handleSwitchToSignIn = () => {
    setModalType("signin");
  };

  const handleOpenSignIn = () => {
    setIsModalOpen(true);
    setModalType("signin");
  };

  const handleOpenSignUp = () => {
    setIsModalOpen(true);
    setModalType("signup");
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearFavorites());
    closeLogoutModal();
  };

  return (
    <section className={css.hero}>
      <div className={css.container}>
        {/* Decorative vertical lines */}
        <span className={`${css.decorativeLine} ${css.line1}`}></span>
        <span className={`${css.decorativeLine} ${css.line2}`}></span>
        <span className={`${css.decorativeLine} ${css.line3}`}></span>
        <span className={`${css.decorativeLine} ${css.line4}`}></span>

        {/* Header inside Hero */}
        <header className={css.header}>
          <Logo isDarkTheme={true} />
          <Nav isDarkTheme={true} />
          <div className="relative">
            {isAuthenticated ? (
              <UserBar
                isDarkTheme={true}
                user={user}
                onLogoutClick={openLogoutModal}
              />
            ) : (
              <AuthBar
                onSignInClick={handleOpenSignIn}
                onSignUpClick={handleOpenSignUp}
              />
            )}
          </div>
        </header>

        <h1 className={css.title}>
          IMPROVE YOUR <br />
          CULINARY TALENTS
        </h1>

        <p className={css.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the
          aromas and tastes of various cuisines.
        </p>

        <button type="button" className={css.btn} onClick={handleAddRecipe}>
          ADD RECIPE
        </button>

        <div className={css.images}>
          <img src={smallCard} alt="Dessert" className={css.smallCard} />
          <img src={bigCard} alt="Beef" className={css.bigCard} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalType === "signin" ? (
          <SignInModal
            onClose={handleCloseModal}
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        ) : (
          <SignUpModal
            onClose={handleCloseModal}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        )}
      </Modal>

      <Modal isOpen={isLogoutOpen} onClose={closeLogoutModal}>
        <LogOutModal onCancel={closeLogoutModal} onLogOut={handleLogout} />
      </Modal>
    </section>
  );
};
