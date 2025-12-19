import { Categories } from "../components/layout/Categories";
import { Hero } from "../components/home/Hero";
import { useEffect, useState, useCallback } from "react";
import { Recipes } from "../components/layout/Recipes";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchAreas } from "../redux/slices/areasSlice";
import { fetchIngredients } from "../redux/slices/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { recipeService } from "../services";

const defaultMeta = {
  title: 'Categories',
  text: 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
};

export const HomePage = () => {
  const dispatch = useDispatch();
  const [meta, setMeta] = useState(defaultMeta);
  const { categories } = useSelector((state) => state.categories);
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleRecipe = useCallback(async (category = null, page = 1) => {
    try {
      setIsLoading(true);
      setCurrentCategory(category?.id);
      setCurrentPage(page);
      const data = await recipeService.searchRecipes({ category: category?.id || null, page, limit: 12 });
      setRecipes(data.recipes || []);
      setTotalPages(data.totalPages || 1);
      setMeta({
        title: category ? category.name : defaultMeta.title,
        text: category?.description || defaultMeta.text,
      });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setRecipes([]);
      setMeta(defaultMeta);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page) => {
    if (currentCategory) {
      handleRecipe(currentCategory, page);
    }
  }, [currentCategory, handleRecipe]);

  const handleBackToCategories = () => {
    setRecipes([]);
    setMeta(defaultMeta);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      
      {recipes.length > 0 || isLoading ? 
        <Recipes 
          meta={meta}
          recipes={recipes} 
          totalPages={totalPages} 
          currentPage={currentPage}
          isLoading={isLoading} 
          onBackToCategories={handleBackToCategories} 
          onPageChange={handlePageChange}
        /> :
        <Categories meta={meta} categories={categories} onCategoryClick={handleRecipe} />}
    </div>
  );
};
