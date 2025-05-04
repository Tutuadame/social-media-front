import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";
import {QueryClient, QueryClientProvider} from "react-query";
import {LayoutContextProvider} from "./context/Layout/LayoutOutContext.tsx";

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
    >
      {children}
    </Auth0Provider>
  );
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Auth0ProviderWithRedirect>
    <LayoutContextProvider>
      <App />
    </LayoutContextProvider>
    </Auth0ProviderWithRedirect>
    </QueryClientProvider>
  </StrictMode>
);
