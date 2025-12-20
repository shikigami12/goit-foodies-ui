import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Icon from "../Icon";
import styles from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        // Wait for animation to complete before calling onClose
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        if (isOpen) {
            setShouldRender(true);
            document.addEventListener("keydown", handleEscape);
            
            // Trigger animation after render
            setTimeout(() => setIsVisible(true), 10);

            // Prevent background scroll - padding is already set globally
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = originalOverflow || "unset";
            };
        } else {
            setIsVisible(false);
            // Wait for animation to complete before unmounting
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, handleClose]);

    if (!shouldRender) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return createPortal(
        <div
            className={`${styles.backdrop} ${isVisible ? styles.backdropVisible : styles.backdropHidden}`}
            onClick={handleBackdropClick}
        >
            <div
                className={`${styles.content} ${isVisible ? styles.contentVisible : styles.contentHidden}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}

                <button
                    type="button"
                    onClick={handleClose}
                    className={styles.closeButton}
                    aria-label="Close modal"
                >
                    <Icon
                        name="x"
                        size={24}
                        color="currentColor"
                        className={styles.closeIcon}
                    />
                </button>
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
