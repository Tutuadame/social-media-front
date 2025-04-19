import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../../context/Communication/ConversationContext";
import { useMessageContext } from "../../context/Communication/MessageContext";
import { useConversationUIContext } from "../../context/Communication/ConversationUIContext.tsx";
import { MessageResponse } from "../../interface";
import { Conversation, SimpleConversation } from "../../interface/communication/conversation";
import { Conversations } from "./Conversations/ConversationList";
import { Header } from "./Messages/Header";
import { Messenger } from "./Messages/Messenger";
import { getSelectedConversation } from "../../api/communication/conversationAPI";
import { ConversationMember } from "../../interface/communication/member";
import { getMembers } from "../../api/communication/memberAPI";
import {useLayoutContext} from "../../context/Layout/LayoutOutContext.tsx";

type CommunicationComponentProps = {
  conversationId: string
}

export const CommunicationComponent: React.FC<CommunicationComponentProps> = ({ conversationId }) => {

  const { setMembers } = useConversationContext();    
  const { messagePage }  = useMessageContext();
  const { setOpenManagement, setRename }  = useConversationUIContext();
  const [groupedMessages, setGroupedMessages] = useState<MessageResponse[][]>([]);
  const [conversations, setConversations] = useState<SimpleConversation[]>([]);    
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<Conversation>();
  const { accessToken } = useLayoutContext();
  
  const openConversation = async (conversationId: string) => {
    const result = await getSelectedConversation(conversationId, accessToken.current).then(result => result);
    setConversation(result);
    if (result?.memberIds) {
      const conversationMembers: ConversationMember[] = await getMembers(result.memberIds, accessToken.current);
      setMembers(conversationMembers);      
    }
    navigate(`/communication/conversation/${conversationId}`);                       
  }

  const handleConversationUpdate = (
    updatedConversation: SimpleConversation
  ) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id
          ? updatedConversation
          : conversation
      )
    );
    openConversation(updatedConversation.id);
  };
  
  const handleSelectConversation = (conversationId: string) => {
    if(conversationId !== "start") {      
      openConversation(conversationId);
    } else {
      setConversation(undefined);
      setMembers([]);
      navigate(`/communication/conversation/start`); 
    }    
    messagePage.current = 0;
    setGroupedMessages([]);
    setOpenManagement(false);
    setRename(false);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(conversations.filter((c) => c.id !== conversationId));
    setConversation(undefined);
    openConversation("start");
  };

  useEffect(() => {
    if (conversationId !== "start" && !conversation) openConversation(conversationId);
  }, [])

  return <>
          <table className="relative flex flex-col w-full h-full overflow-hidden border-collapse bg-slate-600">        
            <tbody className="flex h-full my-auto w-full px-2 py-4 flex-row">
              <tr className="relative flex flex-row w-3/12 h-full border-r-2 border-slate-100 pr-0">
                <td className="relative w-10/12 mx-auto overflow-auto pt-4 pr-3 scrollbar-thin scrollbar-webkit">
                  <Conversations
                    handleSelectConversation={handleSelectConversation}
                    conversations={conversations}
                    setConversations={setConversations}                
                    deleteConversation={deleteConversation}
                  />           
                </td>
              </tr>
              <tr className="relative flex flex-row w-9/12 h-full">
                <td className="pl-5 w-full">                                    
                  <Header                    
                    handleSelectConversation={handleSelectConversation}
                    handleConversationUpdate={handleConversationUpdate}
                    conversation={conversation}
                    setConversation={setConversation}
                  />                  
                  <Messenger                
                    groupedMessages={groupedMessages}
                    setGroupedMessages={setGroupedMessages}
                    deleteConversation={deleteConversation}
                    conversationId={conversationId}
                  />
                </td>
              </tr>
            </tbody>
          </table>
  </>
}