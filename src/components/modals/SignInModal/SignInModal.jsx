import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signin, clearError } from "../../../redux/slices/authSlice";
import { TextInput } from "../../common/TextInput/TextInput";
import { Button } from "../../common/Button/Button";
import { showError, showSuccess } from "../../../utils/notification";

export const SignInModal = ({ onSwitchToSignUp, onClose }) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    useEffect(() => {
        // Clear any previous auth errors when modal opens
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        // Show notification for backend errors
        if (error) {
            showError(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const errors = useMemo(() => {
        const fieldErrors = {};

        if (!email.trim()) {
            fieldErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            fieldErrors.email = "Enter a valid email address";
        }

        if (!password) {
            fieldErrors.password = "Password is required";
        } else if (password.length < 6) {
            fieldErrors.password = "Password must be at least 6 characters";
        }

        return fieldErrors;
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        dispatch(clearError());

        if (Object.keys(errors).length) {
            return;
        }

        try {
            await dispatch(signin({ email, password })).unwrap();
            showSuccess("Successfully signed in!");
            onClose?.();
        } catch {
            // Error is handled via Redux state and shown as notification
        }
    };

    return (
        <section className="relative w-[560px] max-w-full px-10 py-20 rounded-[30px] bg-white flex justify-center">
            <div className="flex flex-col gap-10 w-full max-w-[400px]">
                <h2 className="text-[32px] leading-10 font-extrabold tracking-[-0.02em] uppercase text-center text-black">
                    Sign in
                </h2>

                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <TextInput
                            id="signin-email"
                            name="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouchedEmail(true)}
                            type="email"
                            maxLength={100}
                            error={
                                (touchedEmail || submitAttempted) ? errors.email || "" : ""
                            }
                        />

                        <TextInput
                            id="signin-password"
                            name="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouchedPassword(true)}
                            type="password"
                            maxLength={100}
                            error={
                                (touchedPassword || submitAttempted)
                                    ? errors.password || ""
                                    : ""
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center gap-5 mt-2">
                        <Button
                            type="submit"
                            label="Sign in"
                            fullWidth
                            disabled={Object.keys(errors).length > 0}
                            isLoading={isLoading}
                        />

                        <button
                            type="button"
                            onClick={onSwitchToSignUp}
                            className="text-sm font-medium text-borders hover:text-dark"
                        >
                            Don&apos;t have an account? Create an account
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

SignInModal.propTypes = {
    onSwitchToSignUp: PropTypes.func.isRequired,
    onClose: PropTypes.func,
};
