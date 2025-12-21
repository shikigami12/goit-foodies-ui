import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { recipeService } from "../../../../services/recipeService";
import { addToFavorites, removeFromFavorites } from "../../../../redux/slices/favoritesSlice";
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
    const dispatch = useDispatch();
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

    const toggleFavorite = async () => {
        setIsLoading(true);
        try {
            if (isFavorite) {
                await recipeService.removeFavorite(id);
                dispatch(removeFromFavorites(id));
                setIsFavorite(false);
                toast.success("Recipe removed from favorites!");
            } else {
                await recipeService.addFavorite(id);
                dispatch(addToFavorites(id));
                setIsFavorite(true);
                toast.success("Recipe added to favorites!");
            }
        } catch (error) {
            if (error?.status === 409) {
                toast("Recipe is already in your favorites!");
                dispatch(addToFavorites(id));
                setIsFavorite(true);
            } else {
                toast.error("Failed to update favorites");
            }
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
                        <Button
                            label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            variant={isFavorite ? "dark" : "light"}
                            onClick={toggleFavorite}
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
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