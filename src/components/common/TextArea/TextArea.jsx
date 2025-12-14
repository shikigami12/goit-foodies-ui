import PropTypes from "prop-types";
import { useRef } from "react";
import { useAutosizeTextArea } from "../../../hooks/useAutosizeTextArea";

export const TextArea = ({
     value,
     onChange,
     placeholder = "Enter a description of the dish",
     maxLength = 1000,
     error = "",
     disabled = false,
     name,
     id,
    }) => {
    const length = value?.length ?? 0;

    const borderClass = error
        ? "border-red-500"
        : "border-gray-300 focus-within:border-black";
    const textClass = error ? "text-red-700" : "text-black";
    const counterClass = error ? "text-red-600" : "text-gray-400";

    const ref = useRef(null);
    useAutosizeTextArea(ref, value);

    return (
        <div className="flex flex-col gap-1 mb-2">
            <div className={`border-b ${borderClass}`}>
                <div className="flex items-start gap-2 py-2">
                    <textarea
                        ref={ref}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        maxLength={maxLength}
                        disabled={disabled}
                        rows={1}
                        className={`
                        flex-1 bg-transparent outline-none resize-none overflow-hidden
                        text-sm ${textClass}
                        placeholder:text-gray-400 disabled:text-gray-400
                        p-0 leading-tight
                        `}
                        placeholder={placeholder}
                    />

                    <span className={`text-xs ${counterClass} whitespace-nowrap`}>
                        {length}/{maxLength}
                    </span>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};

TextArea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
};
