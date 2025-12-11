import { useLocation } from "react-router-dom";
import styles from "./FollowersList.module.css";
import { TABS } from "../../../constants";

export default function FollowersList() {
  const location = useLocation();
  const currentPath = location.pathname;

  const emptyMessageFollowers =
    "There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.";
  const emptyMessageFollowing =
    "Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.";
  return (
    <div>
      FollowersList: {currentPath}
      <p>
        {currentPath.endsWith(TABS[2])
          ? emptyMessageFollowers
          : emptyMessageFollowing}
      </p>
    </div>
  );
}
