import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";
import { recipeService } from "../../../services/recipeService";
import { addToFavorites, removeFromFavorites } from "../../../redux/slices/favoritesSlice";
import { Modal } from "../Modal";
import { SignInModal, SignUpModal } from "../../modals";
import { useModal } from "../../../hooks";
import { Icon } from "../Icon/Icon";
import { selectFavoriteRecipes } from "../../../redux/selectors/selectors";
import placeholderUser from "../../../images/user_without_avatar.jpg";

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
      console.error("Error toggling favorite:", error);

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
      <article className="flex flex-col gap-4">
        {/* Image */}
        <Link
          to={`/recipe/${id}`}
          className="block rounded-[30px] overflow-hidden hover:opacity-90 transition-opacity"
        >
          <img
            src={thumb}
            alt={title}
            className="w-full h-[230px] md:h-[275px] object-cover"
          />
        </Link>

        {/* Content section */}
        <div className="flex flex-col gap-2">
          {/* Text */}
          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-base md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] line-clamp-1">
              {title}
            </h3>
            <p className="font-medium text-sm md:text-base leading-6 tracking-[-0.02em] text-[#1a1a1a] line-clamp-2 h-12 md:h-[52px]">
              {instructions}
            </p>
          </div>

          {/* User and buttons */}
          <div className="flex justify-between items-center">
            <Link
              to={`/user/${owner.id}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={owner.avatar ?? placeholderUser}
                alt={owner.name}
                className="size-8 md:size-10 rounded-[30px] object-cover"
              />
              <span className="font-bold text-sm md:text-base leading-6 tracking-[-0.02em] text-[#1a1a1a]">
                {owner.name}
              </span>
            </Link>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleFavorite}
                disabled={isLoading}
                className={clsx(
                  "flex items-center justify-center p-[10px] md:p-3 border rounded-[30px] transition-colors cursor-pointer",
                  isFavorite
                    ? "border-[#050505] bg-[#050505] text-white hover:bg-[#1a1a1a] hover:border-[#1a1a1a]"
                    : "border-[#bfbebe] hover:bg-[#050505] hover:border-[#050505] hover:text-white"
                )}
              >
                <Icon name="heart" size={18} />
              </button>
              <Link
                to={`/recipe/${id}`}
                className="flex items-center justify-center p-[10px] md:p-3 border border-[#bfbebe] rounded-[30px] hover:bg-[#050505] hover:border-[#050505] hover:text-white transition-colors cursor-pointer"
              >
                <Icon name="arrow-up-right" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </article>

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
