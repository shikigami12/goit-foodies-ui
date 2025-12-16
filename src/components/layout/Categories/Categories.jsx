import { useEffect, useState } from "react";
import { CategoryList } from "../CategoryList";
import { categoriesService } from "../../../services";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  
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
    <div>
      <CategoryList categories={categories} />
    </div>
  );
};
