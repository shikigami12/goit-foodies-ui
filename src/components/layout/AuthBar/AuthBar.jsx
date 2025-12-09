export const AuthBar = () => {
  const handleSignIn = () => {
    // TODO: Open SignInModal
  };

  const handleSignUp = () => {
    // TODO: Open SignUpModal
  };

  return (
    <div>
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
    </div>
  );
};
