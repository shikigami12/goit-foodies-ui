/**
 * Define a list of allowed icon names
 * @typedef {"facebook" | "youtube" | "instagram" | "logo-footer" | "quote" | "burger" | "arrow-up-right" | "chevron-up" | "chevron-down" | "eye-off" | "eye" | "upload-photo" | "heart" | "minus" | "plus" | "trash" | "check" | "x"} IconName
 */

/**
 * ViewBox mapping for each icon based on their native dimensions in sprite.svg
 * This ensures icons scale correctly at any size
 */
const ICON_VIEWBOX = {
  facebook: '0 0 20 20',
  youtube: '0 0 20 20',
  instagram: '0 0 20 20',
  'logo-footer': '0 0 83 28',
  quote: '0 0 32 32',
  burger: '0 0 28 28',
  'arrow-up-right': '0 0 18 18',
  'chevron-up': '0 0 32 32',
  'chevron-down': '0 0 18 18',
  'eye-off': '0 0 20 20',
  eye: '0 0 20 20',
  'upload-photo': '0 0 32 32',
  heart: '0 0 18 18',
  minus: '0 0 32 32',
  plus: '0 0 32 32',
  trash: '0 0 32 32',
  check: '0 0 32 32',
  x: '0 0 28 28',
};

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
  const symbolId = `/sprite.svg#icon-${name}`;
  const isStrokeIcon =
    stroke !== undefined ||
    name === 'arrow-up-right' ||
    name === 'chevron-up' ||
    name === 'chevron-down' ||
    name === 'minus' ||
    name === 'plus';
  const strokeColor = stroke || color || 'currentColor';
  const fillColor = color || 'currentColor';

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={ICON_VIEWBOX[name]}
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
