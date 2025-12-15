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
    }) => {
    const length = value?.length ?? 0;

    const borderClass = error
        ? "border-red-500"
        : "border-gray-300 focus-within:border-dark";
    const textClass = error ? "text-red-700" : "text-black";
    const counterClass = error ? "text-red-600" : "text-gray-400";

    return (
        <div className="flex flex-col gap-1 mb-2 mx-2">
            <div className={`flex items-center gap-2 border-b ${borderClass} py-2`}>
                <input
                    id={id}
                    name={name}
                    type="text"
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    disabled={disabled}
                    className={`flex-1 bg-transparent outline-none text-sm ${textClass} placeholder:text-gray-400 disabled:text-gray-400`}
                    placeholder={placeholder}
                />

                <span className={`text-xs ${counterClass}`}>
                    {length}/{maxLength}
                </span>
            </div>

            {error && (
                <p className="text-xs text-red-600 mt-1">
                    {error}
                </p>
            )}
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
};
