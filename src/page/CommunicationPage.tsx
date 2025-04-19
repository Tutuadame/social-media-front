import { ConversationProvider } from "../context/Communication/ConversationContext";
import { MessageProvider } from "../context/Communication/MessageContext";
import { UIProvider } from "../context/Communication/ConversationUIContext.tsx";
import { CommunicationComponent } from "../components/Communication/CommunicationComponent";
import { useParams } from "react-router-dom";

export const CommunicationPage = () => {
  const { conversationId } = useParams<{conversationId: string}>();
  
  return (
      <ConversationProvider>
      <MessageProvider>
      <UIProvider>
        <CommunicationComponent conversationId={conversationId || "start"}/>
      </UIProvider>
      </MessageProvider>
      </ConversationProvider>
  );
};
