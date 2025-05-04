import {ConversationMember} from "../../../interface/communication/member.ts";
import React from "react";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import {deleteMessage, updateMessage} from "../../../api/communication/messageAPI.ts";
import {SimpleMessageResponse} from "../../../interface/communication/message.ts";
import {orderMessagesToGroupsByConsecutiveIds} from "../../../utils/htmlUtils.tsx";
import {UserSideIndicator} from "./UserSideIndicator.tsx";
import {CurrentUserMessage} from "./CurrentUserMessage.tsx";
import {Message} from "./Message.tsx";
import {Loader} from "../../General/Loader.tsx";
import {useMessageContext} from "../../../context/Communication/MessengerContext.tsx";
import {useConversationContext} from "../../../context/Communication/ConversationContext.tsx";
import {nanoid} from "nanoid";

type MessagesProps = {
  currentId: string;
};

export const Messages: React.FC<MessagesProps> = ({currentId}) => {
  const {userAccessToken} = useLayoutContext();
  const { groupedMessages, setGroupedMessages } = useMessageContext();
  const { members } = useConversationContext();
  
  const onUpdateMessage = async (messageId: number, updatedContent: string) => {
    try {
      const response = await updateMessage(messageId, updatedContent, userAccessToken) as SimpleMessageResponse;
      let tempMessages = groupedMessages.flat();
      tempMessages = tempMessages.map((message) => {
        if (message.id === response.id) message.content = response.content;
        return message;
      });
      setGroupedMessages(orderMessagesToGroupsByConsecutiveIds(tempMessages));
    } catch (e) {
      throw e;
    }
  }
  
  const onDeleteMessage = async (messageId: number) => {
    try {
      await deleteMessage(messageId, userAccessToken);
      let tempMessages = [...groupedMessages.flat()];
      tempMessages = tempMessages.filter((message) => message.id !== messageId);
      setGroupedMessages(orderMessagesToGroupsByConsecutiveIds(tempMessages));
    } catch (e) {
      throw e;
    }
  }
  
  return <>
    {groupedMessages.map((messageGroup) => {
      return messageGroup ? messageGroup.map((message, index) => {
        const member : ConversationMember | undefined = members?.find(m => m.id === message.senderId) || undefined;
        return (
          <div key={nanoid()} className="flex flex-col">
            {messageGroup.length - 1 === index ?
              <UserSideIndicator
                isUserSide={message.senderId === currentId}
                firstName={member?.firstName || "Removed"}
                lastName={member?.lastName || "User"}
              />
              :
              <></>
            }
            {message.senderId === currentId ?
              <CurrentUserMessage
                updateMessage={onUpdateMessage}
                deleteMessage={onDeleteMessage}
                isLastMessage={index === 0}
                picture={member?.picture || ""}
                time={message.sentAt}
                content={message.content}
                messageId={message.id}
              />
              :
              <Message isLastMessage={index === 0} content={message.content} time={message.sentAt} picture={member?.picture}/>
            }
          </div>
        )
      }) : <Loader />})
    }
  </>
}