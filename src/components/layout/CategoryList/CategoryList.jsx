import { useMemo } from "react";
import clsx from "clsx";
import { Icon } from "../../common/Icon/Icon";

export const CategoryList = ({ categories, onCategoryClick }) => {
  // Generate random positions for wide categories in each triplet
  const randomPositions = useMemo(() => {
    const triplets = Math.ceil(categories.length / 3);
    const positions = [];
    let prevPosition = -1;

    for (let i = 0; i < triplets; i++) {
      let newPosition;
      do {
        newPosition = Math.floor(Math.random() * 3);
      } while (newPosition === prevPosition && triplets > 1);

      positions.push(newPosition);
      prevPosition = newPosition;
    }

    return positions;
  }, [categories.length]);
  const list = [...categories];
  list.push({ id: null, name: "All Categories" });

  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-15">
      {list.map((category, index) => {
        const { id, name, thumb } = category;
        const tripletIndex = Math.floor(index / 3);
        const positionInTriplet = index % 3;
        const isWide = randomPositions[tripletIndex] === positionInTriplet;

        return (
          <li key={id} className={clsx("rounded-[20px] overflow-hidden relative md:rounded-[30px] md:max-lg:nth-[5n+3]:col-span-2", {
            "xl:col-span-7": isWide,
            "xl:col-span-4": !isWide
          })}>
            {id === null ? (
              <button
                onClick={() => onCategoryClick()}
                className="cursor-pointer text-base md:text-xl text-white uppercase font-extrabold w-full text-center h-[250px] md:h-[369px] bg-[#050505] hover:bg-[#1a1a1a] transition-colors"
              >
                All Categories
              </button>
            ) : (
              <button
                onClick={() => onCategoryClick(category)}
                className="w-full h-full text-left cursor-pointer group"
              >
                <img src={thumb} alt={name} width={343} height={250} className="w-full h-[250px] md:h-[369px] object-cover" />
                <div className="absolute inset-0 bg-[rgba(5,5,5,0.2)] group-hover:bg-[rgba(5,5,5,0.3)] transition-colors" />
                <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 flex items-center gap-1">
                  <span className="border border-white/20 bg-white/20 rounded-[30px] text-white px-3 py-[7px] font-bold text-base md:text-xl md:py-[10px] md:px-[14px] leading-6 tracking-[-0.02em]">
                    {name}
                  </span>
                  <span className="flex items-center justify-center p-[10px] md:p-[13px] border border-white/20 rounded-[30px] text-white group-hover:border-white/40 transition-colors">
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </div>
              </button>
            )}
          </li>)
      })}
    </ul>
  );
};
