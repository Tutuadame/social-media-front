import { Dispatch, SetStateAction, useState } from "react";
import { Conversation, SimpleConversation } from "../../../interface/communication/conversation";
import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "../../Button/General/IconButton";
import { updateConversationName } from "../../../api/communication/conversationAPI";
import { useUIContext } from "../../../context/Communication/UIContext";

type HeaderProps = {    
  handleSelectConversation : (conversationId: string) => void,
  handleConversationUpdate : (updatedConversation: SimpleConversation) => void,
  conversation: Conversation | undefined,
  setConversation: Dispatch<SetStateAction<Conversation | undefined>>,
}

export const Header: React.FC<HeaderProps> = ({ handleSelectConversation, handleConversationUpdate, conversation, setConversation}) => {    
    const { openManagement, setOpenManagement } = useUIContext();    
    const [rename, setRename] = useState(false);    
    const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-9");
    const membersSVG = createSvg(["M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"],1,"size-9");
    const editSVG = createSvg(["m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"], 1, "size-9");
    const checkSVG = createSvg(["m4.5 12.75 6 6 9-13.5"], 1, "size-7");    

    if (!conversation) return <></>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const renamedConv = conversation;
        renamedConv.name = e.target.value;
        setConversation(renamedConv);
    };

    const callNameChange = async () => {
      const updatedConversation = await updateConversationName(conversation?.id, conversation?.name || "");      
      handleConversationUpdate(updatedConversation);
      setRename(false);
    }

    return <div className="flex relative flex-row justify-start mb-5 border-b-2 pb-2 w-10/12 mx-auto gap-2">
        { rename ?
            <>
                <input type="text" name="conversationName" onChange={handleChange} className="w-fit p-2 text-left my-auto text-2xl bg-slate-100 rounded-xl" placeholder={conversation.name}/>
                <IconButton action={()=>{callNameChange()}} active={true}>
                    {checkSVG}
                </IconButton>
            </>
            :
            <div className="flex flex-row">
                <h2 className="flex max-w-fit pr-10 text-left my-auto text-2xl text-white">{conversation.name}</h2>
                <IconButton action={() => setRename(true)}>
                    {editSVG}
                </IconButton>                
            </div>
        }
        { openManagement ? 
            <>  
                <IconButton action={() => {setOpenManagement(false)}} active={true}>
                    {membersSVG}
                </IconButton>
            </>
            :
            <>
                <IconButton action={() => {setOpenManagement(true)}}>
                    {membersSVG}
                </IconButton>
            </>
        }
        <IconButton action={() => {handleSelectConversation("start")}} style="w-[5vw] text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all p-2 m-1 ml-auto">
          {exitButtonSVG}
        </IconButton>
    </div>
}
