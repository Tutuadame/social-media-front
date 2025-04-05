import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { ConversationMember } from "../../interface/communication/member";


interface ConversationContextType {    
  members: ConversationMember[] | undefined,
  setMembers: Dispatch<SetStateAction<ConversationMember[]>>,
}

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {    
    const [members, setMembers] = useState<ConversationMember[]>([]);

    return (
      <ConversationContext.Provider
        value={{
          members,
          setMembers
        }}
      >
        {children}
      </ConversationContext.Provider>
    );
}

export function useConversationContext() {
    const conversationContext = useContext(ConversationContext);
    
    if (conversationContext === undefined) {
      throw new Error("useConversationContext must be used with with ConversationContext!");
    }

    return conversationContext;
}