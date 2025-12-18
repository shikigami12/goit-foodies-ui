import { useEffect, useState } from "react";
import { recipeService } from "../../../../services/recipeService.js";
import { PopularRecipesList } from "./PopularRecipesList.jsx";
import styles from "./PopularRecipes.module.css";
import { Loader } from "../../../common/Loader/Loader.jsx";

export const PopularRecipes = () => {
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchPopularRecipes = async () => {
            try {
                setIsLoading(true);
                const data = await recipeService.getPopularRecipes();

                setPopularRecipes(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching popular recipes:', err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPopularRecipes();
    }, []);

    return (
        <section className={styles.popular_recipes_container}>
            <h3 className={styles.header_popular_recipes}>Popular recipes</h3>
            {!isError && isLoading ? <Loader /> : <PopularRecipesList recipes={popularRecipes} />}
        </section>
    );
};