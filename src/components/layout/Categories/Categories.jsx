import { CategoryList } from "../CategoryList";
import { MainTitle } from "../../common/MainTitle/MainTitle";
import { Subtitle } from "../../common/Subtitle/Subtitle";

export const Categories = ({ meta, categories, onCategoryClick }) => {
  return (
    <section>
      {meta.title && <MainTitle className="mb-4 tablet:mb-5">{meta.title}</MainTitle>}
      {meta.text && <Subtitle className="mb-8 tablet:mb-10 max-w-xl">{meta.text}</Subtitle>}
      {categories.length > 0 && <CategoryList categories={categories} onCategoryClick={onCategoryClick} />}
    </section>
  );
};
