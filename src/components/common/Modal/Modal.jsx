import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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

            // Prevent background scroll without causing layout jump
            const scrollBarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            const originalOverflow = document.body.style.overflow;
            const originalPaddingRight = document.body.style.paddingRight;

            document.body.style.overflow = "hidden";
            if (scrollBarWidth > 0) {
                document.body.style.paddingRight = `${scrollBarWidth}px`;
            }

            return () => {
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = originalOverflow || "unset";
                document.body.style.paddingRight = originalPaddingRight || "";
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
            className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 transition-opacity duration-200 ease-out ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative bg-white rounded-3xl shadow-xl transform transition-transform duration-200 ease-out ${
                    isVisible ? "scale-100" : "scale-95"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 h-8 w-8 flex items-center justify-center text-black rounded-full hover:bg-gray-100 transition-colors z-[100]"
                    aria-label="Close modal"
                >
                    <svg 
                        className="h-6 w-6" 
                        aria-hidden="true" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <use href="/sprite.svg#icon-x" />
                    </svg>
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
