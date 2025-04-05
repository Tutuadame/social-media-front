import { createContext, ReactNode, useContext, useState } from "react";


interface IdentityMenuContextType {
    identity: "Social" | "Security";
    switchIdentity: (identity: string) => void
}

export const IdentityMenuContext = createContext<IdentityMenuContextType | undefined>(undefined);

export const IdentityMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [identity, setIdentity] = useState<"Social" | "Security">("Social");

    const switchIdentity = (identity: string) => {
        if(identity === "Social" || identity === "Security") {
            setIdentity(identity);
        } else {
            throw new Error("There is no menu option for: "+identity);
        }
    }

    return (
        <IdentityMenuContext.Provider value={{ identity, switchIdentity }}>
          {children}
        </IdentityMenuContext.Provider>
      );
}

export function useIdentityMenuContext() {
    const identityContext = useContext(IdentityMenuContext);
    
    if (identityContext === undefined) {
        throw new Error("useIdentityMenuContext must be used with with IdentityMenuContext!");
    }

    return identityContext;
}