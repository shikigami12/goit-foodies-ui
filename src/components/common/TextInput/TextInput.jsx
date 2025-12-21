import { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export const TextInput = ({
    value,
    onChange,
    placeholder = "Enter a description of the dish",
    minLength,
    maxLength = 200,
    error = "",
    disabled = false,
    name,
    id,
    type = "text",
    onBlur,
    variant = "bordered", // "bordered" | "underline"
    showCounter = false,
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const isUnderline = variant === "underline";

    const textClass = error ? "text-red-700" : "text-[#1a1a1a]";

    if (isUnderline) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between w-full">
                    <input
                        id={id}
                        name={name}
                        type={inputType}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        minLength={minLength}
                        maxLength={maxLength}
                        disabled={disabled}
                        className={`flex-1 bg-transparent outline-none font-medium text-base leading-6 tracking-[-0.02em] ${textClass} placeholder:text-[#bfbebe] disabled:text-gray-400`}
                        placeholder={placeholder}
                    />
                    {showCounter && maxLength && (
                        <span className="font-medium text-base leading-6 tracking-[-0.02em] text-[#bfbebe] ml-4">
                            {value?.length || 0}/{maxLength}
                        </span>
                    )}
                </div>
                <div className={`h-[1px] w-full ${error ? "bg-red-500" : "bg-[#bfbebe]"}`} />
                {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
        );
    }

    const borderClass = error ? "border-red-500" : "border-[#bfbebe]";

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
                    minLength={minLength}
                    maxLength={maxLength}
                    disabled={disabled}
                    className={`flex-1 bg-transparent outline-none text-sm sm:text-base leading-[20px] sm:leading-[24px] tracking-[-0.02em] ${textClass} placeholder:text-[#bfbebe] disabled:text-gray-400 ${isPassword ? "pr-8 sm:pr-10" : ""}`}
                    placeholder={placeholder}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[14px] sm:right-[18px] flex items-center justify-center w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#050505] hover:opacity-70 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                    >
                        <Icon
                            name={showPassword ? "eye-off" : "eye"}
                            size={18}
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5"
                        />
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
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    onBlur: PropTypes.func,
    variant: PropTypes.oneOf(["bordered", "underline"]),
    showCounter: PropTypes.bool,
};
