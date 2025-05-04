import React from "react";
import { getRelativeTime } from "../../../utils/htmlUtils";

type MessageProps = {
    content: string;
    time: string;
    picture?: string;
    isLastMessage: boolean;
};

export const Message: React.FC<MessageProps> = ({ content, time, picture, isLastMessage }) => {

    const dynamicMargin = isLastMessage ? "ml-12" : "ml-28";
    const messageStyle = "relative max-w-64 p-4 bg-slate-100 text-slate-900 rounded-3xl";
    const relativeTimeStyle = "p-4 my-auto opacity-0 group-hover:opacity-100 transition-all";
    const profilePicStyle = "w-14 h-14 my-auto mr-2 border-2 rounded-full border-slate-100";
    
    return (
      <div className="flex flex-col relative">
          <div className={`flex justify-start`}>
              <div className={`flex flex-row relative p-1 ${dynamicMargin} transition-all group`}>
                  {isLastMessage ? <img src={picture} alt="" className={profilePicStyle} /> : <></> }
                  <p className={messageStyle}> {content} </p>
                  <p className={relativeTimeStyle}> {getRelativeTime(time)} </p>
              </div>
          </div>
      </div>
    );
};
