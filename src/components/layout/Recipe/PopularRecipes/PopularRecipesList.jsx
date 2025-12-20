import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import RecipeCard from "./RecipeCard/RecipeCard.jsx";
import styles from "./PopularRecipes.module.css";

export const PopularRecipesList = ({ recipes }) => {
    if (recipes.length === 0) {
        return <p>No popular recipes found</p>;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
            }}
            className={styles.popular_recipes_list}
        >
            {recipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};