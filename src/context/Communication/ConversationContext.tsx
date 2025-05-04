import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { ConversationMember } from "../../interface/communication/member";
import {Conversation} from "../../interface/communication/conversation.ts";


interface ConversationContextType {    
  members: ConversationMember[],
  setMembers: Dispatch<SetStateAction<ConversationMember[]>>,
  conversation: Conversation | undefined,
  setConversation: Dispatch<SetStateAction<Conversation | undefined>>,
}

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {    
    const [members, setMembers] = useState<ConversationMember[]>([]);
    const [conversation, setConversation] = useState<Conversation>();

    return (
      <ConversationContext.Provider
        value={{
          members,
          setMembers,
          conversation,
          setConversation
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