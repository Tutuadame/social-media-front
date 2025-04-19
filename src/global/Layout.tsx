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
  const { getAccessTokenSilently } = useAuth0();
  const { accessToken } = useLayoutContext();
  
  
  const layoutStyle = "flex flex-row flex-nowrap flex-auto bg-slate-600";
  const mainStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
  };
  const { user } = useAuth0();
  const { profile, setProfile, setConnections } = useLayoutContext();
  let currentId = user?.sub?.includes('|') ? user.sub.split('|')[1] : null;
  
  const callUserProfile = async (id: string) => {
    const response = await getProfile(id, accessToken.current).then(response => response);
    setProfile(response);
  }
  
  const callConnections = async (profileId: string) => {
     const tempConnections = await getAcceptedConnectionsByUser(profileId, accessToken.current).then(result => result);
     setConnections(tempConnections)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      accessToken.current = await getAccessTokenSilently();
      if (currentId && !profile.id && accessToken.current) {
        await callUserProfile(currentId);
        await callConnections(currentId);
      }
    };
    
    fetchData();
  }, [user, profile.id]);


  
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


