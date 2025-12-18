import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../Icon';
import { ROUTES } from '../../../constants';
import { useWindowWidth } from '../../../hooks';
import { RoundButton } from '../RoundButton';

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
        <p className="font-extrabold text-base md:text-xl leading-[150%] md:leading-[120%] tracking-[-0.02em] uppercase text-brand mb-2 overflow-hidden text-ellipsis line-clamp-1">
          {recipe.title}
        </p>
        <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-borders md:text-brand-dark overflow-hidden text-ellipsis line-clamp-2">
          {cleanInstructions}
        </p>
      </div>
      {/* Buttons */}
      <div className="gap-1 flex-1 flex flex-row">
        <Link to={ROUTES.RECIPE.replace(':id', recipe.id)}>
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
