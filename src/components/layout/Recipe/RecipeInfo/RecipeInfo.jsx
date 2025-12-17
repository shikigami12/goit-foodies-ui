import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { recipeService } from "../../../../services/recipeService";
import handleFavorite from "../../../../utils/handleFavorite.js";
import { Button } from "../../../common/Button/Button.jsx";
import { Modal } from "../../../common/Modal/Modal";
import { SignInModal, SignUpModal } from "../../../modals";
import { useModal } from "../../../../hooks";
import style from "./RecipeInfo.module.css";
import { RecipeIngredients } from "./RecipeIngredients/RecipeIngredients";
import { RecipeMainInfo } from "./RecipeMainInfo/RecipeMainInfo.jsx";
import { RecipePreparation } from "./RecipePreparation/RecipePreparation.jsx";
import recipe_without_img from "../../../../images/recipe_without_img.jpg";
import { selectFavoriteRecipes } from "../../../../redux/selectors/selectors.js";

export const RecipeInfo = ({ recipe }) => {
    const { thumb, title, instructions, ingredients, id } = recipe;
    const favoritesRecipe = useSelector(selectFavoriteRecipes);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isFavorite, setIsFavorite] = useState(favoritesRecipe.includes(id));
    const [isLoading, setIsLoading] = useState(false);

    const {
        isOpen: isSignInOpen,
        openModal: openSignInModal,
        closeModal: closeSignInModal,
    } = useModal();

    const {
        isOpen: isSignUpOpen,
        openModal: openSignUpModal,
        closeModal: closeSignUpModal,
    } = useModal();

    const handleSwitchToSignUp = () => {
        closeSignInModal();
        openSignUpModal();
    };

    const handleSwitchToSignIn = () => {
        closeSignUpModal();
        openSignInModal();
    };

    const addFavoriteRecipe = async (id) => {
        setIsLoading(true);
        try {
            return await recipeService.addFavorite(id);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFavoriteRecipe = async (id) => {
        setIsLoading(true);
        try {
            return await recipeService.removeFavorite(id);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsFavorite(favoritesRecipe.includes(id));
    }, [favoritesRecipe, id]);

    return (
        <>
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
                    {isAuthenticated ? (
                        !isFavorite ? (
                            <Button
                                label="Add to favorites"
                                variant="light"
                                onClick={() => handleFavorite(addFavoriteRecipe, id, "add", setIsFavorite)}
                                isLoading={isLoading}
                                disabled={isLoading}
                            />
                        ) : (
                            <Button
                                label="Remove from favorites"
                                variant="dark"
                                onClick={() => handleFavorite(removeFavoriteRecipe, id, "delete", setIsFavorite)}
                                isLoading={isLoading}
                                disabled={isLoading}
                            />
                        )
                    ) : (
                        <Button
                            label="Add to favorites"
                            variant="light"
                            onClick={openSignInModal}
                        />
                    )}
                </div>
            </section>

            <Modal isOpen={isSignInOpen} onClose={closeSignInModal}>
                <SignInModal
                    onSwitchToSignUp={handleSwitchToSignUp}
                    onClose={closeSignInModal}
                />
            </Modal>

            <Modal isOpen={isSignUpOpen} onClose={closeSignUpModal}>
                <SignUpModal
                    onSwitchToSignIn={handleSwitchToSignIn}
                    onClose={closeSignUpModal}
                />
            </Modal>
        </>
    );
};