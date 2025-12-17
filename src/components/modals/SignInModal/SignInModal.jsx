import { useEffect, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signin, clearError } from "../../../redux/slices/authSlice";
import { TextInput } from "../../common/TextInput/TextInput";
import { Button } from "../../common/Button/Button";
import { showError, showSuccess } from "../../../utils/notification";
import { validateSignIn, MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../../../utils/validation";
import styles from "./SignInModal.module.css";

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
    const errorShownRef = useRef(false);

    useEffect(() => {
        dispatch(clearError());
        previousErrorRef.current = null;
        errorShownRef.current = false;
        isMountedRef.current = true;
        
        return () => {
            isMountedRef.current = false;
        };
    }, [dispatch]);

    useEffect(() => {
        if (error && isMountedRef.current && !errorShownRef.current) {
            const errorMessage = typeof error === 'string' ? error : error?.message || String(error);
            showError(errorMessage);
            previousErrorRef.current = errorMessage;
            errorShownRef.current = true;
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
        previousErrorRef.current = null;
        errorShownRef.current = false;

        if (Object.keys(errors).length) {
            return;
        }

        try {
            await dispatch(signin({ email, password })).unwrap();
            showSuccess("Successfully signed in!");
            onClose?.();
        } catch {
            // Error handled via Redux state in useEffect
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Sign in
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputsContainer}>
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

                    <div className={styles.buttonsContainer}>
                        <Button
                            type="submit"
                            label="Sign in"
                            fullWidth
                            disabled={Object.keys(errors).length > 0}
                            isLoading={isLoading}
                        />

                        <div className={styles.switchTextContainer}>
                            <span className={styles.staticText}>
                                Don&apos;t have an account?
                            </span>
                            <button
                                type="button"
                                onClick={onSwitchToSignUp}
                                className={styles.linkText}
                            >
                                Create an account
                            </button>
                        </div>
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
