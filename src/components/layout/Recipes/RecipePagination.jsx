import clsx from "clsx";

export const RecipePagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  if (isLoading) {
    return <div className="flex justify-center items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-full h-10 w-10 bg-gray-300"></div>
      ))}
    </div>
  }

  const visiblePages = getVisiblePages();

  if (visiblePages.length === 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-1.5">
      {visiblePages.map((page, index) => (
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx("size-10 rounded-full border text-sm text-center transition-colors", {
              "border-[#050505]": currentPage === page,
              "border-transparent hover:border-gray-300 cursor-pointer": currentPage !== page
            })}
          >
            {page}
          </button>
        )
      ))}
    </div>
  );
};
