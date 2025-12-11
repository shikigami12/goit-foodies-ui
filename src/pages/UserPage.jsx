import { Outlet } from "react-router-dom";
import LogOutButton from "../components/common/LogOutButton";
import { MainTitle } from "../components/common/MainTitle/MainTitle";
import { Subtitle } from "../components/common/Subtitle/Subtitle";
import UserInfo from "../components/common/UserInfo/";
import UserTabList from "../components/common/UserTabList";
import styles from "./UserPage.module.css";

export const UserPage = () => {
  const isCurrentUser = true; //TODO: need to take from storage

  return (
    <>
      {/** Temp div, TODO: Delete before deploy */}
      <div style={{ background: "white", border: "solid 1px lime" }}>
        <div className={styles["text-block"]}>
          <MainTitle>Profile</MainTitle>
          <Subtitle>
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Subtitle>
        </div>

        <div className={styles["left-column"]}>
          <UserInfo />
          {isCurrentUser && <LogOutButton />}
        </div>
        <UserTabList />
        <Outlet />
      </div>
      {/* TODO: Add PathInfo, MainTitle, Subtitle, UserInfo, TabsList, ListItems, ListPagination */}
    </>
  );
};
