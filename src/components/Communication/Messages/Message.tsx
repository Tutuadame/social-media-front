import React, { useState } from "react";
import { IconButton } from "../../Button/General/IconButton";
import { BasicButton } from "../../Button/General/BasicButton";
import { createSvg, getRelativeTime } from "../../../utils/htmlUtils";

type MessageProps = {
    isUserSide: boolean;
    content: string;
    time: string;
    messageId: number;
    picture?: string;
    updateMessage: (messageId: number, updatedContent: string) => void;
    deleteMessage: (messageId: number) => void;
    isLastMessage: boolean;
};

export const Message: React.FC<MessageProps> = ({ isUserSide, content, time, picture, messageId, updateMessage, deleteMessage, isLastMessage }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [formData, setFormData] = useState({ updatedContent: "" });
    
    const toggleOptions = () => setShowOptions(prev => !prev);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Dynamic styles
    const color = isUserSide ? "bg-slate-900 text-slate-200" : "bg-slate-100 text-slate-900";
    const position = isUserSide ? "justify-end" : "justify-start";
    const rounding = isUserSide ? "rounded-l-3xl" : "rounded-3xl";
    const optionsButtonStyle = "transition-all w-full bg-slate-100 p-3 rounded-full text-slate-900 hover:bg-slate-400 font-semibold tracking-wider";
    const optionsSVG = createSvg(
      ["M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"],
      1,
      "size-8"
    );
    const messageStyle = "relative bg-slate-100 max-w-64 p-4";
    
    // Adjust margin based on side and position
    const margin = isLastMessage
      ? isUserSide ? "mr-12" : "ml-12"
      : isUserSide ? "mr-28" : "ml-28";
    
    return (
      <div className="flex flex-col relative">
          <div className={`flex ${position}`}>
              {showOptions ? (
                <div className={`flex flex-row relative p-1 ${margin}`}>
                    <div className={`flex flex-col gap-3 p-4 ${color} ${rounding}`}>
              <textarea
                rows={3}
                cols={50}
                placeholder={content}
                name="updatedContent"
                value={formData.updatedContent}
                onInput={handleChange}
                className="relative max-w-64 flex flex-col gap-3 p-3 rounded-xl text-slate-900"
              />
                        <BasicButton
                          text="Delete"
                          action={() => {
                              deleteMessage(messageId);
                              toggleOptions();
                          }}
                          style={optionsButtonStyle}
                        />
                        <BasicButton
                          text="Update"
                          action={() => {
                              updateMessage(messageId, formData.updatedContent);
                              toggleOptions();
                          }}
                          style={optionsButtonStyle}
                        />
                    </div>
                    <IconButton
                      ariaLabel="Options"
                      action={toggleOptions}
                      style={`transition-all max-w-fit text-slate-200 ${color} cursor-pointer hover:bg-slate-800 rounded-r-3xl`}
                    >
                        {optionsSVG}
                    </IconButton>
                </div>
              ) : (
                <div className={`flex flex-row relative p-1 ${margin} transition-all group`}>
                    {isUserSide && (
                      <p className="p-4 my-auto opacity-0 group-hover:opacity-100 transition-all">
                          {getRelativeTime(time)}
                      </p>
                    )}
                    
                    {!isUserSide && isLastMessage && (
                      <img
                        src={picture}
                        alt=""
                        className="w-14 h-14 my-auto mr-2 border-2 rounded-full border-slate-100"
                      />
                    )}
                    
                    <p className={`${color} ${rounding} ${messageStyle}`}>{content}</p>
                    
                    {isUserSide && (
                      <IconButton
                        ariaLabel="Options"
                        action={toggleOptions}
                        style={`transition-all max-w-fit text-slate-200 ${color} cursor-pointer hover:bg-slate-800 rounded-r-3xl`}
                      >
                          {optionsSVG}
                      </IconButton>
                    )}
                    
                    {isUserSide && isLastMessage && (
                      <img
                        src={picture}
                        alt=""
                        className="w-14 h-14 my-auto ml-2 border-2 rounded-full border-slate-900"
                      />
                    )}
                    
                    {!isUserSide && (
                      <p className="p-4 my-auto opacity-0 group-hover:opacity-100 transition-all">
                          {getRelativeTime(time)}
                      </p>
                    )}
                </div>
              )}
          </div>
      </div>
    );
};
