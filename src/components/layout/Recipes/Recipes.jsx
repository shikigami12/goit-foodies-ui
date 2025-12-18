import { useState } from "react";
import { RecipeFilters } from "../Recipes/RecipeFilters";
import { RecipeList } from "../Recipes/RecipeList";
import { RecipePagination } from "../Recipes/RecipePagination";

export const Recipes = ({ meta = {}, recipes, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        category: "",
        area: "",
        ingredient: ""
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <div className="mb-4">
                <button className="group flex items-center gap-1.5 font-sans font-bold text-sm leading-[18px] cursor-pointer uppercase mb-5">
                    <svg className="fill-current group-hover:-translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.46964 3.16638C8.76252 2.87356 9.23731 2.87359 9.53019 3.16638C9.82305 3.4593 9.82311 3.93406 9.53019 4.22692L5.50675 8.24939L14.3026 8.25036C14.7168 8.25041 15.0526 8.58626 15.0526 9.00036C15.0526 9.41458 14.7169 9.75041 14.3026 9.75036L5.50577 9.74939L9.52921 13.7728C9.82202 14.0657 9.822 14.5405 9.52921 14.8334C9.23628 15.1262 8.76152 15.1263 8.46866 14.8334L3.16593 9.52966C2.87309 9.23675 2.87306 8.76198 3.16593 8.46911L8.46964 3.16638Z" />
                    </svg>
                    <span>Back</span>
                </button>
            </div>
            {meta.title && <MainTitle className="mb-4">{meta.title}</MainTitle>}
            {meta.text && <Subtitle className="mb-8">{meta.text}</Subtitle>}
            <RecipeFilters className="mb-8" filters={filters} onFilterChange={handleFilterChange} />
            {recipes.length > 0 ? (
                <>
                    <RecipeList recipes={recipes} />
                    <RecipePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <p className="text-center text-gray-500 py-8">Recipes not found</p>
            )}
        </section>
    );
};
