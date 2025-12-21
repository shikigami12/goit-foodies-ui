import { Link } from "react-router-dom";
import clsx from "clsx";
import { Modal } from "../Modal";
import { SignInModal, SignUpModal } from "../../modals";
import { useModal, useToggleFavorite } from "../../../hooks";
import { Icon } from "../Icon/Icon";
import placeholderUser from "../../../images/user_without_avatar.jpg";
import placeholderRecipe from "../../../assets/No_Preview_image_2.png";

const RecipeCard = ({ recipe }) => {
  const { id, title, owner, instructions, thumb } = recipe;
  const { isFavorite, isLoading, toggleFavorite } = useToggleFavorite(id);

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

  const handleToggleFavorite = async () => {
    const result = await toggleFavorite();
    if (result?.requiresAuth) {
      openSignInModal();
    }
  };

  return (
    <>
      <article className="flex flex-col gap-4">
        <Link
          to={`/recipe/${id}`}
          className="block rounded-[30px] overflow-hidden hover:opacity-90 transition-opacity"
        >
          <img
            src={thumb || placeholderRecipe}
            alt={title}
            className="w-full h-[230px] md:h-[275px] object-cover"
          />
        </Link>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-base md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] line-clamp-1">
              {title}
            </h3>
            <p className="font-medium text-sm md:text-base leading-6 tracking-[-0.02em] text-[#1a1a1a] line-clamp-2 h-12 md:h-[52px]">
              {instructions}
            </p>
          </div>

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

            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleFavorite}
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
