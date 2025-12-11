import styles from "./LogOutButton.module.css";

export default function LogOutButton() {
  const onClick = () => {
    console.log("LOG OUT CLICKED");
  };
  return (
    <button type="button" className={styles["button"]} onClick={onClick}>
      Log out
    </button>
  );
}
