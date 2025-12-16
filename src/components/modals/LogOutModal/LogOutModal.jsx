import PropTypes from "prop-types";
import { Button } from "../../common/Button/Button";

export const LogOutModal = ({ onCancel, onLogOut }) => {
    return (
        <section className="relative w-[560px] max-w-full px-10 py-20 rounded-[30px] bg-white flex justify-center">
            <div className="flex flex-col items-center gap-10 w-full max-w-[400px]">
                <div className="flex flex-col items-center gap-5">
                    <h2 className="text-[32px] leading-10 font-extrabold tracking-[-0.02em] uppercase text-center text-black">
                        Are you logging out?
                    </h2>
                    <p className="text-base leading-6 font-medium tracking-[-0.02em] text-center text-black">
                        You can always log back in at any time.
                    </p>
                </div>

                <div className="flex flex-col gap-5 w-full">
                    <Button
                        label="Log out"
                        type="button"
                        fullWidth
                        onClick={onLogOut}
                    />

                    <Button
                        label="Cancel"
                        type="button"
                        variant="light"
                        fullWidth
                        onClick={onCancel}
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
