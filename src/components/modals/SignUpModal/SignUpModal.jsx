import { useEffect, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../../../redux/slices/authSlice";
import { TextInput } from "../../common/TextInput/TextInput";
import { Button } from "../../common/Button/Button";
import { showError, showSuccess } from "../../../utils/notification";
import { validateSignUp, MAX_NAME_LENGTH, MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "../../../utils/validation";

export const SignUpModal = ({ onSwitchToSignIn, onClose }) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touchedName, setTouchedName] = useState(false);
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
        () => validateSignUp({ name, email, password }),
        [name, email, password]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        dispatch(clearError());

        if (Object.keys(errors).length) {
            return;
        }

        try {
            await dispatch(signup({ name, email, password })).unwrap();
            showSuccess("Account created successfully!");
            onClose?.();
        } catch {
            // Error is handled via Redux state and shown as notification
        }
    };

    return (
        <section className="relative w-[343px] sm:w-[561px] max-w-full px-[30px] py-[60px] sm:px-10 sm:py-20 rounded-[20px] sm:rounded-[30px] bg-white flex justify-center">
            <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-[283px] sm:max-w-[401px]">
                <h2 className="text-[28px] sm:text-[32px] leading-8 sm:leading-10 font-extrabold tracking-[-0.02em] uppercase text-center text-black">
                    Sign up
                </h2>

                <form className="flex flex-col gap-8 sm:gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[14px]">
                        <TextInput
                            id="signup-name"
                            name="name"
                            placeholder="Name*"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouchedName(true)}
                            error={
                                (touchedName || submitAttempted) ? errors.name || "" : ""
                            }
                        />

                        <TextInput
                            id="signup-email"
                            name="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            maxLength={MAX_EMAIL_LENGTH}
                            onBlur={() => setTouchedEmail(true)}
                            error={
                                (touchedEmail || submitAttempted) ? errors.email || "" : ""
                            }
                        />

                        <TextInput
                            id="signup-password"
                            name="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            onBlur={() => setTouchedPassword(true)}
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
                            label="Create"
                            fullWidth
                            disabled={Object.keys(errors).length > 0}
                            isLoading={isLoading}
                        />

                        <button
                            type="button"
                            onClick={onSwitchToSignIn}
                            className="text-xs sm:text-sm font-medium text-borders hover:text-dark"
                        >
                            I already have an account? Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

SignUpModal.propTypes = {
    onSwitchToSignIn: PropTypes.func.isRequired,
    onClose: PropTypes.func,
};
