import { useState } from "react";
import { SimpleConversation } from "../../../../../interface/conversationAPI";
import { createSvg } from "../../../../../utils/htmlUtils";
import { IconButton } from "../../../../SampleButton/IconButton";
import { updateConversationName } from "../../../../../api/communication/conversationAPI";

type HeaderProps = {
    selectedConversation: SimpleConversation,
    handleSelectConversation : (conversation : SimpleConversation | undefined) => void,
    handleConversationUpdate : (updatedConversation: SimpleConversation) => void,
}

export const Header: React.FC<HeaderProps> = ({selectedConversation, handleSelectConversation, handleConversationUpdate}) => {
    const [input, setInput] = useState({ conversationName: "" });
    const [rename, setRename] = useState(false);
    const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-9");
    const membersSVG = createSvg(["M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"],1,"size-9");
    const editSVG = createSvg(["m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"], 1, "size-9");
    const checkSVG = createSvg(["m4.5 12.75 6 6 9-13.5"], 1, "size-7");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ conversationName: e.target.value });
    };

    const callNameChange = async () => {
      const updatedConversation = await updateConversationName(selectedConversation.id, input.conversationName);      
      handleConversationUpdate(updatedConversation);
      setRename(!rename);
    }

    return (<>
        { rename ?
            <>
                <input type="text" name="conversationName" value={input.conversationName} onChange={handleChange} className="flex w-fit px-2 py-1 text-left my-auto text-2xl text-black"/>
                <IconButton ariaLabel="Edit name" action={()=>{callNameChange()}}>
                    {checkSVG}
                </IconButton>            
            </>
            :
            <>
                <h2 className="flex max-w-fit pr-5 text-left my-auto text-2xl text-black">{selectedConversation.name}</h2>
                <IconButton ariaLabel="Done" action={()=>setRename(!rename)}>
                    {editSVG}
                </IconButton>
            </>
        }
        <IconButton ariaLabel="Members" action={()=>{/** Call a members list for management**/}}>
          {membersSVG}
        </IconButton>
        <IconButton ariaLabel="Exit" action={()=>{handleSelectConversation(undefined)}} style={`flex w-14 h-14 items-center justify-center w-12 h-12 bg-slate-900 text-white rounded p-1 hover:text-slate-800 hover:bg-slate-100 transition absolute right-0 rounded-full`}>
          {exitButtonSVG}
        </IconButton>    
    </>);
}