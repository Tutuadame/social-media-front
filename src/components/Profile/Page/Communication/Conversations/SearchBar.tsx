import { useState } from "react";
import { SimpleConversation } from "../../../../../interface/conversationAPI";
import { createSvg } from "../../../../../utils/htmlUtils";
import { IconButton } from "../../../../SampleButton/IconButton";

type SearchBarProps = {
    conversations: SimpleConversation[],
    setConversations: (conversations: SimpleConversation[]) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({conversations, setConversations}) => {

    const [input, setInput] = useState({ search: "" });
    const [allItems, setAllItems]  = useState([] as SimpleConversation[]);

    const searchForConversation = () => {        
        setAllItems(conversations);
        setConversations(conversations.filter(c => c.name.includes(input.search)));
    }

    const resetConversations = () => {
        console.log(JSON.stringify(allItems))
        setConversations(allItems);
        setAllItems([]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if ( e.target.value === "" ) {
            resetConversations();
        }
    };

    const searchIconSVG = createSvg(["m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"], 1, "size-7");

    return (<>
        <div className="flex relative w-full">
            <input value={input.search} onChange={handleChange} type="text" name="search" id="" className="transition-all bg-slate-100 w-10/12 h-14 mb-5 p-3 outline-none rounded-l-2xl" placeholder="Search..."/>
            <IconButton ariaLabel="Send" action={()=>{searchForConversation()}} type="submit" style="transition-all w-3/12 h-14 bg-slate-300 hover:bg-slate-900 hover:text-slate-100 rounded-r-2xl">
              {searchIconSVG}
            </IconButton>
        </div>        
    </>);

}