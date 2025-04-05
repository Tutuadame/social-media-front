import { IconButton } from "../../Button/General/IconButton";
import { createSvg, getRelativeTime } from "../../../utils/htmlUtils";
import { BasicButton } from "../../Button/General/BasicButton";
import { useState } from "react";

type MessageProps = {
    isUserSide: boolean,
    content: string,
    time: string,    
    messageId: number,
    picture: string | undefined,
    updateMessage: (messageId: number, updatedContent: string) => void,
    deleteMessage: (messageId: number) => void
}

export const Message : React.FC<MessageProps> = ({isUserSide, content, time, picture, messageId, updateMessage, deleteMessage}) => {
    
    const [showOptions, setShowOptions] = useState(false);
    const optionsButtonStyle = "transition-all w-full bg-slate-100 p-3 rounded-full text-slate-900 hover:bg-slate-400 font-semibold tracking-wider";
    const [formData, setFormData] = useState({ updatedContent: "" });  
    const color = isUserSide ? "bg-slate-900 text-slate-200" : "bg-slate-100 text-slate-900";
    const position = isUserSide ? "justify-end" : "justify-start";
    const dynamicMargin = isUserSide ? "mr-12" : "ml-12";
    const dynamicRounding = isUserSide ? "rounded-l-3xl" : "rounded-3xl";    
    const optionsSVG = createSvg(["M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"], 1, "size-8");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (<>
            <div className={`flex flex-col relative`}>
                <div className={`flex ${position}`}>
                    { showOptions ? 
                    <div className={`flex flex-row relative p-1 ${dynamicMargin}`}>
                        <div className={`flex flex-col gap-3 p-4 ${color} ${dynamicRounding}`}>
                            <textarea rows={3} cols={50} placeholder={content} value={formData.updatedContent} onInput={handleChange} name="updatedContent" className={`relative max-w-64 flex flex-col gap-3 p-3 rounded-xl text-slate-900`} />
                            <BasicButton text="Delete" action={() => {
                                deleteMessage(messageId);
                                setShowOptions(!showOptions);
                                }}
                                style={`${optionsButtonStyle}`}/>
                            <BasicButton text="Update" action={() => {
                                updateMessage(messageId, formData.updatedContent);
                                setShowOptions(!showOptions);
                            }} style={`${optionsButtonStyle}`}/>
                        </div>                        
                        <IconButton ariaLabel="Options" action={()=>{setShowOptions(!showOptions)}} style={`transition-all max-w-fit text-slate-200 ${color} cursor:pointer hover:bg-slate-800 rounded-r-3xl`}>
                            {optionsSVG}
                        </IconButton>
                    </div>
                    :                    
                    <div className={`flex flex-row relative p-1 ${dynamicMargin} transition-all group`}>                        
                        {isUserSide ? <p className="p-4 my-auto opacity-0 group-hover:opacity-100 transition-all">{getRelativeTime(time)}</p> : <></>}                        
                        {!isUserSide ? <img src={picture} alt="" className="w-14 h-14 my-auto mr-2 border-2 rounded-full border-slate-100" />  : <></>}
                        <p className={`relative bg-slate-100 max-w-64 p-4 ${color}  ${dynamicRounding}`}>{content}</p>                        
                        {isUserSide ? 
                        <IconButton ariaLabel="Options" action={()=>{setShowOptions(!showOptions)}} style={`transition-all max-w-fit text-slate-200 ${color} cursor:pointer hover:bg-slate-800 rounded-r-3xl`}>
                            {optionsSVG}
                        </IconButton>
                        : <></>}
                        {isUserSide ? <img src={picture} alt="" className="w-14 h-14 my-auto ml-2 border-2 rounded-full border-slate-900" />  : <></>}
                        {!isUserSide ? <p className="p-4 my-auto opacity-0 group-hover:opacity-100 transition-all">{getRelativeTime(time)}</p> : <></>}
                    </div>
                    }
                </div>
            </div>
        </>);
}