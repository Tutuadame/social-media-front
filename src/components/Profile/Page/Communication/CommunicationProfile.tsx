import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SimpleConversation } from "../../../../interface/conversationAPI";
import { Messenger } from "./Messages/Messenger";
import { Conversations } from "./Conversations/ConversationList";
import { SearchBar } from "./Conversations/SearchBar";
import { MessageResponse } from "../../../../interface/messageAPI";
import { Header } from "./Messages/Header";

export const MessageProfile = () => {
  const { user } = useAuth0();    
  const [selectedConversation, setSelectedConversation] = useState(
    undefined as SimpleConversation | undefined
  );
  const [messagePage, setMessagePage] = useState(0);
  const [groupedMessages, setGroupedMessages] = useState<MessageResponse[][]>([]);
  const [conversations, setConversations] = useState([] as SimpleConversation[]);

  const deleteConversation = (deletedConversationId: number) => {    
    setConversations(conversations.filter((c) => c.id !== deletedConversationId));
    setSelectedConversation(undefined);
  }

  const handleConversationUpdate = (updatedConversation: SimpleConversation) => {
    setConversations((prev) =>
      prev.map((conversation) => (conversation.id === updatedConversation.id ? updatedConversation : conversation))
    );
    setSelectedConversation(updatedConversation);
  }

  const handleSelectConversation = async (
    conversation: SimpleConversation | undefined // Undefined needed to handle closing
  ) => {
    if (user) {
      setSelectedConversation(conversation);
      setMessagePage(0);
      setGroupedMessages([]);
    }
  };

  return (
    <>
      <table className="relative flex flex-col w-full h-full overflow-hidden border-collapse bg-slate-400">
        <thead></thead>
        <tbody className="flex h-full my-auto w-full px-2 py-4 flex-row">
          <tr className="relative flex flex-row w-3/12 h-full border-r-2 border-slate-100 pr-0">
            <td className="relative w-10/12 mx-auto overflow-auto pt-4 pr-3 scrollbar-thin scrollbar-webkit">
              <ul>
                <SearchBar conversations={conversations} setConversations={setConversations}/>
                <Conversations
                  conversations={conversations}
                  setConversations={setConversations}
                  handleSelectedConversation={handleSelectConversation}
                  user={user}
                  deleteConversation={deleteConversation}
                />
              </ul>
            </td>
          </tr>
          <tr className="relative flex flex-row w-9/12 h-full">
            <td className="pl-5 w-full">
              {selectedConversation ? 
                <div className="flex relative flex-row justify-start mb-5 border-b-2 pb-2 w-10/12 mx-auto gap-2">
                  <Header selectedConversation={selectedConversation} handleSelectConversation={handleSelectConversation} handleConversationUpdate={handleConversationUpdate} />
                </div>
              :
                <></>}
              <Messenger
                selectedConversation={selectedConversation}
                handleSelectConversation={handleSelectConversation}
                messagePage={messagePage}
                setMessagePage={setMessagePage}
                groupedMessages={groupedMessages}
                setGroupedMessages={setGroupedMessages}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
