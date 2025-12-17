import css from "./hero.module.css";

import bigCard from "../../../assets/bigCard.png";
import smallCard from "../../../assets/smallCard.png";

export default function Hero() {
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

        <button type="button" className={css.btn}>
          ADD RECIPE
        </button>

        <div className={css.images}>
          <img src={smallCard} alt="Dessert" className={css.smallCard} />
          <img src={bigCard} alt="Beef" className={css.bigCard} />
        </div>
      </div>
    </section>
  );
}
