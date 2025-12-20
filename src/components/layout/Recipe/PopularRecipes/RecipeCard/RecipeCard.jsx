import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import styles from "./RecipeCard.module.css";
import cx from "classnames";
import { recipeService } from "../../../../../services/recipeService.js";
import { addToFavorites, removeFromFavorites } from "../../../../../redux/slices/favoritesSlice.js";
import { Modal } from "../../../../common/Modal";
import { SignInModal, SignUpModal } from "../../../../modals";
import { useModal } from "../../../../../hooks";
import IconButton from "../../../../common/IconButton/IconButton.jsx";
import Icon from "../../../../common/Icon";
import { selectFavoriteRecipes } from "../../../../../redux/selectors/selectors.js";
import withoutAvatar from "../../../../../images/user_without_avatar.jpg";

const RecipeCard = ({ recipe }) => {
    const { id, title, owner, instructions, thumb } = recipe;
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

    useEffect(() => {
        setIsFavorite(favoritesRecipe.includes(id));
    }, [favoritesRecipe, id]);

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            openSignInModal();
            return;
        }

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
            console.error('Error toggling favorite:', error);

            if (error?.response?.status === 409) {
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

    return (
        <>
            <li className={cx(styles.recipeCard)}>
                <Link to={`/recipe/${id}`}>
                    <img src={thumb} alt={title} className={styles.recipeImage} />
                </Link>
                <div className={styles.textWrap}>
                    <h3 className={styles.recipeTitle}>{title}</h3>
                    <p className={styles.recipeDescription}>{instructions}</p>
                </div>
                <div className={styles.avatarBtnswrap}>
                    <Link to={`/user/${owner.id}`} className={cx(styles.avatarWrapper)}>
                        <img
                            src={owner.avatar || withoutAvatar}
                            alt={`${owner.name} avatar`}
                            className={styles.avatar}
                        />
                        <span>{owner.name}</span>
                    </Link>
                    <ul className={styles.iconList}>
                        <li>
                            <IconButton
                                style={isFavorite ? styles.style_button_favorit : styles.style_button_notFavorit}
                                iconId="heart"
                                onClick={toggleFavorite}
                                disabled={isLoading}
                            />
                        </li>
                        <li>
                            <Link to={`/recipe/${id}`} className={styles.iconWrapper}>
                                <Icon name="arrow-up-right" stroke="currentColor"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </li>

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

export default RecipeCard;