import { act, useEffect, useState } from "react";
import styles from "./UserTabList.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import { TABS } from "../../../constants";

export default function UserTabList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCurrentUser = id === "current"; //TODO: need to take from storage

  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    if (!id) navigate("current");
  }, [id]);

  const handleTabClick = (tab) => {
    navigate(tab);
    setActiveTab(tab);
  };

  return (
    <ul className={styles["list"]}>
      {TABS.map((tab) => (
        <li key={tab}>
          <a
            onClick={() => handleTabClick(tab)}
            className={
              styles["link"] + " " + (tab == activeTab && styles["active"])
            }
          >
            {capitalizeFirstLetter(tab.replace("_", " "))}
          </a>
        </li>
      ))}
    </ul>
  );
}
