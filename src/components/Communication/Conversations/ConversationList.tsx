import { useAuth0 } from "@auth0/auth0-react";
import {SimpleConversation} from "../../../interface/communication/conversation";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getConversations } from "../../../api";
import { LoadMoreButton } from "../../Button/General/LoadMoreButton";
import {deleteConversation, searchForConversations} from "../../../api/communication/conversationAPI";
import { ConversationComponent } from "./Conversation";
import { SearchBar } from "../../SearchBar";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import {handleArrayMutation} from "../../../utils/htmlUtils.tsx";
import {useMutation, useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {useConversationContext} from "../../../context/Communication/ConversationContext.tsx";

type ConversationsProps = {    
  conversations: SimpleConversation[],
  setConversations: Dispatch<SetStateAction<SimpleConversation[]>>,
}

export const Conversations: React.FC<ConversationsProps>= ({conversations, setConversations}) => {
  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";  
  const conversationPage = useRef(0);
  const [foundConversations, setFoundConversations] = useState<SimpleConversation[]>([]);
  const [searchExpression, setSearchExpression] = useState<string>("");
  const { userAccessToken } = useLayoutContext();
  const { setConversation } = useConversationContext();
  const navigate = useNavigate();
  
  const onConversationSearch = async (name: string) => {
    conversationPage.current = 0;
    setSearchExpression(name);
    const result = await searchForConversations(name, currentId, conversationPage.current, 10, userAccessToken).then(result => result.content);
    setFoundConversations(result);
  }

  async function callSearchForConversation() {
    const result = await searchForConversations(searchExpression, currentId, conversationPage.current, 10, userAccessToken).then(result => result.content);
    setFoundConversations(prev => [...prev, ...result]);
  }

  async function callConversations() {
    const response: SimpleConversation[] = await getConversations(currentId, conversationPage.current,  10, userAccessToken).then(result => result.content);
    handleArrayMutation(setConversations, conversationPage.current, response);
  }
  
  useQuery({ queryFn: callConversations, queryKey: "getConversations", enabled: !!user });
  
  const {mutateAsync: deleteConversationFromList} = useMutation({
    mutationFn: async (conversationId: string) => {
      return await deleteConversation(conversationId, userAccessToken);
    },
    mutationKey: "deleteConversationFromList",
    onSuccess: (_data, variables) => {
      setConversations(conversations.filter((conv) => conv.id !== variables));
      setConversation(undefined);
      navigate(`/communication/conversation/start`);
    }
  });

  useEffect(() => {
    if(searchExpression === "") {
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
                key={conversation.id}
                conversation={conversation}
                deleteConversationFromList={deleteConversationFromList}
              />
            );
          })}
          <LoadMoreButton
            pageRef={conversationPage}
            callItems={callConversations}
          />
        </>
      ) : (
        <>
          {foundConversations.map((conversation) => {
            return (
              <ConversationComponent
                key={conversation.id}
                conversation={conversation}
                deleteConversationFromList={deleteConversationFromList}
              />
            );
          })}
          <LoadMoreButton
            pageRef={conversationPage}
            callItems={callSearchForConversation}
          />
        </>
      )}
    </ul>
  );
}