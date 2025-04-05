import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { ConnectionResponse } from "../../interface/profile/connection";
import { ProfileResponse } from "../../interface/profile/profile";

interface LayoutContextType {
    connections: ConnectionResponse[];
    setConnections: Dispatch<SetStateAction<ConnectionResponse[]>>,
    profile: ProfileResponse,
    setProfile: Dispatch<SetStateAction<ProfileResponse>>,
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {    
    const [connections, setConnections] = useState<ConnectionResponse[]>([]);
    const [profile, setProfile] = useState<ProfileResponse>({} as ProfileResponse);        

    return (
        <LayoutContext.Provider value={{ connections, setConnections, profile, setProfile}}>
          {children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    const layoutContext = useContext(LayoutContext);
    
    if (layoutContext === undefined) {
        throw new Error("useLayoutContext must be used with with LayoutContext!");
    }

    return layoutContext;
}