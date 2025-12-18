import formatInstruction from "../../../../../utils/formatInstruction.js";
import styles from "./RecipePreparation.module.css";

export const RecipePreparation = ({ instruction }) => {
  return (
    <div>
      <h4 className={styles.recipe_preparation}>Recipe Preparation</h4>
      <div
        className={styles.instruction}
        dangerouslySetInnerHTML={{ __html: formatInstruction(instruction) }}
      />
    </div>
  );
};
