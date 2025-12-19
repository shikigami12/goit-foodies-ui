import { useState } from "react";
import { RecipeFilters } from "../Recipes/RecipeFilters";
import { RecipeList } from "../Recipes/RecipeList";
import { RecipePagination } from "../Recipes/RecipePagination";
import { MainTitle } from "../../common/MainTitle/MainTitle";
import { Subtitle } from "../../common/Subtitle/Subtitle";

export const Recipes = ({ meta = {}, recipes, totalPages, currentPage = 1, onBackToCategories, onPageChange, isLoading }) => {
    const [filters, setFilters] = useState({
        area: "",
        ingredient: ""
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (isLoading) {
        return <section>
            <div className="animate-pulse rounded-2xl h-[18px] w-16 bg-gray-300 mb-4"></div>
            <div className="animate-pulse rounded-2xl h-3.5 w-full max-w-3xl bg-gray-300 mb-2"></div>
            <div className="animate-pulse rounded-2xl h-3.5 w-full max-w-3xl bg-gray-300 mb-2"></div>
            <div className="animate-pulse rounded-2xl h-3.5 w-full max-w-3xl bg-gray-300 mb-10"></div>
            <div className="flex flex-col gap-8 md:gap-10 xl:flex-row">
                <div className="flex-none self-start xl:w-[330px]">
                    <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-1">
                        <div className="animate-pulse rounded-full h-14 w-full bg-gray-300"></div>
                        <div className="animate-pulse rounded-full h-14 w-full bg-gray-300"></div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="grid gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-8 xl:grid-cols-3 mb-8 xl:mb-[60px]">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="animate-pulse rounded-2xl h-[427px] w-full bg-gray-300"></div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="animate-pulse rounded-full h-10 w-10 bg-gray-300"></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>;
    }

    return (
        <section>
            <div className="mb-4">
                <button onClick={() => onBackToCategories()} className="group flex items-center gap-1.5 font-sans font-bold text-sm leading-[18px] cursor-pointer uppercase mb-5">
                    <svg className="fill-current group-hover:-translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.46964 3.16638C8.76252 2.87356 9.23731 2.87359 9.53019 3.16638C9.82305 3.4593 9.82311 3.93406 9.53019 4.22692L5.50675 8.24939L14.3026 8.25036C14.7168 8.25041 15.0526 8.58626 15.0526 9.00036C15.0526 9.41458 14.7169 9.75041 14.3026 9.75036L5.50577 9.74939L9.52921 13.7728C9.82202 14.0657 9.822 14.5405 9.52921 14.8334C9.23628 15.1262 8.76152 15.1263 8.46866 14.8334L3.16593 9.52966C2.87309 9.23675 2.87306 8.76198 3.16593 8.46911L8.46964 3.16638Z" />
                    </svg>
                    <span>Back</span>
                </button>
            </div>
            {meta.title && <MainTitle className="mb-4 tablet:mb-5">{meta.title}</MainTitle>}
            {meta.text && <Subtitle className="mb-8 tablet:mb-10 max-w-xl">{meta.text}</Subtitle>}
            <div className="flex flex-col gap-8 md:gap-10 xl:flex-row">
                <RecipeFilters className="flex-none self-start w-full xl:w-[330px]" filters={filters} onFilterChange={handleFilterChange} />
                <div className="">
                    {recipes.length > 0 ? (
                        <>
                            <RecipeList recipes={recipes} className="mb-8 xl:mb-[60px]" />
                            <RecipePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-8">Recipes not found</p>
                    )}
                </div>
            </div>
        </section>
    );
};
