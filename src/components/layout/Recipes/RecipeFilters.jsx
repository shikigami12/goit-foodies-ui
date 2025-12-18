import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../common/Select/SelectField";
import { fetchCategories } from "../../../redux/slices/categoriesSlice";
import { fetchAreas } from "../../../redux/slices/areasSlice";
import { fetchIngredients } from "../../../redux/slices/ingredientsSlice";
import clsx from "clsx";

export const RecipeFilters = ({ filters, onFilterChange, className }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { areas } = useSelector((state) => state.areas);
  const { ingredients } = useSelector((state) => state.ingredients);

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleChange = (name, value) => {
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { category: "", area: "", ingredient: "" };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={clsx("grid gap-3.5 md:grid-cols-3 md:gap-5", className)}>
      <SelectField
        name="area"
        value={localFilters.area}
        onChange={(value) => handleChange("area", value)}
        options={areas.map(area => ({ value: area.id, label: area.name }))}
        placeholder="Країна"
      />
      <SelectField
        name="ingredient"
        value={localFilters.ingredient}
        onChange={(value) => handleChange("ingredient", value)}
        options={ingredients.map(ing => ({ value: ing.id, label: ing.name }))}
        placeholder="Інгредієнт"
      />
    </div>
  );
};
