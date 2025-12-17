import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

export const Toast = ({ message, type = "error", onClose, duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto-close after duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300); // Wait for fade-out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeStyles = {
        error: "bg-red-500 text-white",
        success: "bg-green-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <div
            className={`px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ease-out ${
                typeStyles[type]
            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            role="alert"
        >
            <div className="flex items-center gap-3">
                <span className="font-medium text-sm">{message}</span>
                <button
                    type="button"
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => onClose?.(), 300);
                    }}
                    className="ml-2 hover:opacity-70 transition-opacity"
                    aria-label="Close notification"
                >
                    <Icon
                        name="x"
                        size={16}
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["error", "success", "info", "warning"]),
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
};

