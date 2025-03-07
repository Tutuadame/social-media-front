import { deleteConversation } from "../../../../../api/communication/conversationAPI";
import { SimpleConversation } from "../../../../../interface/conversationAPI";
import { createSvg } from "../../../../../utils/htmlUtils";
import { IconButton } from "../../../../SampleButton/IconButton";

type ConversationButtonProps = {
  conversation: SimpleConversation,
  removeConversation: (conversationId: number) => void,
};
  

export const ConversationButton: React.FC<ConversationButtonProps> = ({ conversation, removeConversation }) => {

  const conversationStyle = "transition-all border-solid border-black px-15 w-full text-l hover:bg-slate-900 rounded-xl mr-1 bg-slate-200 hover:text-white";
  const deleteConversationStyle = "transition-all w-1/3 h-16 border-solid hover:bg-red-600 rounded-xl bg-red-200";
  const deleteSVG = createSvg(
    ["m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"],
     1.2, "size-7"
    );

  const removeSelf = async () => {
    try {      
      await deleteConversation(conversation.id)
      removeConversation(conversation.id);
    } catch (e){
      console.error((e as Error).message);
      throw e;
    } 
  }

  return (
    <>
      <button className={conversationStyle} key={conversation.id}>{conversation.name}</button>      
      <IconButton ariaLabel="Delete" style={deleteConversationStyle} action={() => {removeSelf()}}>
        {deleteSVG}
      </IconButton>
    </>
  );
};