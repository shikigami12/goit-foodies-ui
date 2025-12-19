import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipePreviewItem from '../RecipePreviewItem/RecipePreviewItem';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../constants';
import { fetchFavoriteRecipes, fetchOwnRecipes } from '../../../redux/slices/recipesSlice';
import { RecipePagination } from '../../layout/Recipes/RecipePagination';

export default function RecipeList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { recipes, pagination, isLoading } = useSelector(state => state.recipes);
  const { currentPage, totalPages, limit } = pagination;

  const page = Number(searchParams.get('page')) || 1;
  const currentRoute = location.pathname;

  useEffect(() => {
    const params = { page, limit };

    if (currentRoute.includes(ROUTES.RECIPES_MY)) {
      dispatch(fetchOwnRecipes(params));
    } else if (currentRoute.includes(ROUTES.RECIPES_FAVORITES)) {
      dispatch(fetchFavoriteRecipes(params));
    }
  }, [dispatch, currentRoute, page, limit]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
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
