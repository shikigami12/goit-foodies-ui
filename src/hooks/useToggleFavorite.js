import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { recipeService } from "../services/recipeService";
import { addToFavorites, removeFromFavorites } from "../redux/slices/favoritesSlice";
import { selectFavoriteRecipes } from "../redux/selectors/selectors";

export const useToggleFavorite = (recipeId) => {
  const dispatch = useDispatch();
  const favoritesRecipe = useSelector(selectFavoriteRecipes);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(favoritesRecipe.includes(recipeId));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesRecipe.includes(recipeId));
  }, [favoritesRecipe, recipeId]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      return { requiresAuth: true };
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await recipeService.removeFavorite(recipeId);
        dispatch(removeFromFavorites(recipeId));
        setIsFavorite(false);
        toast.success("Recipe removed from favorites!");
      } else {
        await recipeService.addFavorite(recipeId);
        dispatch(addToFavorites(recipeId));
        setIsFavorite(true);
        toast.success("Recipe added to favorites!");
      }
      return { success: true };
    } catch (error) {
      if (error?.response?.status === 409) {
        toast("Recipe is already in your favorites!");
        dispatch(addToFavorites(recipeId));
        setIsFavorite(true);
      } else {
        toast.error("Failed to update favorites");
      }
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { isFavorite, isLoading, toggleFavorite };
};
