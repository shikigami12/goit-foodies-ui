import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import css from "./Hero.module.css";

import bigCard from "../../assets/bigCard.png";
import smallCard from "../../assets/smallCard.png";

import { Modal } from "../common/Modal/Modal";
import { SignInModal } from "../modals/SignInModal";
import { SignUpModal } from "../modals/SignUpModal";

export const Hero = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signin");

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

  return (
    <section className={css.hero}>
      <div className={css.container}>
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
    </section>
  );
};
