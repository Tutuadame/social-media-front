import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./index";
import { CSSProperties } from "react";
import { LayoutContextProvider } from "../context/Layout/LayoutOutContext";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={(appState) => {        
        console.log("APP STATE:", appState);
        if (appState?.flow === "signup") {
          navigate("/registration");
        } else {
          navigate("/");
        }        
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export const Layout = () => {
  const layoutStyle = "flex flex-row flex-nowrap flex-auto bg-slate-600";
  const mainStyle: CSSProperties = {
    width: "100vw",
  };

  return (
    <>
      <Auth0ProviderWithRedirect>
      <LayoutContextProvider>
          <div className={layoutStyle}>
            <SideBar />
            <main
              className="relative flex flex-grow justify-center"
              style={mainStyle}
            >
              <Outlet />
            </main>
          </div>
      </LayoutContextProvider>
      </Auth0ProviderWithRedirect>
    </>
  );
};


