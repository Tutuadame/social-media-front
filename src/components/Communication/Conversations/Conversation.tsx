import {SimpleConversation} from "../../../interface/communication/conversation";
import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "../../Button/General/IconButton";
import React from "react";
import {useNavigate} from "react-router-dom";

type ConversationProps = {
  conversation: SimpleConversation,
  deleteConversationFromList: (conversationId: string) => void,
};
  

export const ConversationComponent: React.FC<ConversationProps> = ({ conversation, deleteConversationFromList }) => {

  const conversationStyle = "transition-all border-solid border-black px-15 w-full text-l hover:bg-slate-900 rounded-xl mr-1 bg-slate-200 hover:text-white";
  const deleteConversationStyle = "transition-all w-1/3 h-16 border-solid hover:bg-red-600 rounded-xl bg-red-200";
  const deleteSVG = createSvg(
    ["m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"],
     1.2, "size-7"
    );
  
  const navigate = useNavigate();
  
  return (
    <div key={conversation.id} className="flex relative flex-row px-2 border-r-2 border-l-2 border-transparent pb-1">
      <button
        onClick={() => navigate(`/communication/conversation/${conversation.id}`)}
        className={conversationStyle}
        key={conversation.id}
      >
        {conversation.name}
      </button>
      <IconButton ariaLabel="Delete" style={deleteConversationStyle} action={() => {deleteConversationFromList(conversation.id)}}>
        {deleteSVG}
      </IconButton>
    </div>
  );
};