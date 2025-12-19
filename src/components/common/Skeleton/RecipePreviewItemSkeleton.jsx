export const RecipePreviewItemSkeleton = () => {
    return (
      <div className="h-[75px] md:h-[100px] flex overflow-hidden animate-pulse">
        {/* Thumb Skeleton */}
        <div className="rounded-[15px] w-[75px] md:w-[100px] h-full flex-shrink-0 bg-gray-200" />
        
        {/* Description Skeleton */}
        <div className="flex-grow text-left pl-2.5 pr-4 md:pr-8 overflow-hidden flex flex-col justify-center">
          <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 md:h-4 bg-gray-100 rounded w-full mb-1" />
          <div className="h-3 md:h-4 bg-gray-100 rounded w-5/6" />
        </div>
        
        {/* Buttons Skeleton */}
        <div className="gap-1 flex-shrink-0 flex flex-row items-start">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200" />
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200" />
        </div>
      </div>
    );
  };
  
  export default RecipePreviewItemSkeleton;
  
