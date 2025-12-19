import { Categories } from "../components/layout/Categories";
import { Hero } from "../components/Hero/Hero";
import { useEffect, useState, useCallback } from "react";
import { Recipes } from "../components/layout/Recipes";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchAreas } from "../redux/slices/areasSlice";
import { fetchIngredients } from "../redux/slices/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { recipeService } from "../services";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const defaultMeta = {
  title: 'Categories',
  text: 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
};

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category: categoryName } = useParams();
  
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

  const fetchRecipes = useCallback(async (category, page = 1) => {
    try {
      setIsLoading(true);
      setCurrentCategory(category.id);
      setCurrentPage(page);
      
      const data = await recipeService.searchRecipes({ category: category.id, page, limit: 12 });
      setRecipes(data.recipes || []);
      setTotalPages(data.totalPages || 1);
      setMeta({
        title: category.name,
        text: category.description || defaultMeta.text,
      });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setRecipes([]);
      setMeta(defaultMeta);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle URL changes
  useEffect(() => {
    if (categoryName && categories.length > 0) {
      const category = categories.find(
        c => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      
      if (category) {
        fetchRecipes(category);
      }
    } else if (!categoryName) {
      setRecipes([]);
      setMeta(defaultMeta);
      setCurrentCategory(null);
    }
  }, [categoryName, categories, fetchRecipes]);

  const handleCategoryClick = (category) => {
    navigate(ROUTES.CATEGORY.replace(':category', category.name.toLowerCase()));
  };

  const handlePageChange = useCallback((page) => {
    if (currentCategory && categoryName) {
      // Create a dummy category object since we have the ID and name from state/URL
      const category = categories.find(c => c.id === currentCategory);
      if (category) {
        fetchRecipes(category, page);
      }
    }
  }, [currentCategory, categoryName, categories, fetchRecipes]);

  const handleBackToCategories = () => {
    navigate(ROUTES.HOME);
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
        <Categories meta={meta} categories={categories} onCategoryClick={handleCategoryClick} />}
    </div>
  );
};
