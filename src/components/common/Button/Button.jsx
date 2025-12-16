import PropTypes from "prop-types";

export const Button = ({
    label,
    iconId,
    variant = "dark",// "dark" | "light"
    fullWidth = false,
    onClick,
    disabled = false,
    type = "button",
    isLoading = false,
    }) => {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 rounded-full px-[14px] sm:px-8 py-[14px] sm:py-4 " +
        "text-sm sm:text-base font-bold sm:font-semibold uppercase tracking-[-0.02em] sm:tracking-[0.15em] " +
        "transition-colors duration-200 cursor-pointer h-12 sm:h-14";

    const isDark = variant === "dark";
    const isDisabled = disabled || isLoading;

    const variantClasses = isDark
        ? isDisabled
            ? "bg-borders text-white border border-transparent cursor-not-allowed"
            : "bg-black text-white border border-transparent hover:bg-black/90"
        : isDisabled
            ? "bg-white text-gray-400 border border-borders sm:border-gray-200 cursor-not-allowed"
            : "bg-white text-black border border-borders sm:border-gray-300 hover:bg-gray-50";

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseClasses} ${variantClasses} ${widthClass}`}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <>
                    {iconId && (
                        <svg className="w-5 h-5">
                            <use href={`/sprite.svg#${iconId}`} />
                        </svg>
                    )}
                    {label && <span>{label}</span>}
                </>
            )}
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
    isLoading: PropTypes.bool,
};
