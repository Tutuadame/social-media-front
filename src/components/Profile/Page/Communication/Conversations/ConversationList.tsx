import { User } from "@auth0/auth0-react";
import { SimpleConversation } from "../../../../../interface/conversationAPI";
import { ConversationButton } from "./Conversation";
import { useEffect, useState } from "react";
import { getConversations } from "../../../../../api";
import { LoadMoreButton } from "../LoadMoreButton";

type ConversationsProps = {  
  handleSelectedConversation: (conversation : SimpleConversation) => void,
  user: User | undefined,
  conversations: SimpleConversation[],
  setConversations: (conversations: SimpleConversation[]) => void,
  deleteConversation: (conversationId: number) => void,
} 

export const Conversations: React.FC<ConversationsProps>= ({handleSelectedConversation, user, conversations, setConversations, deleteConversation}) => {
  
  const [conversationPage, setConversationPage] = useState(0);
  const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center");

  async function callConversations() {
    if (user) {
      const response: SimpleConversation[] = await getConversations(user, conversationPage);
      if (response) {
        setConversations(conversations.concat(response));
        if (response.length === 0) {
          setLoadMoreStyle((prev) => prev + " hidden")
        } else {
          setConversationPage(conversationPage + 1);
        }
      }
    }
  }

  useEffect(()=>{    
    if(!conversations[0]) callConversations();
  }, [])

  return (
    <>
      {(conversations || []).map((conversation) => {
        return <li key={conversation.id} onClick={()=>{handleSelectedConversation(conversation)}} className="flex relative flex-row px-2 border-r-2 border-l-2 border-transparent pb-1">
            <ConversationButton conversation={conversation} removeConversation={deleteConversation}/>
          </li>
      })}
      <LoadMoreButton
          callItems={callConversations}
          loadMoreStyle={loadMoreStyle}
         />
    </>
  );
}