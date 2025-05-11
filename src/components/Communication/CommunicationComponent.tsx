import React, {useState} from "react";
import { useConversationContext } from "../../context/Communication/ConversationContext";
import { useMessageContext } from "../../context/Communication/MessengerContext.tsx";
import { useConversationUIContext } from "../../context/Communication/ConversationUIContext.tsx";
import {SimpleConversation} from "../../interface/communication/conversation";
import { Conversations } from "./Conversations/ConversationList";
import { Header } from "./Messages/Header";
import { Messenger } from "./Messages/Messenger";
import {useGetConversation} from "../../api/communication/conversationAPI";
import {useLayoutContext} from "../../context/Layout/LayoutOutContext.tsx";
import {useMutation, useQuery} from "react-query";
import {getMessages} from "../../api/communication/messageAPI.ts";
import {orderMessagesToGroupsByConsecutiveIds} from "../../utils/htmlUtils.tsx";

type CommunicationComponentProps = {
  conversationId: string
}

export const CommunicationComponent: React.FC<CommunicationComponentProps> = ({ conversationId }) => {
  
  const {userAccessToken} = useLayoutContext();
  const {setOpenManagement, setRename} = useConversationUIContext();
  const {conversation, setConversation} = useConversationContext();
  const { messagePage, setGroupedMessages, groupedMessages } = useMessageContext();
  const [conversationList, setConversationList] = useState<SimpleConversation[]>([]);
  
  const resetSelection = () => {
    messagePage.current = 0;
    setGroupedMessages([]);
    setOpenManagement(false);
    setRename(false);
  }
  
  const { isSuccess: isConversationSet } = useGetConversation(
    conversationId,
    userAccessToken,
    {
      enabled: !!userAccessToken && !!conversationId && conversationId !== "start",
      onSuccess: async (fetchedConversation) => {
        resetSelection();
        setConversation(fetchedConversation);
        await messageQuery.refetch();
      },
    });
  
  const messageQuery= useQuery({
    queryFn: async () => {
      return await getMessages(conversationId,  userAccessToken, messagePage.current);
    },
    onSuccess: (response) => {
      if (groupedMessages.length && response.length) {
        const updatedLastGroup = orderMessagesToGroupsByConsecutiveIds([...groupedMessages[groupedMessages.length - 1], ...response]);
        setGroupedMessages([...groupedMessages.slice(0, -1), ...updatedLastGroup]);
      } else if (response.length) {
        setGroupedMessages([...orderMessagesToGroupsByConsecutiveIds(response)]);
      }
    },
    queryKey: "callMessages" + conversationId,
    enabled: isConversationSet,
  });
  
  const {mutateAsync: handleConversationUpdate} = useMutation({
    mutationFn: async (updatedConversation: SimpleConversation) => {
      setConversationList((prev) =>
        prev.map((conversation) => conversation.id === updatedConversation.id ? updatedConversation : conversation)
      );
    },
    mutationKey: "handleConversationUpdate"
  });

  return <>
    <table className="relative flex flex-col w-full h-full overflow-hidden border-collapse bg-slate-600">
      <tbody className="flex h-full my-auto w-full px-2 py-4 flex-row">
      <tr className="relative flex flex-row w-3/12 h-full border-r-2 border-slate-100 pr-0">
        <td className="relative w-10/12 mx-auto overflow-auto pt-4 pr-3 scrollbar-thin scrollbar-webkit">
          <Conversations
            conversations={conversationList}
            setConversations={setConversationList}
          />
        </td>
      </tr>
      <tr className="relative flex flex-row w-9/12 h-full">
        <td className="pl-5 w-full h-[80vh]">
          <Header handleConversationUpdate={handleConversationUpdate} conversation={conversation} setConversation={setConversation} />
          <Messenger messageQuery={messageQuery} conversationId={conversationId}/>
        </td>
      </tr>
      </tbody>
    </table>
  </>
}