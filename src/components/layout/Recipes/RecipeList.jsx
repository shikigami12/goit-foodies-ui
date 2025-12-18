import { Link } from "react-router-dom";
import { Icon } from "../../common/Icon/Icon";

export const RecipeList = ({ recipes }) => {
  return (
    <ul className="grid gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-8 xl:grid-cols-3">
      {recipes.map(({ id, title, thumb, instructions, owner }) => (
        <li key={id} className="">
          <Link to={`/recipe/${id}`} className="block">
            <img 
              src={thumb} 
              alt={title}
              width={342}
              height={230}
              className="w-full h-[230px] object-cover rounded-[20px] md:rounded-[30px] mb-4" 
            />
            <div className="mb-2">
              <h3 className="h3-mobile line-clamp-1 mb-2">{title}</h3>
              <p className="line-clamp-2">{instructions}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                {<img 
                  src={owner.avatar ?? "https://i.pravatar.cc/32"} 
                  alt={owner.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover" 
                />}
                <div className="font-sans text-sm font-bold leading-5">{owner.name}</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-[9px] border border-[#E8E8E8] rounded-full hover:border-gray-300 transition-colors cursor-pointer active:border-gray-400 active:text-gray-400">
                  <Icon name="icon-heart" size={16} />
                </button>
                <button className="p-[9px] border border-[#E8E8E8] rounded-full hover:border-gray-300 transition-colors cursor-pointer active:border-gray-400 active:text-gray-400">
                  <Icon name="arrow-up-right" size={16} />
                </button>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
