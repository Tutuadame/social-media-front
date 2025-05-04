import {createSvg, getRelativeTime} from "../../../utils/htmlUtils.tsx";
import {IconButton} from "../../Button/General/IconButton.tsx";
import React, {useState} from "react";
import {MessageOptions} from "./MessageOptions.tsx";
import {nanoid} from "nanoid";

type CurrentUserMessageProps = {
  isLastMessage: boolean,
  picture: string,
  content: string,
  time: string,
  messageId: number,
  updateMessage: (messageId: number, updatedContent: string) => void,
  deleteMessage: (messageId: number) => void,
}

export const CurrentUserMessage: React.FC<CurrentUserMessageProps> = ({isLastMessage, picture, content, time, messageId, updateMessage, deleteMessage,}) => {
  
  const profPicStyle = "w-14 h-14 my-auto ml-2 border-2 rounded-full border-slate-900"
  const messageStyle = "relative max-w-64 p-4 bg-slate-900 text-slate-200 rounded-l-3xl"
  const relativeTimeStyle = "p-4 my-auto opacity-0 group-hover:opacity-100 transition-all";
  const dynamicMargin = isLastMessage ? "mr-12" : "mr-28";
  const toggleStyle = "transition-all max-w-fit bg-slate-900 text-slate-200 cursor-pointer hover:bg-slate-800 rounded-r-3xl"
  
  const optionsSVG = createSvg(
    ["M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"],
    1,
    "size-8"
  );
  
  const [showOptions, setShowOptions] = useState(false);
  
  const toggleOptions = () => setShowOptions(prev => !prev);
  
  return <div className="flex flex-col relative" key={nanoid()}>
    <div className="flex justify-end">
      {showOptions ? (
        <div className={`flex flex-row relative p-1 ${dynamicMargin}`}>
          <MessageOptions
            messageId={messageId}
            updateMessage={updateMessage}
            deleteMessage={deleteMessage}
            content={content}
            toggleOptions={toggleOptions}
          />
          <IconButton ariaLabel="Options" action={toggleOptions} style={toggleStyle}> {optionsSVG} </IconButton>
        </div>
      ) : (
        <div className={`flex flex-row relative p-1 ${dynamicMargin} transition-all group`}>
          <p className={relativeTimeStyle}>{getRelativeTime(time)}</p>
          <p className={messageStyle}> {content} </p>
          <IconButton ariaLabel="Options" action={toggleOptions} style={toggleStyle}> {optionsSVG} </IconButton>
          { isLastMessage ? <img src={picture} alt="" className={profPicStyle} /> : <></>}
        </div>
      )}
    </div>
  </div>
}