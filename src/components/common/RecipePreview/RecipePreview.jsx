import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from '../Icon';
import { ROUTES } from '../../../constants';
import { useWindowWidth } from '../../../hooks';
import { RoundButton } from '../RoundButton';
import { deleteRecipeThunk, removeFavoriteThunk } from '../../../redux/slices/recipesSlice';
import { decrementFavoritesCount, decrementRecipesCount } from '../../../redux/slices/usersSlice';
import GoToButton from '../GoToButton';

import { useState } from 'react';
import { showWarning } from '../../../utils/notification';

const DeleteButton = ({ id, type, iconSize }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (type === 'own') {
        await dispatch(deleteRecipeThunk(id)).unwrap();
        dispatch(decrementRecipesCount());
      } else {
        await dispatch(removeFavoriteThunk(id)).unwrap();
        dispatch(decrementFavoritesCount());
      }
    } catch (error) {
      showWarning(error || 'Failed to delete recipe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoundButton onClick={handleDelete} isLoading={isLoading}>
      <Icon name="trash" size={iconSize} />
    </RoundButton>
  );
};

export default function RecipePreview({ recipe, type, isCurrentUser }) {
  const { isMobile } = useWindowWidth();
  const iconSize = isMobile ? 16 : 18;

  // Replace newlines with spaces for proper line-clamp behavior
  const cleanInstructions = recipe.instructions.replace(/\r\n|\r|\n/g, ' ');

  return (
    <div className="h-[75px] md:h-[100px] flex overflow-hidden">
      {/* Thumb */}
      <Link
        to={ROUTES.RECIPE.replace(':id', recipe.id || recipe._id)}
        className="rounded-[15px] w-[75px] md:w-[100px] h-full flex-shrink-0 overflow-hidden block hover:opacity-90 transition-opacity"
      >
        <img src={recipe.thumb} alt={recipe.title} className="w-full h-full object-cover" />
      </Link>
      {/* Description */}
      <div className="flex-grow text-left pl-2.5 pr-4 md:pr-8 overflow-hidden">
        <p className="font-extrabold text-base md:text-xl leading-[150%] md:leading-[120%] tracking-[-0.02em] uppercase text-brand mb-2 overflow-hidden text-ellipsis line-clamp-1">
          {recipe.title}
        </p>
        <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-borders md:text-brand-dark overflow-hidden text-ellipsis line-clamp-2">
          {cleanInstructions}
        </p>
      </div>
      {/* Buttons */}
      <div className="gap-1 flex-shrink-0 flex flex-row items-start">
        <GoToButton id={recipe.id || recipe._id} iconSize={iconSize} />
        {isCurrentUser && (
          <DeleteButton id={recipe.id || recipe._id} type={type} iconSize={iconSize} />
        )}
      </div>
    </div>
  );
}
