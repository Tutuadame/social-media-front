import {BasicButton} from "../../Button/General/BasicButton.tsx";
import React, {useRef} from "react";

type MessageOptionsProps = {
  messageId: number,
  toggleOptions: () => void,
  updateMessage: (messageId: number, content: string) => void,
  deleteMessage: (messageId: number) => void,
  content: string,
}

export const MessageOptions : React.FC<MessageOptionsProps> = ({messageId, toggleOptions, updateMessage, deleteMessage, content}) => {
  
  const optionsButtonStyle = "transition-all w-full bg-slate-100 p-3 rounded-full text-slate-900 hover:bg-slate-400 font-semibold tracking-wider";
  const updateTextAreaStyle = "relative max-w-64 flex flex-col gap-3 p-3 rounded-xl text-slate-900";
  const containerStyle = "flex flex-col gap-3 p-4 bg-slate-900 text-slate-200 rounded-l-3xl";
  
  const updateContent = useRef(content);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent.current = e.target.value
  };
  
  return <div className={containerStyle}>
    <textarea rows={3} cols={50} placeholder={content} name="updatedContent" onInput={handleChange} className={updateTextAreaStyle}/>
    <BasicButton text="Delete" action={() => {deleteMessage(messageId); toggleOptions(); }} style={optionsButtonStyle}/>
    <BasicButton text="Update" action={() => {updateMessage(messageId, updateContent.current); toggleOptions(); }} style={optionsButtonStyle}/>
  </div>
}