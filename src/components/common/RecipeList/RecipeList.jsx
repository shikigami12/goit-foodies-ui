import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipePreviewItem from '../RecipePreviewItem/RecipePreviewItem';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { ROUTES, TABS } from '../../../constants';

export default function RecipeList() {
  const location = useLocation();
  const [data, setData] = useState({
    recipes: [],
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  });
  const currentRoute = location.pathname.split('/').pop();

  useEffect(() => {
    if (currentRoute.endsWith(ROUTES.RECIPES_MY)) {
      /** TODO: get data from backend */
    } else if (currentRoute.endsWith(ROUTES.RECIPES_FAVORITES)) {
      /** TODO: get data from backend */
    }
  }, [location]);

  if (data.total === 0)
    return (
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-borders md:text-brand-dark mt-20 md:mt-[100px]">
        {currentRoute.endsWith(ROUTES.RECIPES_MY)
          ? EMPTY_LIST_MESSAGES.RECIPES_MY
          : EMPTY_LIST_MESSAGES.FAVORITES_MY}
      </p>
    );

  return (
    <ul className="flex flex-col gap-8 md:gap-10">
      {data.recipes.map(recipe => (
        <li key={recipe.id}>
          <RecipePreviewItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
