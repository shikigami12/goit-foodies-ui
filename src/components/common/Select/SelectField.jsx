import {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";

export const SelectField = ({
    value,
    onChange,
    options,
    placeholder = "Select a category",
    error = "",
    disabled = false,
    name,
    id,
    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selected = options.find((opt) => opt.value === value);
    const hasValue = value !== undefined && value !== null && value !== "";

    const borderClass = error
        ? "border-red-500"
        : `${hasValue ? "border-[#050505]" : "border-[#bfbebe]"}`;

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!wrapperRef.current?.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleSelect = (optionValue) => {
        onChange?.({target: {value: optionValue, name, id}});
        setIsOpen(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange?.({target: {value: "", name, id}});
    };

    return (
        <div className="flex flex-col gap-1 relative" ref={wrapperRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen((p) => !p)}
                className={`
                    flex items-center justify-between w-full
                    rounded-[30px] bg-white px-[18px] py-4 border
                    ${borderClass}
                    ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                `}
            >
                <span
                    className={`
                        font-medium text-base leading-6 tracking-[-0.02em]
                        ${!selected ? "text-[#bfbebe]" : "text-[#1a1a1a]"}
                    `}
                >
                  {selected ? selected.label : placeholder}
                </span>

                <div className="flex items-center gap-2">
                    {hasValue && !disabled && (
                        <div
                            onClick={handleClear}
                            className="text-[#bfbebe] hover:text-[#050505] transition-colors cursor-pointer"
                            role="button"
                            aria-label="Clear selection"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                    <svg
                        className={`w-[18px] h-[18px] transition-transform ${isOpen ? "rotate-180" : ""} ${error ? "text-red-600" : "text-[#050505]"}`}>
                        <use href="/sprite.svg#icon-chevron-down"/>
                    </svg>
                </div>
            </button>

            {isOpen && !disabled && (
                <div
                    className="
                        absolute left-0 right-0 top-full mt-2
                        rounded-[20px] border border-[#bfbebe] bg-white shadow-lg
                        overflow-y-auto max-h-72 z-20
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelect(opt.value)}
                            className={`
                                w-full text-left px-[18px] py-3 font-medium text-base leading-6 tracking-[-0.02em]
                                hover:bg-[#f5f5f5] transition-colors
                                ${value === opt.value ? "text-[#050505] font-bold" : "text-[#1a1a1a]"}
                            `}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}

            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
};

SelectField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
};
