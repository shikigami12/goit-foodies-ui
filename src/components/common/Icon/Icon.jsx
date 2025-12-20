import styles from './Icon.module.css';
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
 * @param {string} [props.color] - The fill or stroke color.
 * @param {number|string} [props.size=20] - Size in pixels.
 * @param {string} [props.className=""] - Additional classes.
 * @param {string} [props.stroke] - Stroke color (for stroke-based icons).
 * @returns {JSX.Element}
 */
export const Icon = ({ name, color, size = 20, className = '', stroke }) => {
  const symbolId = `/sprite2.svg#icon-${name}`;
  const isStrokeIcon =
    stroke !== undefined ||
    name === 'arrow-up-right' ||
    name === 'chevron-up' ||
    name === 'chevron-down';
  const strokeColor = stroke || color || 'currentColor';
  const fillColor = color || 'currentColor';

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      fill={isStrokeIcon ? 'none' : fillColor}
      stroke={isStrokeIcon ? strokeColor : undefined}
      strokeWidth={isStrokeIcon ? '1.8' : undefined}
      className={className}
      style={{
        stroke: isStrokeIcon ? strokeColor : undefined,
      }}
    >
      <use href={symbolId} />
    </svg>
  );
};
