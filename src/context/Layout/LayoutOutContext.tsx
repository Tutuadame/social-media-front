import React, {createContext, MutableRefObject, ReactNode, useContext, useRef} from "react";
import { ConnectionResponse } from "../../interface/profile/connection";
import { ProfileResponse } from "../../interface/profile/profile";
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "react-query";
import {getProfile} from "../../api/profile/profileAPI.ts";
import {getAcceptedConnectionsByUser} from "../../api/profile/connectionAPI.ts";
import {Loader} from "../../components/General/Loader.tsx";

interface LayoutContextType {
    userConnections: MutableRefObject<ConnectionResponse[]>;
    userProfile: MutableRefObject<ProfileResponse>,
    userAccessToken: string,
    refetchProfile: () => Promise<any>,
    refetchConnections: () => Promise<any>
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, isLoading: isUserLoading, getAccessTokenSilently, isAuthenticated } = useAuth0();
    
    const connections = useRef<ConnectionResponse[]>([] as ConnectionResponse[]);
    const profile = useRef<ProfileResponse>({} as ProfileResponse);
    const accessToken = useRef<string>("");
    
    let currentId = user?.sub?.includes('|') ? user.sub.split('|')[1] : null;
    const isRegistration = window.location.href === "https://social.media:3000/registration";
    
    const { isSuccess: isTokenFetched } = useQuery({
        queryFn: async () => await getAccessTokenSilently(),
        queryKey: "getAuth0AccessToken",
        enabled: !isUserLoading,
        onSuccess: (token) => accessToken.current = token,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });
    
    const { isSuccess : isProfileFetched, refetch: refetchProfile } = useQuery({
        queryFn: async () => {
            const response = await getProfile(currentId || "", accessToken.current);
            if (response.status === "NOT_FOUND") window.location.href = "/registration";
            return response;
        },
        queryKey: "getProfile",
        enabled: isTokenFetched && !isRegistration,
        onSuccess: (response) => profile.current = response,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });
    
    const { isSuccess: AreConnectionsFetched, refetch: refetchConnections } = useQuery({
        queryFn: async () => {
            return await getAcceptedConnectionsByUser(profile.current.id, accessToken.current);
        },
        queryKey: "getConnections",
        enabled: isProfileFetched,
        onSuccess: (response) => connections.current = response,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });
    
    const userConnections = connections;
    const userProfile = profile;
    const userAccessToken = accessToken.current;
    
    const loadCheck =  (isTokenFetched && isProfileFetched && AreConnectionsFetched) || (isRegistration) || (!isTokenFetched && !isProfileFetched && !AreConnectionsFetched && !isAuthenticated)
    
    return <>
        { loadCheck ?
          <LayoutContext.Provider value={{ userConnections, userProfile, userAccessToken, refetchProfile, refetchConnections}}>
              {children}
          </LayoutContext.Provider>
            :
          <Loader />
        }
    </>
}

export function useLayoutContext() {
    const layoutContext = useContext(LayoutContext);
    if (layoutContext === undefined) {
        throw new Error("useLayoutContext must be used with with LayoutContext!");
    }
    return layoutContext;
}