export const SignUpModal = ({ onSwitchToSignIn }) => {
  return (
    <div>
      <h2>Sign Up</h2>
      {/* TODO: Add SignUpForm */}
      <button type="button" onClick={onSwitchToSignIn}>
        Sign in
      </button>
    </div>
  );
};
