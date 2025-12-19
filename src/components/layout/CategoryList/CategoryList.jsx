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
            {id === null ? <button 
              onClick={() => onCategoryClick()}
              className="cursor-pointer text-base text-white uppercase font-extrabold w-full text-center h-[250px] md:h-[369px] bg-[#050505]"
            >
              All Categories
            </button> : 
            (<>
              <img src={thumb} alt={name} width={343} height={250} className="w-full h-[250px] md:h-[369px] object-cover" />
              <div className="absolute inset-0 p-4 flex items-end gap-1 bg-black/20">
                <div className="border border-white bg-white/20 rounded-full text-white px-3 py-[7px] font-sans font-bold text-base md:text-xl md:py-[9px] md:px-[13px] leading-6 -tracking-[2%]">{name}</div>
                <button 
                  onClick={() => onCategoryClick(category)}
                  className="flex items-center justify-center p-2.5 border border-white/20 rounded-full text-white md:p-3 hover:border-white transition-colors cursor-pointer active:border-white/60 active:text-white/60"
                >
                  <Icon name="arrow-up-right" size={18} />
                </button>
              </div>
            </>)}
          </li>)
      })}
    </ul>
  );
};
