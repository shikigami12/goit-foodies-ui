import { Categories } from "../components/layout/Categories";
import { useEffect, useState } from "react";
import { categoriesService } from "../services";

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [metaInfo, setMetaInfo] = useState({
    title: 'Categories',
    text: 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
  });

  useEffect(() => {
    // Fetch categories from the service when the component mounts
    const fetchCategories = async () => {
      // Placeholder for actual service call
      const categories = await categoriesService.getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1>Home Page</h1>
        <button className="bg-red-600 text-red-800 px-4 py-2 rounded-lg">
            Button
        </button>

        {/* TODO: Add Hero, Categories, Recipes, Testimonials */}
        <Categories meta={metaInfo} categories={categories} />
    </div>
  );
};
