import { CSSProperties, useEffect, useState } from "react";
import { SimpleConversation } from "../../../../../interface/conversationAPI";
import { createSvg, orderMessagesToGroupsByConsecutiveIds } from "../../../../../utils/htmlUtils";
import { IconButton } from "../../../../SampleButton/IconButton";
import { MessageResponse } from "../../../../../interface/messageAPI";
import { getMessages, sendMessage } from "../../../../../api/communication/messageAPI";
import { LoadMoreButton } from "../LoadMoreButton";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageBoard } from "./MessageBoard";

type MessengerProps = {
  selectedConversation : SimpleConversation | undefined,
  handleSelectConversation : (conversation : SimpleConversation | undefined) => void,
  messagePage: number,
  setMessagePage: (page: number) => void,
  groupedMessages: MessageResponse[][],
  setGroupedMessages: (messageGroups: MessageResponse[][]) => void | MessageResponse[][]
}

const sendMessageSVG = createSvg(["M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"], 1, "size-9");
const messageBoardStyle : CSSProperties = {
  height: "55vh",
}

export const Messenger : React.FC<MessengerProps> = ({
  selectedConversation,  
  messagePage,
  setMessagePage,
  groupedMessages,
  setGroupedMessages
}) => {  
  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";  
  const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center"); 
  const [formData, setFormData] = useState({ content: "" });    
  
  const onSubmit = async () => {
    if(selectedConversation) {      
      const response: MessageResponse[] = [await sendMessage(selectedConversation?.id, currentId, formData.content).then((result) => result)];      
      if (groupedMessages.length && response[0].senderId === groupedMessages[0][0].senderId) {
        const updatedLastGroup = [response[0], ...groupedMessages[0]];        
        delete groupedMessages[0];         
        setGroupedMessages([updatedLastGroup, ...groupedMessages.slice(0, -1)]);
      } else {
        console.log("new sided it")
        setGroupedMessages([response, ...groupedMessages.slice(0, -1)]);
      }
      setFormData({content: ""});      
    }
    console.log(groupedMessages);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function callMessages(){
    const response: MessageResponse[] = await getMessages(selectedConversation?.id, messagePage);
    if (response.length < 10) {
      setLoadMoreStyle("flex justify-center hidden");
    } else {
      setMessagePage(messagePage + 1);
    }

    if (groupedMessages.length) {      
      const updatedLastGroup = orderMessagesToGroupsByConsecutiveIds([...groupedMessages[groupedMessages.length - 1], ...response]);
      setGroupedMessages([...groupedMessages.slice(0, -1), ...updatedLastGroup]);
    } else if (response.length) {
      setGroupedMessages([...orderMessagesToGroupsByConsecutiveIds(response)]);  
    }    
  }

  useEffect(()=>{
    setGroupedMessages([]);
    setLoadMoreStyle("flex justify-center");
    if (selectedConversation) {
      callMessages();      
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="flex w-full h-full justify-center items-center text-2xl text-white">Select a conversation to start messaging.</div>
    );
  }

  return (
      <>
        <div className="flex w-9/12 overflow-y-auto mx-auto scrollbar-thin scrollbar-webkit pr-5 flex-col-reverse" style={messageBoardStyle}>
          <MessageBoard currentId={currentId} groupedMessages={groupedMessages} setGroupedMessages={setGroupedMessages}/>
          {<LoadMoreButton
              callItems={callMessages}
              loadMoreStyle={loadMoreStyle}
              style="transition-all rotate-180 p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
              
            />}
        </div>
        <div className="relative flex-row h-14 w-7/12 shadow-2xl mx-auto mt-10 ">
          <input className="absolute h-14 p-4 w-11/12 border bottom-0 outline-none border-none shadow-2xl rounded-l-2xl" placeholder="Type here..." type="text" name="content" value={formData.content} onChange={handleChange}/>
          <IconButton ariaLabel="Send" action={()=>{ onSubmit() }} style="transition-all float-right rounded-r-2xl mr-0 w-1/12 h-14 bg-slate-200 hover:bg-slate-900 hover:text-slate-100">
            {sendMessageSVG}
          </IconButton>
        </div>
      </>
  );
}
