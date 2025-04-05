import { useNavigate } from "react-router-dom";
import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";

export const MessagesButton = () => {
    
    const messagesButtonSVG = createSvg(["M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"], 2, "size-6");
    
    const navigate = useNavigate();
    const messagesButtonOnClick = () => {
        navigate('/communication/conversation/start');        
    };
    const messagingButtonStyle = "items-center mx-auto w-14 h-14 bg-slate-400 text-white p-3 hover:outline hover:outline-4 hover:outline-offset-4 transition-all rounded-xl text-4xl";

    return <div className="flex flex-col gap-y-2 w-24">
        <IconButton action={messagesButtonOnClick} style={messagingButtonStyle}> 
            {messagesButtonSVG}
        </IconButton>
        <p className="tracking-wider text-center w-18">Messages</p>
    </div>
}