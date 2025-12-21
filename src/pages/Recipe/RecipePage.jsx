import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeService } from "../../services/recipeService";
import { setFavorites } from "../../redux/slices/favoritesSlice";
import { RecipeInfo } from "../../components/layout/Recipe/RecipeInfo/RecipeInfo.jsx";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Loader } from "../../components/common/Loader";
import styles from "./RecipePage.module.css";
import { PopularRecipes } from "../../components/layout/Recipe/PopularRecipes/PopularRecipes.jsx";

export const RecipePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const loadFavorites = async () => {
            if (isAuthenticated) {
                try {
                    const response = await recipeService.getFavorites();
                    const favoriteIds = response.recipes?.map(recipe => recipe.id) || [];

                    dispatch(setFavorites(favoriteIds));
                } catch {
                    // Silent fail - favorites will show empty
                }
            }
        };

        loadFavorites();
    }, [isAuthenticated, dispatch]);

    if (error) {
        return <div>Error loading recipe</div>;
    }

    return (
        <main className={styles.main_container}>
            {recipe && <Breadcrumbs currentPage={recipe.title} />}
            {isLoading ? <Loader /> : recipe && <RecipeInfo recipe={recipe} />}
            <PopularRecipes />
        </main>
    );
};