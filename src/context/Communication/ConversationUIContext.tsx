import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

type ConversationUIContextType = {
    openManagement: boolean,
    setOpenManagement: Dispatch<SetStateAction<boolean>>
    searchOn: boolean,
    setSearchOn: Dispatch<SetStateAction<boolean>>
    rename: boolean,
    setRename: Dispatch<SetStateAction<boolean>>
}

const ConversationUIContext = createContext<ConversationUIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [openManagement, setOpenManagement] = useState(false);
    const [searchOn, setSearchOn] = useState(false);
    const [rename, setRename] = useState(false);

    return (
        <ConversationUIContext.Provider
          value={{
            rename,
            setRename,
            openManagement,
            setOpenManagement,
            searchOn,
            setSearchOn
          }}
        >
          {children}
        </ConversationUIContext.Provider>
      );
}

export function useConversationUIContext() {
    const uiContext = useContext(ConversationUIContext);
    
    if (uiContext === undefined) {
      throw new Error("useUIContext must be used with with ConversationUIContext!");
    }

    return uiContext;
}