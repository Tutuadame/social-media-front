import React, {CSSProperties, useEffect, useRef, useState} from "react";
import { createSvg, orderMessagesToGroupsByConsecutiveIds } from "../../../utils/htmlUtils";
import { IconButton } from "../../Button/General/IconButton";
import { MessageResponse } from "../../../interface";
import { getMessages, sendMessage } from "../../../api/communication/messageAPI";
import { LoadMoreButton } from "../../Button/General/LoadMoreButton";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageBoard } from "./MessageBoard";
import { useMessageContext } from "../../../context/Communication/MessageContext";
import { useConversationUIContext } from "../../../context/Communication/ConversationUIContext.tsx";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";

type MessengerProps = {  
  groupedMessages: MessageResponse[][],
  setGroupedMessages: (messageGroups: MessageResponse[][]) => void | MessageResponse[][],
  deleteConversation: (conversationId: string) => void,
  conversationId: string
}

const sendMessageSVG = createSvg(["M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"], 1, "size-9");
const messageBoardStyle : CSSProperties = {
  height: "70vh",
}

const sendMessageFieldStyle : CSSProperties = {
  width: "30vw",
}

export const Messenger : React.FC<MessengerProps> = ({
  groupedMessages,
  setGroupedMessages,
  deleteConversation,
  conversationId
}) => {  
  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center");
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { messagePage }  = useMessageContext();
  const { openManagement } = useConversationUIContext();
  const { accessToken } = useLayoutContext();
  
  const onSubmit = async () => {
    if (!messageInputRef.current?.value) throw new Error("Empty message content!")
    
    const response: MessageResponse | undefined = await sendMessage(conversationId, currentId, messageInputRef.current.value.trim(), accessToken.current);
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
    if (messageInputRef.current) {
      messageInputRef.current.value = e.target.value;
    }
  };

  async function callMessages(){
    const response: MessageResponse[] = await getMessages(conversationId, messagePage.current, 10, accessToken.current);
    if (response.length < 10) {
      setLoadMoreStyle("flex justify-center hidden");
    } else {      
      messagePage.current += 1;
    }

    if (groupedMessages.length && response.length) {
      const updatedLastGroup = orderMessagesToGroupsByConsecutiveIds([...groupedMessages[groupedMessages.length - 1], ...response]);
      setGroupedMessages([...groupedMessages.slice(0, -1), ...updatedLastGroup]);
    } else if (response.length) {
      setGroupedMessages([...orderMessagesToGroupsByConsecutiveIds(response)]);  
    }  
  }
  
  useEffect( () => {
    setGroupedMessages([]);
    setLoadMoreStyle("flex justify-center");
    if (conversationId !== "start") {
      (async () => {
        callMessages();        
      })();
    }
  }, [conversationId]);

  if (conversationId === "start") {
    return (
      <div className="flex w-full h-full justify-center items-center text-2xl text-white">Select a conversation to start messaging.</div>
    );
  }

  return (
      <>
          <div className="flex w-9/12 overflow-y-auto mx-auto scrollbar-thin scrollbar-webkit pr-5 flex-col-reverse z-0" style={messageBoardStyle}>
          <MessageBoard conversationId={conversationId} currentId={currentId} groupedMessages={groupedMessages} setGroupedMessages={setGroupedMessages} deleteConversation={deleteConversation}/>

          { openManagement ? 
          <></>
          : 
          <LoadMoreButton
              callItems={callMessages}
              loadMoreStyle={loadMoreStyle}
              style="transition-all rotate-180 p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
              
            />}
          </div>
          { openManagement ? 
          <></>
          : 
          <div className="relative flex-row h-14 w-fit shadow-2xl mx-auto mt-10 content-center" style={sendMessageFieldStyle}>
            <input ref={messageInputRef} className="absolute h-14 p-4 w-10/12 border bottom-0 outline-none border-none shadow-2xl rounded-l-2xl" placeholder="Type here..." type="text" name="content" onChange={handleChange}/>
            <IconButton ariaLabel="Send" action={()=> { onSubmit() }} style="transition-all float-right rounded-r-2xl mr-0 w-2/12 h-14 bg-slate-200 hover:bg-slate-900 hover:text-slate-100">
              {sendMessageSVG}
            </IconButton>
          </div>
          }           
      </>
  );
}
