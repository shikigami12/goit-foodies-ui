export const SignInModal = ({ onSwitchToSignUp }) => {
  return (
    <div>
      <h2>Sign In</h2>
      {/* TODO: Add SignInForm */}
      <button type="button" onClick={onSwitchToSignUp}>
        Create an account
      </button>
    </div>
  );
};
