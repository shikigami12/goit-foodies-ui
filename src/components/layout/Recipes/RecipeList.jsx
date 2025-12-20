import clsx from "clsx";
import { RecipeCard } from "../../common/RecipeCard";

export const RecipeList = ({ recipes, className }) => {
  return (
    <ul className={clsx("grid gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-8 xl:grid-cols-3", className)}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};
