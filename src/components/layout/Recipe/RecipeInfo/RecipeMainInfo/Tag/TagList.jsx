import { nanoid } from "@reduxjs/toolkit";
import { TagListItem } from "./TagItem.jsx";
import styles from "./Tag.module.css";

export const TagList = ({ tags }) => {
    const tagsObject = Array.isArray(tags) ? tags[0] : tags;
    const tagsKeys = Object.keys(tagsObject || {});

    return (
        <ul className={styles.tags_list}>
            {tagsKeys.map((tagsKey) => (
                <TagListItem key={nanoid()} tagInfo={tagsObject[tagsKey]} />
            ))}
        </ul>
    );
};