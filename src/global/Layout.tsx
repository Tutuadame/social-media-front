import { Outlet } from "react-router-dom";
import { SideBar } from "./index";
import {ActivityMenuProvider} from "../context/Activity/ActivityContext.tsx";
import {SecurityMenuProvider} from "../context/Identity/SecurityMenuContext.tsx";
import {useAuth0} from "@auth0/auth0-react";
import { ThemeProvider, useTheme } from "../context/Theme/ThemeContext.tsx";
import { getLayoutStyles } from "./themeManager.ts";

const LayoutContent = () => {
  const { isAuthenticated } = useAuth0();
  const { theme } = useTheme();
  const isRegistration = window.location.href === "https://social.media:3000/registration";
  const layoutStyles = getLayoutStyles(theme);
  
  return (
    <div className={layoutStyles.basic}>
      { isAuthenticated && !isRegistration ? <SideBar/> : <></> }
      <main className={layoutStyles.main}><Outlet /></main>
    </div>
  );
};

export const Layout = () => {
  return (
    <ThemeProvider>
      <ActivityMenuProvider>
        <SecurityMenuProvider>
          <LayoutContent />
        </SecurityMenuProvider>
      </ActivityMenuProvider>
    </ThemeProvider>
  );
};