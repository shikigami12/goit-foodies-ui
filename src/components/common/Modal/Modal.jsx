import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export const Modal = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            setIsVisible(true);

            // Prevent background scroll - padding is already set globally
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = originalOverflow || "unset";
                setIsVisible(false);
            };
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            setIsVisible(false);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 sm:px-4 transition-opacity duration-200 ease-out ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative bg-white rounded-[20px] sm:rounded-3xl shadow-xl transform transition-transform duration-200 ease-out ${
                    isVisible ? "scale-100" : "scale-95"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                
                <button
                    type="button"
                    onClick={onClose}
                    className="group absolute right-4 top-4 sm:right-5 sm:top-5 h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full transition-colors z-[100]"
                    aria-label="Close modal"
                >
                    <Icon
                        name="x"
                        size={24}
                        color="currentColor"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-black group-hover:text-gray-500 transition-colors"
                    />
                </button>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
