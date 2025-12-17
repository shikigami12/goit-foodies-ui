import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../Icon';
import { ROUTES } from '../../../constants';
import { useWindowWidth } from '../../../hooks';
import {RoundButton} from '../RoundButton';
//  {
//       id: "e14c977f-bfff-511a-a0d1-fba99c157626",
//       title: "Fennel Dauphinoise",
//       instructions:
//         "Heat oven to 180C/160C fan/gas 4. Put potatoes, fennel, and garlic in a medium non-stick pan. Pour in milk and double cream, season well and simmer gently, covered, for 10 mins, stirring halfway through, until potatoes are just tender.\r\nDivide the mixture between 2 small (about 150ml) buttered ramekins and scatter with Parmesan. Bake for 40 mins until the potatoes are golden and tender when pierced with a knife. Snip the reserved fennel fronds over before serving.",
//       thumb:
//         "https://ftp.goit.study/img/so-yummy/preview/Fennel%20Dauphinoise.jpg",
//       time: "50 min",
//       ownerId: "c4ba056e-ae75-50ba-a3eb-95f5a1acace6",
//       categoryId: "e064c76b-1f1b-5d61-aa10-b7060062e3b7",
//       areaId: "443a57e2-c787-5b68-b8ba-8f609c2f353e",
//       created_at: "2025-12-10T17:33:52.633Z",
//       updated_at: "2025-12-10T17:33:52.633Z",
//       category: {
//         id: "e064c76b-1f1b-5d61-aa10-b7060062e3b7",
//         name: "Side",
//         thumb:
//           "https://res.cloudinary.com/dpzujl2dr/image/upload/v1765389435/categories/vvjkmlkqpb2hpg8fz6zj.jpg",
//       },
//       area: {
//         id: "443a57e2-c787-5b68-b8ba-8f609c2f353e",
//         name: "French",
//       },
//       owner: {
//         id: "c4ba056e-ae75-50ba-a3eb-95f5a1acace6",
//         name: "GoIT",
//         avatar: null,
//       },
//     },

export default function RecipePreviewItem({ recipe }) {
  const windowWidth = useWindowWidth();
  const iconSize = windowWidth < 768 ? 16 : 18;
  const onTrashClick = id => {
    console.log('TODO: Add delete handler, clicked ID: ' + id);
  };
  
  // Replace newlines with spaces for proper line-clamp behavior
  const cleanInstructions = recipe.instructions.replace(/\r\n|\r|\n/g, ' ');
  
  return (
    <div className="h-[75px] md:h-[100px] flex overflow-hidden">
      {/* Thumb */}
      <div className="rounded-[15px] w-[75px] min-w-[75px] max-w-[75px] md:w-[100px] md:min-w-[100px] md:max-w-[100px] h-full flex-1 overflow-hidden">
        <img src={recipe.thumb} />
      </div>
      {/* Description */}
      <div className="text-left pl-2.5 pr-4 md:pr-8">
        <p className="font-extrabold text-base md:text-xl leading-[150%] md:leading-[120%] tracking-[-0.02em] uppercase text-brand mb-2 overflow-hidden text-ellipsis line-clamp-1">{recipe.title}</p>
        <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-borders md:text-brand-dark overflow-hidden text-ellipsis line-clamp-2">{cleanInstructions}</p>
      </div>
      {/* Buttons */}
      <div className="gap-1 flex-1 flex flex-row">
        <Link
          to={ROUTES.RECIPE.replace(':id', recipe.id)}
        >
          <RoundButton>
            <Icon name="arrow-up-right" size={iconSize} />
          </RoundButton>
        </Link>
        <RoundButton
          onClick={() => {
            onTrashClick(recipe.id);
          }}
        >
          <Icon name="trash" size={iconSize} />
        </RoundButton>
      </div>
    </div>
  );
}
