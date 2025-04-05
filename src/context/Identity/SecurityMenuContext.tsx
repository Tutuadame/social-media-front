import { createContext, ReactNode, useContext, useState } from "react";

interface SecurityMenuContextType {
    option: "Email" | "Password" | "Overview";
    switchOption: (identity: string) => void
}

export const SecurityMenuContext = createContext<SecurityMenuContextType | undefined>(undefined);

export const SecurityMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [option, setOption] = useState<"Email" | "Password" | "Overview">("Overview");

    const switchOption = (option: string) => {
        if(option === "Email" || option === "Password" || option === "Overview") {
            setOption(option);
        } else {
            throw new Error("There is option for: "+option);
        }
    }

    return (
        <SecurityMenuContext.Provider value={{ option, switchOption }}>
          {children}
        </SecurityMenuContext.Provider>
      );
}

export function useSecurityMenuContext() {
    const securityMenuContext = useContext(SecurityMenuContext);
    
    if (securityMenuContext === undefined) {
        throw new Error("useSecurityMenuContext must be used with with SecurityMenuContext!");
    }

    return securityMenuContext;
}