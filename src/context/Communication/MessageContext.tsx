import { createContext, MutableRefObject, ReactNode, useContext, useRef, useState } from "react";
import { MessageResponse } from "../../interface";

type MessageContextType = {
  messagePage: MutableRefObject<number>,
  groupedMessages: MessageResponse[][] | undefined,
  setGroupedMessages: (messageGroups: MessageResponse[][]) => void | MessageResponse[][],
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const messagePage = useRef(0);
    const [groupedMessages, setGroupedMessages] = useState<MessageResponse[][]>();

    return (
      <MessageContext.Provider
        value={{
          messagePage,          
          groupedMessages,
          setGroupedMessages
        }}
      >
        {children}
      </MessageContext.Provider>
    );
}

export function useMessageContext() {
    const messageContext = useContext(MessageContext);
    
    if (messageContext === undefined) {
      throw new Error("useMessageContext must be used with with MessageContext!");
    }

    return messageContext;
}