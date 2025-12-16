import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "../../common/Button/Button";

export const LogOutModal = ({ onCancel, onLogOut }) => {
    const { isLoading } = useSelector((state) => state.auth);
    return (
        <section className="relative w-[343px] sm:w-[560px] max-w-full px-[30px] py-[60px] sm:px-10 sm:py-20 rounded-[20px] sm:rounded-[30px] bg-white flex justify-center">
            <div className="flex flex-col items-center gap-8 sm:gap-10 w-full max-w-[283px] sm:max-w-[400px]">
                <div className="flex flex-col items-center gap-4 sm:gap-5">
                    <h2 className="text-[28px] sm:text-[32px] leading-8 sm:leading-10 font-extrabold tracking-[-0.02em] uppercase text-center text-black">
                        Are you logging out?
                    </h2>
                    <p className="text-sm sm:text-base leading-5 sm:leading-6 font-medium tracking-[-0.02em] text-center text-borders sm:text-black">
                        You can always log back in at any time.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 w-full">
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
