import PropTypes from "prop-types";

export const AuthBar = ({ onSignInClick, onSignUpClick }) => {
    return (
        <div className="flex items-center rounded-[30px] bg-white overflow-hidden">
            <button
                type="button"
                onClick={onSignInClick}
                className="px-[30px] py-3.5 text-main font-bold text-xs leading-[18px] tracking-[-0.02em] uppercase hover:opacity-80 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
                Sign in
            </button>

            <button
                type="button"
                onClick={onSignUpClick}
                className="px-7 py-3.5 bg-[#1a1a1a] border border-borders text-white font-bold text-xs leading-[18px] tracking-[-0.02em] uppercase rounded-[30px] hover:bg-[#1a1a1a]/90 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
                Sign up
            </button>
        </div>
    );
};

AuthBar.propTypes = {
    onSignInClick: PropTypes.func,
    onSignUpClick: PropTypes.func,
};
