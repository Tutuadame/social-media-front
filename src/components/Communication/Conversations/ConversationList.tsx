import { useAuth0 } from "@auth0/auth0-react";
import { SimpleConversation } from "../../../interface/communication/conversation";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getConversations } from "../../../api";
import { LoadMoreButton } from "../../Button/General/LoadMoreButton";
import { searchForConversations } from "../../../api/communication/conversationAPI";
import { ConversationComponent } from "./Conversation";
import { SearchBar } from "../../SearchBar";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";

type ConversationsProps = {    
  conversations: SimpleConversation[],
  setConversations: Dispatch<SetStateAction<SimpleConversation[]>>,
  deleteConversation: (conversationId: string) => void,
  handleSelectConversation: (conversationId: string) => void,
} 

export const Conversations: React.FC<ConversationsProps>= ({conversations, setConversations, deleteConversation, handleSelectConversation}) => {
  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";  
  const conversationPage = useRef(0);
  const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center");
  const [foundConversations, setFoundConversations] = useState<SimpleConversation[]>([]);
  const [searchExpression, setSearchExpression] = useState<string>("");
  const { accessToken } = useLayoutContext();

  const onConversationSearch = async (name: string) => {
    conversationPage.current = 0;
    setSearchExpression(name);
    const result = await searchForConversations(name, currentId, conversationPage.current, 10, accessToken.current).then(result => result.content);
    setFoundConversations(result);
    if (result.length === 0) {
      setLoadMoreStyle((prev) => prev + " hidden");
    } else {
      conversationPage.current += 1;
    }
  }

  async function callMoreSearchedConversation() {
    const result = await searchForConversations(searchExpression, currentId, conversationPage.current, 10,  accessToken.current).then(result => result.content);
    setFoundConversations(prev => [...prev, ...result]);
    if (result.length === 0) {
      setLoadMoreStyle((prev) => prev + " hidden");
    } else {
      conversationPage.current += 1;
    }
  }

  async function callConversations() {
    if (user) {
      const response: SimpleConversation[] = await getConversations(user, conversationPage.current,  10, accessToken.current).then(result => result.content);
      console.log(response);
      if (response) {        
        if (response.length === 0) {
          setLoadMoreStyle((prev) => prev + " hidden");
        } else {
          conversationPage.current += 1;
          setConversations(prev => [...prev, ...response]);
        }
      }
    }
  }

  useEffect(() => {        
    if(!conversations[0]) {
      callConversations();      
    }
    
    if(searchExpression === "") {
      setLoadMoreStyle("flex justify-center");
      conversationPage.current += 1;
    } else {
      setFoundConversations( conversations.filter(c => c.name.includes(searchExpression)))
    }
  }, [searchExpression])

  return (
    <ul className="flex flex-col">
      <li className="mb-10">
        <SearchBar onSearch={onConversationSearch} searchExpression={searchExpression} setSearchExpression={setSearchExpression} />
      </li>
      {searchExpression === "" ? (
        <>
          {conversations.map((conversation) => {
            return (
              <ConversationComponent
                handleSelectConversation={handleSelectConversation}
                conversation={conversation}                
                removeConversation={deleteConversation}
              />
            );
          })}
        <LoadMoreButton
          callItems={callConversations}
          loadMoreStyle={loadMoreStyle}
          />
        </>
      ) : (
        <>
          {foundConversations.map((conversation) => {
            return (
              <ConversationComponent
                handleSelectConversation={handleSelectConversation}
                conversation={conversation}
                removeConversation={deleteConversation}
              />
            );
          })}
          <LoadMoreButton
            callItems={callMoreSearchedConversation}
            loadMoreStyle={loadMoreStyle}
          />
        </>
      )}
    </ul>
  );
}