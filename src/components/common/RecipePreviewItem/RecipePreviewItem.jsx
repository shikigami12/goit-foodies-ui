import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from '../Icon';
import { ROUTES } from '../../../constants';
import { useWindowWidth } from '../../../hooks';
import { RoundButton } from '../RoundButton';
import { deleteRecipeThunk, removeFavoriteThunk } from '../../../redux/slices/recipesSlice';
import { decrementFavoritesCount, decrementRecipesCount } from '../../../redux/slices/usersSlice';
import GoToButton from '../GoToButton';

const DeleteButton = ({ id, type, iconSize }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === 'own') {
      dispatch(deleteRecipeThunk(id));
      dispatch(decrementRecipesCount());
    } else {
      dispatch(removeFavoriteThunk(id));
      dispatch(decrementFavoritesCount());
    }
  };

  return (
    <RoundButton onClick={handleDelete}>
      <Icon name="trash" size={iconSize} />
    </RoundButton>
  );
};

export default function RecipePreviewItem({ recipe, type, isCurrentUser }) {
  const windowWidth = useWindowWidth();
  const iconSize = windowWidth < 768 ? 16 : 18;

  // Replace newlines with spaces for proper line-clamp behavior
  const cleanInstructions = recipe.instructions.replace(/\r\n|\r|\n/g, ' ');

  return (
    <div className="h-[75px] md:h-[100px] flex overflow-hidden">
      {/* Thumb */}
      <div className="rounded-[15px] w-[75px] md:w-[100px] h-full flex-shrink-0 overflow-hidden">
        <img src={recipe.thumb} className="w-full h-full object-cover" />
      </div>
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
