import { useLocation, useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipePreviewItem from '../RecipePreviewItem/RecipePreviewItem';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../constants';
import { fetchFavoriteRecipes, fetchOwnRecipes, fetchRecipes } from '../../../redux/slices/recipesSlice';
import { RecipePagination } from '../../layout/Recipes/RecipePagination';
import RecipePreviewItemSkeleton from '../Skeleton/RecipePreviewItemSkeleton';

export default function RecipeList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { isCurrentUser } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { recipes, pagination, isLoading } = useSelector(state => state.recipes);
  const { currentPage, totalPages, limit } = pagination;

  const page = Number(searchParams.get('page')) || 1;
  const currentRoute = location.pathname;

  useEffect(() => {
    const params = { page, limit };

    if (isCurrentUser) {
      if (currentRoute.includes(ROUTES.RECIPES_MY)) {
        dispatch(fetchOwnRecipes(params));
      } else if (currentRoute.includes(ROUTES.RECIPES_FAVORITES)) {
        dispatch(fetchFavoriteRecipes(params));
      }
    } else {
      // Fetching recipes for another user profile
      if (currentRoute.includes(ROUTES.RECIPES_MY)) {
        dispatch(fetchRecipes({ ...params, owner: id }));
      }
    }
  }, [dispatch, currentRoute, page, limit, isCurrentUser, id]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-8 md:gap-10">
        {[...Array(4)].map((_, i) => (
          <li key={i}>
            <RecipePreviewItemSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (recipes.length === 0)
    return (
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-borders md:text-brand-dark mt-20 md:mt-[100px] md:max-w-[640px] md:mx-auto">
        {currentRoute.includes(ROUTES.RECIPES_MY)
          ? EMPTY_LIST_MESSAGES.RECIPES_MY
          : EMPTY_LIST_MESSAGES.FAVORITES_MY}
      </p>
    );

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <ul className="flex flex-col gap-8 md:gap-10">
        {recipes.map(recipe => (
          <li key={recipe._id || recipe.id}>
            <RecipePreviewItem 
              recipe={recipe} 
              type={currentRoute.includes(ROUTES.RECIPES_MY) ? 'own' : 'favorite'} 
              isCurrentUser={isCurrentUser}
            />
          </li>
        ))}
      </ul>
      
      {totalPages > 1 && (
        <RecipePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
