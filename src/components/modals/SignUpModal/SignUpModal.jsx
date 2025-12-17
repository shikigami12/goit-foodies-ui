import { useEffect, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../../../redux/slices/authSlice";
import { TextInput } from "../../common/TextInput/TextInput";
import { Button } from "../../common/Button/Button";
import { showError, showSuccess } from "../../../utils/notification";
import { validateSignUp, MAX_NAME_LENGTH, MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "../../../utils/validation";
import styles from "./SignUpModal.module.css";

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
        () => validateSignUp({ name, email, password }),
        [name, email, password]
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
            await dispatch(signup({ name, email, password })).unwrap();
            showSuccess("Account created successfully!");
            onClose?.();
        } catch {
            // Error handled via Redux state in useEffect
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Sign up
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputsContainer}>
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

                    <div className={styles.buttonsContainer}>
                        <Button
                            type="submit"
                            label="Create"
                            fullWidth
                            disabled={Object.keys(errors).length > 0}
                            isLoading={isLoading}
                        />

                        <div className={styles.switchTextContainer}>
                            <span className={styles.staticText}>
                                I already have an account?
                            </span>
                            <button
                                type="button"
                                onClick={onSwitchToSignIn}
                                className={styles.linkText}
                            >
                                Sign in
                            </button>
                        </div>
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
