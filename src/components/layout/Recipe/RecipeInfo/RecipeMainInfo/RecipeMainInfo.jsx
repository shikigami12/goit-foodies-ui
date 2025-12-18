import { OwnerCard } from "./OwnerCard/OwnerCard";
import { TagList } from "./Tag/TagList";
import styles from "./RecipeMainInfo.module.css";

export const RecipeMainInfo = ({ data }) => {
    const { area, category, time, title, instructions, owner } = data;

    return (
        <div className={styles.recipe_main_info_wrapper}>
            <h3 className={styles.recipe_header}>{title}</h3>
            <TagList tags={{
                area: area?.name,
                category: category?.name,
                time: time
            }} />
            <p className={styles.recipe_description}>{instructions}</p>
            <OwnerCard owner={owner} />
        </div>
    );
};