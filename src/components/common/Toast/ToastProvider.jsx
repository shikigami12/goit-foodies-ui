import { useEffect, useState } from "react";
import { subscribeToNotifications } from "../../../utils/notification";
import { ToastContainer } from "./ToastContainer";

export const ToastProvider = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications((toast) => {
            setToasts((prev) => [...prev, toast]);
        });

        return unsubscribe;
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return <ToastContainer toasts={toasts} removeToast={removeToast} />;
};

