import { Outlet } from "react-router-dom";
import { SideBar } from "./index";
import {CSSProperties, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {ActivityMenuProvider} from "../context/Activity/ActivityContext.tsx";
import {SecurityMenuProvider} from "../context/Identity/SecurityMenuContext.tsx";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {getProfile} from "../api/profile/profileAPI.ts";
import {getAcceptedConnectionsByUser} from "../api/profile/connectionAPI.ts";

export const Layout = () => {
  const layoutStyle = "flex flex-row flex-nowrap flex-auto bg-slate-600";
  const mainStyle: CSSProperties = {
    width: "100vw",
  };
  const { user, isLoading} = useAuth0();
  const { profile, setProfile, setConnections } = useLayoutContext();
  
  const callUserProfile = async (id: string) => {
    const response = await getProfile(id).then(response => response);
    setProfile(response);
  }
  
  const callConnections = async (profileId: string) => {
     const tempConnections = await getAcceptedConnectionsByUser(profileId).then(result => result);
     setConnections(tempConnections)
  }
  
  useEffect(() => {
    if (!isLoading && user && !profile.id) {
      // @ts-ignore we check for user above
      const currentId = user?.sub.split('|')[1];
      callUserProfile(currentId);
      callConnections(currentId);
    }
  }, [isLoading]);

  
  return (
    <>
      <ActivityMenuProvider>
      <SecurityMenuProvider>
          <div className={layoutStyle}>
            <SideBar />
            <main
              className="relative flex flex-grow justify-center"
              style={mainStyle}
            >
              <Outlet />
            </main>
          </div>
      </SecurityMenuProvider>
      </ActivityMenuProvider>
    </>
  );
};


