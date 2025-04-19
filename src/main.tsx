import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LayoutContextProvider } from './context/Layout/LayoutOutContext.tsx';
import {Auth0Provider} from "@auth0/auth0-react";

const Auth0ProviderWithRedirect = ({ children }: { children: React.ReactNode }) => {
 
  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  const redirectUri = window.location.origin;
  const audience = "https://tutuadame.eu.auth0.com/api/v2/";
  const scope ='openid profile email'
  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: scope
      }}
      onRedirectCallback={(appState) => {
        console.log("APP STATE:", appState);
        if (appState?.flow === "signup") {
          window.location.href = "/registration";
        } else {
          window.location.href = "/";
        }
        
      }}
    >
      {children}
    </Auth0Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0ProviderWithRedirect>
    <LayoutContextProvider>
      <App />
    </LayoutContextProvider>
    </Auth0ProviderWithRedirect>
  </StrictMode>
);
