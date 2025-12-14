import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { recipeService } from "../../services/recipeService";
import { RecipeInfo } from "../../components/layout/Recipe/RecipeInfo/RecipeInfo.jsx";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Loader } from "../../components/common/Loader";
import styles from "./RecipePage.module.css";

export const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setIsLoading(true);
                const data = await recipeService.getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipe();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <main className={styles.main_container}>
            {recipe && <Breadcrumbs currentPage={recipe.title} />}
            {isLoading ? <Loader /> : recipe && <RecipeInfo recipe={recipe} />}
        </main>
    );
};