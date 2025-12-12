import React from "react";

export const Icon = ({ name, color, size = 20, className = "" }) => {
  const symbolId = `/sprite.svg#icon-${name}`;

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      stroke="red"
      className={className}
      style={{ fill: color || "currentColor" }}
    >
      <use href={symbolId} />
    </svg>
  );
};
