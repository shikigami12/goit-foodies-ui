import { useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import css from "./Hero.module.css";

// BigCard images: Mobile 190px, Tablet 280px, Desktop 302px (x2 for retina)
import bigCardMobile from "../../assets/bigCard_e92lgl_c_scale,w_405.png";
import bigCardTablet from "../../assets/bigCard_e92lgl_c_scale,w_559.png";
import bigCardDesktop from "../../assets/bigCard_e92lgl_c_scale,w_683.png";

// SmallCard images: Mobile 77px, Tablet 120px, Desktop 128px (x2 for retina)
import smallCardMobile from "../../assets/smallCard_zylboe_c_scale,w_190.png";
import smallCardTablet from "../../assets/smallCard_zylboe_c_scale,w_911.png";
import smallCardDesktop from "../../assets/smallCard_zylboe_c_scale,w_911.png";

import { Modal } from "../common/Modal/Modal";
import { Logo } from "../common/Logo/Logo";
import { Nav } from "../layout/Nav/Nav";
import { AuthBar } from "../layout/AuthBar/AuthBar";
import { UserBar } from "../layout/UserBar/UserBar";
import { BurgerMenu } from "../layout/BurgerMenu/BurgerMenu";
import { useModal } from "../../hooks";
import { logout } from "../../redux/slices/authSlice";
import { clearFavorites } from "../../redux/slices/favoritesSlice";

// Lazy load modals - not needed on initial render
const SignInModal = lazy(() => import("../modals/SignInModal").then(m => ({ default: m.SignInModal })));
const SignUpModal = lazy(() => import("../modals/SignUpModal").then(m => ({ default: m.SignUpModal })));
const LogOutModal = lazy(() => import("../modals/LogOutModal").then(m => ({ default: m.LogOutModal })));

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
        <span className={`${css.decorativeLine} ${css.line1}`}></span>
        <span className={`${css.decorativeLine} ${css.line2}`}></span>
        <span className={`${css.decorativeLine} ${css.line3}`}></span>
        <span className={`${css.decorativeLine} ${css.line4}`}></span>

        <header className={css.header}>
          <Logo isDarkTheme={true} />
          <Nav isDarkTheme={true} />
          <div className="flex items-center gap-4 relative">
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
            <BurgerMenu isDarkTheme={true} />
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
          <picture>
            <source media="(max-width: 767px)" srcSet={smallCardMobile} />
            <source media="(max-width: 1439px)" srcSet={smallCardTablet} />
            <img
              src={smallCardDesktop}
              alt="Dessert"
              className={css.smallCard}
              loading="lazy"
              width={128}
              height={116}
            />
          </picture>
          <picture>
            <source media="(max-width: 767px)" srcSet={bigCardMobile} />
            <source media="(max-width: 1439px)" srcSet={bigCardTablet} />
            <img
              src={bigCardDesktop}
              alt="Beef"
              className={css.bigCard}
              loading="lazy"
              width={302}
              height={273}
            />
          </picture>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Suspense fallback={null}>
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
        </Suspense>
      </Modal>

      <Modal isOpen={isLogoutOpen} onClose={closeLogoutModal}>
        <Suspense fallback={null}>
          <LogOutModal onCancel={closeLogoutModal} onLogOut={handleLogout} />
        </Suspense>
      </Modal>
    </section>
  );
};
