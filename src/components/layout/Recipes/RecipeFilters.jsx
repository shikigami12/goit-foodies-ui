import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectField } from "../../common/Select/SelectField";
import clsx from "clsx";
import SelectFieldSkeleton from "../../common/Skeleton/SelectFieldSkeleton";

export const RecipeFilters = ({ filters, onFilterChange, className }) => {
  const areas = useSelector((state) => state.areas);
  const ingredients = useSelector((state) => state.ingredients);

  const [localFilters, setLocalFilters] = useState(filters || {
    area: "",
    ingredient: ""
  });

  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
    }
  }, [filters]);

  const handleChange = (name, event) => {
    const value = event?.target?.value ?? "";
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className={clsx("grid gap-3.5 md:grid-cols-2 xl:grid-cols-1", className)}>
      {ingredients.isLoading ? <SelectFieldSkeleton /> : <SelectField
        name="ingredient"
        value={localFilters.ingredient}
        onChange={(event) => handleChange("ingredient", event)}
        options={ingredients.ingredients.map(ing => ({ value: ing.id, label: ing.name }))}
        placeholder="Ingredients"
      />}
      {areas.isLoading ? <SelectFieldSkeleton /> : <SelectField
        name="area"
        value={localFilters.area}
        onChange={(event) => handleChange("area", event)}
        options={areas.areas.map(area => ({ value: area.id, label: area.name }))}
        placeholder="Area"
      />}
    </div>
  );
};
