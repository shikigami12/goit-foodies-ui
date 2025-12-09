export const LogOutModal = ({ onCancel, onLogOut }) => {
  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
};
