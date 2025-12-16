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
    const borderClass = error
        ? "border-red-500"
        : "border-borders";
    const textClass = error ? "text-red-700" : "text-dark";

    return (
        <div className="flex flex-col gap-1 mb-1">
            <div
                className={`flex items-center justify-between w-full h-14 px-[18px] py-4 rounded-[30px] border ${borderClass}`}
            >
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    disabled={disabled}
                    className={`flex-1 bg-transparent outline-none text-[16px] leading-6 tracking-[-0.02em] ${textClass} placeholder:text-dark disabled:text-gray-400`}
                    placeholder={placeholder}
                />
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
