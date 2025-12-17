import { useState } from "react";
import PropTypes from "prop-types";

export const RoundedInput = ({
     type = "text",
     value,
     onChange,
     placeholder = "",
     maxLength,
     error = "",
     disabled = false,
     name,
     id,
    }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const hasValue = value !== undefined && value !== null && value !== "";
    const inputType = isPassword && showPassword ? "text" : type;

    const borderClass = error
        ? "border-red-500"
        : `${hasValue ? "border-dark" : "border-gray-300"} focus-within:border-dark`;
    const textClass = error ? "text-red-700" : "text-black";

    return (
        <div className="flex flex-col gap-1 mb-2 mx-2">
            <div className={`
                flex items-center justify-between w-full
                rounded-full bg-white px-6 py-3 border
                ${borderClass}
                ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            `}
            >
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        flex-1 bg-transparent outline-none text-sm
                        ${textClass}
                        placeholder:text-gray-400
                        disabled:text-gray-400
                    `}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={disabled}
                        className="ml-2 flex items-center justify-center cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <svg className="w-5 h-5 inline-block">
                            <use href={`/sprite.svg#${showPassword ? "icon-eye-off" : "icon-eye"}`} />
                        </svg>
                    </button>

                )}
            </div>

            {error && (
                <p className="text-xs text-red-600 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

RoundedInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
};
