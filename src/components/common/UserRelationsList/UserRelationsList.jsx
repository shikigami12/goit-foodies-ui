export const UserRelationsList = ({ items, actionLabel }) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <article
          key={item.id}
          className={`
             border-b border-borders
            space-y-3
            pb-5
            md:pb-10
            ${index === items.length - 1 ? 'last:border-b-0' : ''}
          `}
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-4 items-start">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-[60px] h-[60px] rounded-full object-cover md:w-[85px] md:h-[85px]"
              />

              <div className="flex-1">
                <h3 className="font-extrabold text-[20px] leading-[1.2] tracking-[-0.02em] uppercase text-[#050505] mb-1">
                  {item.name}
                </h3>
                <p className="font-medium text-[14px] leading-[1.42857] tracking-[-0.02em] text-[#bfbebe] mb-2">
                  Own recipes: {item.recipesCount}
                </p>

                <button
                  type="button"
                  className="
                    w-[139px] h-11
                    px-6 py-2.5
                    rounded-[30px]
                    border border-borders
                    font-bold
                    text-[16px]
                    leading-normal
                    tracking-[-0.02em]
                    uppercase
                    text-dark
                    transition-colors
                    cursor-pointer
                    hover:bg-brand hover:text-white
                  "
                >
                  {actionLabel}
                </button>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {item.recipesThumbs.slice(0, 4).map((thumb, idx) => {
                const visibilityClasses =
                  'hidden ' +
                  (idx < 3 ? 'md:block ' : '') +
                  (idx < 4 ? 'xl:block ' : '');

                return (
                  <div
                    key={idx}
                    className={`
          ${visibilityClasses}
          shrink-0
          w-[100px] aspect-square
          rounded-2xl overflow-hidden bg-gray-100
        `}
                  >
                    <img
                      src={thumb}
                      alt={`${item.name} recipe ${idx + 1}`}
                      className="block w-full h-full object-cover object-center"
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="
                w-9 h-9 rounded-full
                border border-borders
                flex items-center justify-center
                text-[#050505]
                cursor-pointer
                transition-colors duration-200
                hover:bg-black hover:text-white
              "
            >
              <svg className="w-5 h-5 stroke-current">
                <use href="/sprite.svg#icon-arrow-up-right" />
              </svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
