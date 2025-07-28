import { Outlet } from "react-router-dom";
import { SideBar } from "./index";
import {CSSProperties} from "react";
import {ActivityMenuProvider} from "../context/Activity/ActivityContext.tsx";
import {SecurityMenuProvider} from "../context/Identity/SecurityMenuContext.tsx";
import {useAuth0} from "@auth0/auth0-react";
import styles from "./Global.module.css";

export const Layout = () => {
  const { isAuthenticated } = useAuth0();
  const mainStyle: CSSProperties = { width: "100vw", height: "100vh" };
  const isRegistration = window.location.href === "https://social.media:3000/registration";
  
  return <>
    <ActivityMenuProvider>
      <SecurityMenuProvider>
        <div className={styles['layout']}>
          { isAuthenticated && !isRegistration ? <SideBar/> : <></> }
          <main className={styles['main']} style={mainStyle}><Outlet /></main>
        </div>
      </SecurityMenuProvider>
    </ActivityMenuProvider>
  </>
};