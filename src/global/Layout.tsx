import { Outlet } from "react-router-dom";
import { SideBar } from "./index";
import {ActivityMenuProvider} from "../context/Activity/ActivityContext.tsx";
import {SecurityMenuProvider} from "../context/Identity/SecurityMenuContext.tsx";
import {useAuth0} from "@auth0/auth0-react";
import { LAYOUT } from "./globalStyle.ts";

export const Layout = () => {
  const { isAuthenticated } = useAuth0();  
  const isRegistration = window.location.href === "https://social.media:3000/registration";
  
  return <>
    <ActivityMenuProvider>
      <SecurityMenuProvider>
        <div className={LAYOUT.basic}>
          { isAuthenticated && !isRegistration ? <SideBar/> : <></> }
          <main className={LAYOUT.main}><Outlet /></main>
        </div>
      </SecurityMenuProvider>
    </ActivityMenuProvider>
  </>
};