/**
 * Define a list of allowed icon names
 * @typedef {"facebook" | "youtube" | "instagram" | "logo-footer" | "quote" | "burger" | "arrow-up-right" | "chevron-up" | "chevron-down" | "eye-off" | "eye" | "upload-photo" | "heart" | "minus" | "plus" | "trash" | "check" | "x"} IconName
 */

/**
 * Renders an SVG icon using an external sprite sheet.
 *
 * @component
 * @param {Object} props
 * @param {IconName} props.name - The unique name of the icon.
 * @param {string} [props.color] - The fill color.
 * @param {number|string} [props.size=20] - Size in pixels.
 * @param {string} [props.className=""] - Additional classes.
 * @returns {JSX.Element}
 */
export const Icon = ({ name, color, size = 20, className = '' }) => {
  const symbolId = `/sprite.svg#icon-${name}`;

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      className={className}
      style={{ fill: color || 'currentColor' }}
    >
      <use href={symbolId} />
    </svg>
  );
};
