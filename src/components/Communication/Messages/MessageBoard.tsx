import { useGetMembers } from "../../../api/communication/memberAPI";
import { useConversationContext } from "../../../context/Communication/ConversationContext";
import React  from "react";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import {Loader} from "../../General/Loader.tsx";
import {Messages} from "./Messages.tsx";

type MessageBoardProps = {
  currentId: string,
  conversationId: string,
}

export const MessageBoard: React.FC<MessageBoardProps> = ({
  currentId,
}) => {
  
  const { userAccessToken } = useLayoutContext();
  const { setMembers, conversation } = useConversationContext();
  
  const memberIds = conversation?.memberIds ?? [];
  
  const {isSuccess: areMembersLoaded} = useGetMembers(
    memberIds, userAccessToken,
    {
      enabled: !!conversation?.memberIds,
      onSuccess: (fetchedMembers) => {
        setMembers(fetchedMembers);
      }
    });
  
  if(!areMembersLoaded) return <Loader />
  
  return <Messages currentId={currentId} />;
}