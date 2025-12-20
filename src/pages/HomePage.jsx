import { Categories } from "../components/layout/Categories";
import { Hero } from "../components/Hero/Hero";
import Testemonials from "../components/layout/Testemonials/Testemonials";
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
  const [currentFilters, setCurrentFilters] = useState({
    area: "",
    ingredient: ""
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const fetchRecipes = useCallback(async (category, page = 1, filters = {}) => {
    try {
      setIsLoading(true);
      setCurrentCategory(category?.id || 'all');
      setCurrentPage(page);
      
      const params = {
        ...(category?.id && { category: category.id }),
        page,
        limit: 12,
        ...(filters.area && { area: filters.area }),
        ...(filters.ingredient && { ingredient: filters.ingredient })
      };
      
      const data = await recipeService.searchRecipes(params);
      setRecipes(data.recipes || []);
      setTotalPages(data.totalPages || 1);
      setMeta({
        title: category?.name || 'All Recipes',
        text: category?.description || 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes from all categories.',
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
      if (categoryName.toLowerCase() === 'all') {
        // Fetch all recipes without category filter
        fetchRecipes(null);
      } else {
        const category = categories.find(
          c => c.name.toLowerCase() === categoryName.toLowerCase()
        );
        
        if (category) {
          fetchRecipes(category);
        }
      }
    } else if (!categoryName) {
      setRecipes([]);
      setMeta(defaultMeta);
      setCurrentCategory(null);
    }
  }, [categoryName, categories, fetchRecipes]);

  const handleCategoryClick = (category) => {
    if (category === undefined) {
      navigate(ROUTES.CATEGORY.replace(':category', "all"));
    } else {
      navigate(ROUTES.CATEGORY.replace(':category', category.name.toLowerCase()));
    }
  };

  const handlePageChange = useCallback((page) => {
    if (currentCategory && categoryName) {
      if (categoryName.toLowerCase() === 'all') {
        fetchRecipes(null, page, currentFilters);
      } else {
        const category = categories.find(c => c.id === currentCategory);
        if (category) {
          fetchRecipes(category, page, currentFilters);
        }
      }
    }
  }, [currentCategory, categoryName, categories, currentFilters, fetchRecipes]);

  const handleFilterChange = useCallback((newFilters) => {
    setCurrentFilters(newFilters);
    if (currentCategory && categoryName) {
      if (categoryName.toLowerCase() === 'all') {
        fetchRecipes(null, 1, newFilters);
      } else {
        const category = categories.find(c => c.id === currentCategory);
        if (category) {
          fetchRecipes(category, 1, newFilters);
        }
      }
    }
  }, [currentCategory, categoryName, categories, fetchRecipes]);

  const handleBackToCategories = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-16 tablet:gap-[100px] desktop:gap-[120px]">
      {/* HERO */}
      <Hero />
      
      {/* CATEGORIES OR RECIPES */}
      {categoryName ? 
        <Recipes 
          meta={meta}
          recipes={recipes} 
          totalPages={totalPages} 
          currentPage={currentPage}
          filters={currentFilters}
          isLoading={isLoading} 
          onBackToCategories={handleBackToCategories} 
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
        /> : <Categories meta={meta} categories={categories} onCategoryClick={handleCategoryClick} />}
      <Testemonials />
    </div>
  );
};
