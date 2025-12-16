import PropTypes from "prop-types";

export const AuthBar = ({ onSignInClick, onSignUpClick }) => {
    return (
        <div className="flex items-center rounded-full bg-white overflow-hidden">
            <button
                type="button"
                onClick={onSignInClick}
                className="px-5 py-3 text-black font-semibold uppercase hover:opacity-80 transition-opacity"
            >
                Sign in
            </button>

            <button
                type="button"
                onClick={onSignUpClick}
                className="px-5 py-3 bg-black border border-borders text-white font-semibold uppercase rounded-full hover:bg-black/90 transition-colors"
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
