export const RecipePagination = ({ currentPage, totalPages, onPageChange }) => {
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

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Попередня сторінка"
      >
        ‹
      </button>
      
      {visiblePages.map((page, index) => (
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg border transition-colors ${
              currentPage === page
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Наступна сторінка"
      >
        ›
      </button>
    </div>
  );
};
