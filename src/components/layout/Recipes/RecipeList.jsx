import { Link } from "react-router-dom";
import { Icon } from "../../common/Icon/Icon";
import { Modal } from "../../common/Modal";
import { SignInModal, SignUpModal } from "../../modals";
import { useModal, useToggleFavorite } from "../../../hooks";
import placeholderUser from "../../../images/user_without_avatar.jpg";
import clsx from "clsx";

const RecipeItem = ({ recipe }) => {
  const { id, title, thumb, instructions, owner } = recipe;
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
      <li className="">
        <img 
          src={thumb} 
          alt={title}
          width={342}
          height={230}
          className="w-full h-[230px] object-cover rounded-[20px] md:rounded-[30px] mb-4" 
        />
        <div className="mb-2">
          <h3 className="h3-mobile line-clamp-1 mb-2">{title}</h3>
          <p className="line-clamp-2">{instructions}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Link to={`/user/${owner.id}`} className="flex items-center gap-2">
            <img 
              src={owner.avatar ?? placeholderUser} 
              alt={owner.name}
              width={32}
              height={32}
              className="size-8 rounded-full object-cover" 
            />
            <div className="font-sans text-sm font-bold leading-5">{owner.name}</div>
          </Link>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleToggleFavorite}
              disabled={isLoading}
              className={clsx(
                "p-[9px] border rounded-full transition-colors cursor-pointer",
                isFavorite 
                  ? "border-[#050505] bg-[#050505] text-white hover:bg-[#1a1a1a]"
                  : "border-[#E8E8E8] hover:border-gray-300 active:border-gray-400 active:text-gray-400"
              )}
            >
              <Icon name="heart" size={16} />
            </button>
            <Link to={`/recipe/${id}`} className="p-[9px] border border-[#E8E8E8] rounded-full hover:border-gray-300 transition-colors cursor-pointer active:border-gray-400 active:text-gray-400">
              <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>
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

export const RecipeList = ({ recipes, className }) => {
  return (
    <ul className={clsx("grid gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-8 xl:grid-cols-3", className)}>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
};
