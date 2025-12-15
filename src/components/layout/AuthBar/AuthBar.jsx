export const AuthBar = () => {
    const handleSignIn = () => {};
    const handleSignUp = () => {};

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
