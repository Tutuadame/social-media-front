import React, {CSSProperties, useRef} from "react";
import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "../../Button/General/IconButton";
import { MessageResponse } from "../../../interface";
import { sendMessage } from "../../../api/communication/messageAPI";
import { LoadMoreButton } from "../../Button/General/LoadMoreButton";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageBoard } from "./MessageBoard";
import { useMessageContext } from "../../../context/Communication/MessengerContext.tsx";
import { useConversationUIContext } from "../../../context/Communication/ConversationUIContext.tsx";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import {UseQueryResult} from "react-query";
import {ConversationManagement} from "./ConversationManagement.tsx";

type MessengerProps = {  
  conversationId: string,
  messageQuery: UseQueryResult<any, unknown>
}

const sendMessageSVG = createSvg(["M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"], 1, "size-9");
const messageBoardStaticStyle : CSSProperties = {
  height: "70vh",
}

const sendMessageFieldStyle : CSSProperties = {
  width: "30vw",
}

export const Messenger : React.FC<MessengerProps> = ({
  conversationId,
  messageQuery
}) => {
  
  const sendMessageButtonStyle = "transition-all float-right rounded-r-2xl mr-0 w-2/12 h-14 bg-slate-200 hover:bg-slate-900 hover:text-slate-100";
  const loadMoreButtonStyle = "transition-all rotate-180 p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
  const sendMessageField = "absolute h-14 p-4 w-10/12 border bottom-0 outline-none border-none shadow-2xl rounded-l-2xl";
  const sendMessageContainerStyle = "relative flex-row h-14 w-fit shadow-2xl mx-auto mt-10 content-center";
  const messageBoardContainerStyle = "flex w-9/12 overflow-y-auto mx-auto scrollbar-thin scrollbar-webkit pr-5 flex-col-reverse z-0";
  
  const { messagePage, groupedMessages, setGroupedMessages }  = useMessageContext();
  const { openManagement } = useConversationUIContext();
  const { userAccessToken } = useLayoutContext();
  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  
  const onSubmit = async () => {
    if (!messageInputRef.current?.value) throw new Error("Empty message content!")
    
    const response: MessageResponse | undefined = await sendMessage(conversationId, currentId, messageInputRef.current.value.trim(), userAccessToken);
    const newGroupedMessages = groupedMessages;
    
    if (groupedMessages.length && response) {
      newGroupedMessages[0] = [response, ...newGroupedMessages[0]];
    } else if (response) {
      newGroupedMessages.push([response]);
    }
    setGroupedMessages([...newGroupedMessages]);
    messageInputRef.current.value = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (messageInputRef.current) messageInputRef.current.value = e.target.value;
  };

  if (conversationId === "start") return <div className="flex w-full h-full justify-center items-center text-2xl text-white">
    Select a conversation to start messaging.
  </div>;

  return <>
    { !openManagement ?
      <>
        <div className={messageBoardContainerStyle} style={messageBoardStaticStyle}>
          <MessageBoard conversationId={conversationId} currentId={currentId}/>
          <LoadMoreButton pageRef={messagePage} callItems={messageQuery.refetch} style={loadMoreButtonStyle}/>
        </div>
        <div className={sendMessageContainerStyle} style={sendMessageFieldStyle}>
          <input ref={messageInputRef} className={sendMessageField} placeholder="Type here..." type="text" name="content" onChange={handleChange}/>
          <IconButton ariaLabel="Send" action={onSubmit} style={sendMessageButtonStyle}>
            {sendMessageSVG}
          </IconButton>
        </div>
      </>
      :
      <ConversationManagement currentId={currentId} conversationId={conversationId} />
    }
  </>;
}
