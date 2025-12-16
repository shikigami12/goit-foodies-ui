import PropTypes from "prop-types";

export const AuthBar = ({ onSignInClick, onSignUpClick }) => {
    const handleSignIn = () => {
        if (onSignInClick) onSignInClick();
    };

    const handleSignUp = () => {
        if (onSignUpClick) onSignUpClick();
    };

    return (
        <div className="flex items-center rounded-full bg-white overflow-hidden">
            <button
                onClick={handleSignIn}
                className="px-5 py-3 text-black font-semibold uppercase"
            >
                Sign in
            </button>

            <button
                onClick={handleSignUp}
                className="px-5 py-3 bg-black border border-borders text-white font-semibold uppercase rounded-full"
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
