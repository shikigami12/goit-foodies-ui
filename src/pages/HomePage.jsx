import { Categories } from "../components/layout/Categories";
import { useEffect } from "react";
import { Recipes } from "../components/layout/Recipes";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchRecipes } from "../redux/slices/recipesSlice";
import { useDispatch, useSelector } from "react-redux";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { recipes, pagination } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      // Завантажуємо рецепти з першої категорії
      dispatch(fetchRecipes({ category: categories[0].id, page: 1, limit: 12 }));
    }
  }, [categories, dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
        {/* TODO: Add Hero, Categories, Recipes, Testimonials */}
        <Categories meta={{
          title: 'Categories',
          text: 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
        }} categories={categories} />
        <Recipes recipes={recipes} totalPages={pagination.totalPages} />
    </div>
  );
};
