import { IngredientsItem } from "./IngredientsItem";
import styles from "./Ingredients.module.css";

export const IngredientsList = ({ ingredients }) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return <p>No ingredients available</p>;
    }

    console.log(ingredients);

    return (
        <ul className={styles.ingredients_list}>
            {ingredients.map(({ ingredient, measure }) => (
                <IngredientsItem
                    key={ingredient.id}
                    pathImg={ingredient.img}
                    name={ingredient.name}
                    measure={measure}
                />
            ))}
        </ul>
    );
};