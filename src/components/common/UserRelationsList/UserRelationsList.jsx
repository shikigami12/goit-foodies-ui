import { Link } from 'react-router-dom';

export const UserRelationsList = ({ items, onAction, currentUserId }) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const isMe = currentUserId === item.id;
        const isFollowing = item.isFollowing;

        return (
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
                <Link to={`/user/${item.id}`}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-[60px] h-[60px] rounded-full object-cover md:w-[85px] md:h-[85px] transition-opacity hover:opacity-80"
                  />
                </Link>

                <div className="flex-1">
                  <Link to={`/user/${item.id}`}>
                    <h3 className="font-extrabold text-[20px] leading-[1.2] tracking-[-0.02em] uppercase text-[#050505] mb-1 hover:text-brand transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-medium text-[14px] leading-[1.42857] tracking-[-0.02em] text-[#bfbebe] mb-2">
                    Own recipes: {item.recipesCount}
                  </p>

                  {isMe ? (
                    <button
                      type="button"
                      disabled
                      className="
                        w-[139px] h-11
                        px-6 py-2.5
                        rounded-[30px]
                        border border-gray-200
                        bg-gray-100
                        font-bold
                        text-[16px]
                        leading-normal
                        tracking-[-0.02em]
                        uppercase
                        text-gray-400
                        cursor-default
                      "
                    >
                      You
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAction?.(item.id, isFollowing)}
                      className={`
                        w-[139px] h-11
                        px-6 py-2.5
                        rounded-[30px]
                        border border-borders
                        font-bold
                        text-[16px]
                        leading-normal
                        tracking-[-0.02em]
                        uppercase
                        transition-colors
                        cursor-pointer
                        ${
                          isFollowing
                            ? 'bg-transparent text-dark hover:bg-black hover:text-white'
                            : 'bg-brand text-white hover:bg-brand-dark hover:text-white'
                        }
                      `}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  )}
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
                      className={`${visibilityClasses} w-[100px] h-[100px] rounded-2xl overflow-hidden bg-gray-100`}
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

              <Link
                to={`/user/${item.id}`}
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
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};
