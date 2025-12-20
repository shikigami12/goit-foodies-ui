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

    const textClass = error ? "text-red-700" : "text-[#1a1a1a]";
    const counterClass = error ? "text-red-600" : "text-[#bfbebe]";

    const ref = useRef(null);
    useAutosizeTextArea(ref, value);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
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
                        font-medium text-base leading-6 tracking-[-0.02em] ${textClass}
                        placeholder:text-[#bfbebe] disabled:text-gray-400
                        p-0
                    `}
                    placeholder={placeholder}
                />

                <span className={`font-medium text-base leading-6 tracking-[-0.02em] ${counterClass} whitespace-nowrap`}>
                    {length}/{maxLength}
                </span>
            </div>
            <div className={`h-[1px] w-full ${error ? "bg-red-500" : "bg-[#bfbebe]"}`} />

            {error && (
                <p className="text-xs text-red-600">{error}</p>
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
