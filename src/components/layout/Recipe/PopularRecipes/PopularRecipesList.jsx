import RecipeCard from "./RecipeCard/RecipeCard.jsx";
import styles from "./PopularRecipes.module.css";

export const PopularRecipesList = ({ recipes }) => {
    if (recipes.length === 0) {
        return <p>No popular recipes found</p>;
    }

    return (
        <ul className={styles.popular_recipes_list}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </ul>
    );
};