import { Outlet } from "react-router-dom";
import { SideBar } from "./index";
import {CSSProperties} from "react";
import {ActivityMenuProvider} from "../context/Activity/ActivityContext.tsx";
import {SecurityMenuProvider} from "../context/Identity/SecurityMenuContext.tsx";
import {useAuth0} from "@auth0/auth0-react";

export const Layout = () => {
  const { isAuthenticated } = useAuth0();
  const layoutStyle = "flex flex-row flex-nowrap flex-auto bg-slate-600";
  const mainStyle: CSSProperties = {width: "100vw", height: "100vh"};
  const isRegistration = window.location.href === "https://social.media:3000/registration";
  
  return <>
    <ActivityMenuProvider>
      <SecurityMenuProvider>
        <div className={layoutStyle}>
          { isAuthenticated && !isRegistration ? <SideBar/> : <></> }
          <main className="relative flex flex-grow justify-center" style={mainStyle}><Outlet /></main>
        </div>
      </SecurityMenuProvider>
    </ActivityMenuProvider>
  </>
};