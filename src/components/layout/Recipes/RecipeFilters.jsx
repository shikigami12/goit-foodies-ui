import { useState } from "react";
import { useSelector } from "react-redux";
import { SelectField } from "../../common/Select/SelectField";
import clsx from "clsx";
import SelectFieldSkeleton from "../../common/Skeleton/SelectFieldSkeleton";

export const RecipeFilters = ({ filters, onFilterChange, className }) => {
  // TODO: Add handlers to filter changes
  const areas = useSelector((state) => state.areas);
  const ingredients = useSelector((state) => state.ingredients);

  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (name, value) => {
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={clsx("grid gap-3.5 md:grid-cols-2 xl:grid-cols-1", className)}>
      {ingredients.isLoading ? <SelectFieldSkeleton /> : <SelectField
        name="ingredient"
        value={localFilters.ingredient}
        onChange={(value) => handleChange("ingredient", value)}
        options={ingredients.ingredients.map(ing => ({ value: ing.id, label: ing.name }))}
        placeholder="Ingredients"
      />}
      {areas.isLoading ? <SelectFieldSkeleton /> : <SelectField
        name="area"
        value={localFilters.area}
        onChange={(value) => handleChange("area", value)}
        options={areas.areas.map(area => ({ value: area.id, label: area.name }))}
        placeholder="Area"
      />}
    </div>
  );
};
