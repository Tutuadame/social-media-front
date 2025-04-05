import { createContext, ReactNode, useContext, useState } from "react";

type UIContextType = {
    openManagement: boolean,
    setOpenManagement: (state: boolean) => void
    searchOn: boolean,
    setSearchOn: (state: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [openManagement, setOpenManagement] = useState(false);
    const [searchOn, setSearchOn] = useState(false);

    return (
        <UIContext.Provider
          value={{
            openManagement,
            setOpenManagement,
            searchOn,
            setSearchOn
          }}
        >
          {children}
        </UIContext.Provider>
      );
}

export function useUIContext() {
    const uiContext = useContext(UIContext);
    
    if (uiContext === undefined) {
      throw new Error("useUIContext must be used with with UIContext!");
    }

    return uiContext;
}