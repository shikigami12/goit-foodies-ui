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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import { Modal } from "../components/common/Modal/Modal";
import { SignInModal } from "../components/modals/SignInModal";
import { SignUpModal } from "../components/modals/SignUpModal";

const defaultMeta = {
  title: 'Categories',
  text: 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
};

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('signin');

  useEffect(() => {
    if (location.state?.authRequired) {
      setIsAuthModalOpen(true);
      setAuthModalType('signin');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setAuthModalType('signup');
  };

  const handleSwitchToSignIn = () => {
    setAuthModalType('signin');
  };

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
    } catch {
      setRecipes([]);
      setMeta(defaultMeta);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categoryName && categories.length > 0) {
      if (categoryName.toLowerCase() === 'all') {
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
    <div className="flex flex-col gap-16 tablet:gap-[100px] desktop:gap-[120px]">
      <Hero />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        {categoryName ? (
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
          />
        ) : (
          <Categories
            meta={meta}
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <Testemonials />
      </div>

      <Modal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal}>
        {authModalType === 'signin' ? (
          <SignInModal
            onClose={handleCloseAuthModal}
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        ) : (
          <SignUpModal
            onClose={handleCloseAuthModal}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        )}
      </Modal>
    </div>
  );
};
