import PropTypes from "prop-types";

export const Button = ({
    label,
    iconId,
    variant = "dark",// "dark" | "light"
    fullWidth = false,
    onClick,
    disabled = false,
    type = "button",
    }) => {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 " +
        "font-semibold uppercase tracking-[0.15em] transition-colors duration-200 " +
        "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variantClasses =
        variant === "dark"
            ? "bg-black text-white border border-transparent hover:bg-black/90"
            : "bg-white text-black border border-gray-300 hover:bg-gray-50";

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${widthClass}`}
        >
            {iconId && (
                <svg className="w-5 h-5">
                    <use href={`/sprite.svg#${iconId}`} />
                </svg>
            )}

            {label && <span>{label}</span>}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    iconId: PropTypes.string,
    variant: PropTypes.oneOf(["dark", "light"]),
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};
