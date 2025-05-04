import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from "react";
import { MessageResponse } from "../../interface";

type MessageContextType = {
  messagePage: MutableRefObject<number>,
  groupedMessages: MessageResponse[][],
  setGroupedMessages: Dispatch<SetStateAction<MessageResponse[][]>>,
}

const MessengerContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const messagePage = useRef(0);
    const [groupedMessages, setGroupedMessages] = useState<MessageResponse[][]>([]);

    return (
      <MessengerContext.Provider
        value={{
          messagePage,
          groupedMessages,
          setGroupedMessages
        }}
      >
        {children}
      </MessengerContext.Provider>
    );
}

export function useMessageContext() {
    const messageContext = useContext(MessengerContext);
    
    if (messageContext === undefined) {
      throw new Error("useMessageContext must be used with with MessengerContext!");
    }

    return messageContext;
}