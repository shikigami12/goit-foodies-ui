import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "../../common/Button/Button";
import styles from "./LogOutModal.module.css";

export const LogOutModal = ({ onCancel, onLogOut }) => {
    const { isLoading } = useSelector((state) => state.auth);
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>
                        Are you logging out?
                    </h2>
                    <p className={styles.description}>
                        You can always log back in at any time.
                    </p>
                </div>

                <div className={styles.buttonsContainer}>
                    <Button
                        label="Log out"
                        type="button"
                        fullWidth
                        onClick={onLogOut}
                        isLoading={isLoading}
                        disabled={isLoading}
                    />

                    <Button
                        label="Cancel"
                        type="button"
                        variant="light"
                        fullWidth
                        onClick={onCancel}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};

LogOutModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
};
