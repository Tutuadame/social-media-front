import { UserSideIndicator } from "./UserSideIndicator";
import { Message } from "./Message";
import { MessageResponse, SimpleMessageResponse } from "../../../../../interface/messageAPI";
import { deleteMessage, updateMessage } from "../../../../../api/communication/messageAPI";
import { orderMessagesToGroupsByConsecutiveIds } from "../../../../../utils/htmlUtils";

type MessageBoardProps = {
  groupedMessages: MessageResponse[][],
  setGroupedMessages: (messageGroups: MessageResponse[][]) => void | MessageResponse[][]
  currentId: string
}

export const MessageBoard: React.FC<MessageBoardProps> = ({groupedMessages, currentId, setGroupedMessages}) => {
    
    const onUpdate = async (messageId: number, updatedContent: string) => {
      try {
        const response : SimpleMessageResponse = await updateMessage(messageId, updatedContent);
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

    const onDelete = async (messageId: number) => {
      try {
        await deleteMessage(messageId);
        let tempMessages = groupedMessages.flat();
        tempMessages = tempMessages.filter((message) => message.id !== messageId);
        setGroupedMessages(orderMessagesToGroupsByConsecutiveIds(tempMessages));
      } catch (e) {
        throw e;
      }
    }

    return <> {groupedMessages.map((messageGroup) => {
                  return messageGroup ? messageGroup.map((message, index) => {                    
                    return (
                      <div key={message.id} className="flex flex-col">
                        {messageGroup.length - 1 === index ? 
                        <UserSideIndicator 
                          userSide={message.senderId === currentId}
                          firstName={message.firstName}
                          lastName={message.lastName}                          
                          /> 
                        : <></> }
                        <Message
                          messageId={message.id}
                          isUserSide={message.senderId === currentId}
                          content={message.content}
                          time={message.sentAt}
                          picture={message.picture}                          
                          updateMessage={onUpdate}
                          deleteMessage={onDelete}
                          />
                      </div>
                    );
                  }) : <></>;
                })
            }</>
}