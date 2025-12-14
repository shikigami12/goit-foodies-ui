import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { recipeService } from "../../../../services/recipeService";
import handleFavorite from "../../../../utils/handleFavorite.js";
import Button from "../../../common/Button/Button.jsx";
import style from "./RecipeInfo.module.css";
import { RecipeIngredients } from "./RecipeIngredients/RecipeIngredients";
import { RecipeMainInfo } from "./RecipeMainInfo/RecipeMainInfo.jsx";
import { RecipePreparation } from "./RecipePreparation/RecipePreparation.jsx";
import recipe_without_img from "../../../../images/recipe_without_img.jpg";
import { selectFavoriteRecipes } from "../../../../redux/selectors/selectors.js";

export const RecipeInfo = ({ recipe }) => {
    const { thumb, title, instructions, ingredients, _id } = recipe;
    const favoritesRecipe = useSelector(selectFavoriteRecipes);
    const token = useSelector((state) => state.auth.token); // Виправлено: беремо токен з auth slice
    const [isFavorite, setIsFavorite] = useState(favoritesRecipe.includes(_id));
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const addFavoriteRecipe = async (id) => {
        return await recipeService.addFavorite(id);
    };

    const removeFavoriteRecipe = async (id) => {
        return await recipeService.removeFavorite(id);
    };

    useEffect(() => {
        setIsFavorite(favoritesRecipe.includes(_id));
    }, [favoritesRecipe, _id]);

    return (
        <section className={style.recipe_info_container}>
            <img
                className={style.recipe_img}
                src={thumb !== "[object FileList]" ? thumb : recipe_without_img}
                alt={title}
            />
            <div className={style.recipe_info_wrapper}>
                <RecipeMainInfo data={recipe} />
                <RecipeIngredients ingredients={ingredients} />
                <RecipePreparation instruction={instructions} />
                {token ? (
                    !isFavorite ? (
                        <Button
                            text="Add to favorites"
                            variant="add_favorite"
                            onClick={() => handleFavorite(addFavoriteRecipe, _id, "add", setIsFavorite)}
                        />
                    ) : (
                        <Button
                            text="Remove from favorites"
                            variant="add_favorite"
                            onClick={() => handleFavorite(removeFavoriteRecipe, _id, "delete", setIsFavorite)}
                        />
                    )
                ) : (
                    <Button
                        text="Add to favorites"
                        variant="add_favorite"
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                    />
                )}
            </div>
        </section>
    );
};