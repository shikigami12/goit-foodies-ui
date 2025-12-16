import { CategoryList } from "../CategoryList";
import { MainTitle } from "../../common/MainTitle/MainTitle";
import { Subtitle } from "../../common/Subtitle/Subtitle";

export const Categories = ({ meta, categories }) => {
  return (
    <section>
      {meta.title && <MainTitle>{meta.title}</MainTitle>}
      {meta.text && <Subtitle>{meta.text}</Subtitle>}
      {categories.length > 0 && <CategoryList categories={categories} />}
    </section>
  );
};
