import { useState } from "react";
import PropTypes from "prop-types";

export const TextInput = ({
    value,
    onChange,
    placeholder = "Enter a description of the dish",
    maxLength = 200,
    error = "",
    disabled = false,
    name,
    id,
    type = "text",
    onBlur,
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const borderClass = error
        ? "border-red-500"
        : "border-borders";
    const textClass = error ? "text-red-700" : "text-dark";

    return (
        <div className="flex flex-col gap-1 mb-1">
            <div
                className={`flex items-center justify-between w-full h-12 sm:h-14 px-[14px] sm:px-[18px] py-[14px] sm:py-4 rounded-[30px] border ${borderClass} relative`}
            >
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    disabled={disabled}
                    className={`flex-1 bg-transparent outline-none text-sm sm:text-base leading-5 sm:leading-6 tracking-[-0.02em] ${textClass} placeholder:text-borders sm:placeholder:text-dark disabled:text-gray-400 ${isPassword ? "pr-8 sm:pr-10" : ""}`}
                    placeholder={placeholder}
                />
                
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[14px] sm:right-[18px] flex items-center justify-center w-[18px] h-[18px] sm:w-5 sm:h-5 text-dark hover:opacity-70 transition-opacity"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                    >
                        <svg
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {showPassword ? (
                                <use href="/sprite.svg#icon-eye-off" />
                            ) : (
                                <use href="/sprite.svg#icon-eye" />
                            )}
                        </svg>
                    </button>
                )}
            </div>

            <p
                className={`text-xs mt-[2px] ${
                    error ? "text-red-600" : "text-transparent"
                }`}
            >
                {error || "placeholder"}
            </p>
        </div>
    );
};

TextInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    onBlur: PropTypes.func,
};
