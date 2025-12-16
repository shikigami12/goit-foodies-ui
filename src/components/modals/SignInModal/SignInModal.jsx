import { useEffect, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signin, clearError } from "../../../redux/slices/authSlice";
import { TextInput } from "../../common/TextInput/TextInput";
import { Button } from "../../common/Button/Button";
import { showError, showSuccess } from "../../../utils/notification";
import { validateSignIn, MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../../../utils/validation";

export const SignInModal = ({ onSwitchToSignUp, onClose }) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    
    const previousErrorRef = useRef(null);
    const isMountedRef = useRef(false);

    useEffect(() => {
        // Clear any previous auth errors when modal opens
        dispatch(clearError());
        previousErrorRef.current = null;
        isMountedRef.current = true;
        
        return () => {
            isMountedRef.current = false;
        };
    }, [dispatch]);

    useEffect(() => {
        // Only show notification for NEW errors that occur after modal is mounted
        if (error && isMountedRef.current && error !== previousErrorRef.current) {
            showError(error);
            previousErrorRef.current = error;
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const errors = useMemo(
        () => validateSignIn({ email, password }),
        [email, password]
    );

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
        <section className="relative w-[343px] sm:w-[560px] max-w-full px-[30px] py-[60px] sm:px-10 sm:py-20 rounded-[20px] sm:rounded-[30px] bg-white flex justify-center">
            <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-[283px] sm:max-w-[400px]">
                <h2 className="text-[28px] sm:text-[32px] leading-8 sm:leading-10 font-extrabold tracking-[-0.02em] uppercase text-center text-black">
                    Sign in
                </h2>

                <form className="flex flex-col gap-8 sm:gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[14px]">
                        <TextInput
                            id="signin-email"
                            name="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouchedEmail(true)}
                            type="email"
                            maxLength={MAX_EMAIL_LENGTH}
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
                            error={
                                (touchedPassword || submitAttempted)
                                    ? errors.password || ""
                                    : ""
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4 sm:gap-5 mt-2">
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
                            className="text-xs sm:text-sm font-medium text-borders hover:text-dark"
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
