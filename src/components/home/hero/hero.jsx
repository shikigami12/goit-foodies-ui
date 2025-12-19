import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import css from "./Hero.module.css";

import bigCard from "../../../assets/bigCard.png";
import smallCard from "../../../assets/smallCard.png";

import { SignInModal } from "../../modals/SignInModal";

export const Hero = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRecipe = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      navigate("/add-recipe");
    }
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

      {isModalOpen && <SignInModal />}
    </section>
  );
};
