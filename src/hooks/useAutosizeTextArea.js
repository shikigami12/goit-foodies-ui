import { useEffect } from "react";

export const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
        const el = textAreaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }, [textAreaRef, value]);
};
