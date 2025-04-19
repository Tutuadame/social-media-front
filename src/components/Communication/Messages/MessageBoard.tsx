import { UserSideIndicator } from "./UserSideIndicator";
import { Message } from "./Message";
import { MessageResponse, SimpleMessageResponse } from "../../../interface/communication/message";
import { deleteMessage, updateMessage } from "../../../api/communication/messageAPI";
import { createSvg, orderMessagesToGroupsByConsecutiveIds } from "../../../utils/htmlUtils";
import { AddMemberRequest, ConversationMember, DeleteMemberFromConversationRequest } from "../../../interface/communication/member";
import { addMember, deleteMemberFromConversation, searchForMembers } from "../../../api/communication/memberAPI";
import { IconButton } from "../../Button/General/IconButton";
import { useConversationContext } from "../../../context/Communication/ConversationContext";
import { useConversationUIContext } from "../../../context/Communication/ConversationUIContext.tsx";
import React, { useState } from "react";
import { ProfileButton } from "../../Button/Specific/Global/ProfileButton";
import { SearchBar } from "../../SearchBar";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";

type MessageBoardProps = {
  groupedMessages: MessageResponse[][],
  setGroupedMessages: (messageGroups: MessageResponse[][]) => void | MessageResponse[][]
  currentId: string,
  conversationId: string,
  deleteConversation: (conversationId: string) => void,
}
const lastMemberDeleteMessage = "Member and Conversation was successfully deleted!";

export const MessageBoard: React.FC<MessageBoardProps> = ({groupedMessages, currentId, setGroupedMessages, deleteConversation, conversationId}) => {  
  const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-9");  
  const deleteSVG = createSvg(
        ["m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"],
         1.2, "size-7"
        );
  const addSVG = createSvg(["M12 4.5v15m7.5-7.5h-15"], 2, "size-7");
  const deleteMemberStyle = "transition-all w-[4vw] h-16 border-solid hover:bg-red-600 rounded-xl bg-red-200";
  const userListStyle = "flex flex-row w-full mx-auto justify-center gap-x-10 h-fit py-2";
  const {setMembers, members} = useConversationContext();
  const {openManagement, setSearchOn, searchOn} = useConversationUIContext();
  const [foundProfiles, setFoundProfiles] = useState([] as ConversationMember[]);
  const [searchExpression, setSearchExpression] = useState("");
  const { accessToken } = useLayoutContext();

  const onSearch = async (name: string) => {
    const result = await searchForMembers(name, currentId, 0, 10, accessToken.current).then(response => response.content);
    setFoundProfiles(result.filter(
      (match: ConversationMember) => !members?.some(m => m.id === match.id)
    ));
  }

  const onAdd = async (request: AddMemberRequest) => {
    const result = await addMember(request, accessToken.current);
    const temp = members;
    if (temp) setMembers(temp?.concat(result));
    setFoundProfiles(foundProfiles.filter(
      (profile: ConversationMember) => profile.id !== result.id
    )); 
  }

  const onUpdate = async (messageId: number, updatedContent: string) => {
    try {
      const response = await updateMessage(messageId, updatedContent, accessToken.current) as SimpleMessageResponse;
      let tempMessages = groupedMessages.flat();
      tempMessages = tempMessages.map((message) => {
        if (message.id === response.id) message.content = response.content;
        return message;
      });
      setGroupedMessages(orderMessagesToGroupsByConsecutiveIds(tempMessages));
    } catch (e) {
      throw e;
    }
  }

  const onDelete = async (messageId: number) => {
    try {
      await deleteMessage(messageId, accessToken.current);
      let tempMessages = groupedMessages.flat();
      tempMessages = tempMessages.filter((message) => message.id !== messageId);
      setGroupedMessages(orderMessagesToGroupsByConsecutiveIds(tempMessages));
    } catch (e) {
      throw e;
    }
  }

  const deleteMember = async (userId: string) => {
    const deleteRequest: DeleteMemberFromConversationRequest = {
      memberId: userId,
      conversationId: conversationId,
    };

    const response = await deleteMemberFromConversation(deleteRequest, accessToken.current);
    if (response === lastMemberDeleteMessage) deleteConversation(conversationId);
    if (members) setMembers(members?.filter((m) => m.id !== userId));        
  }

  return <> {openManagement ? 
    <>
        <div className="flex flex-col w-3/4 p-4 bg-slate-900 gap-y-3 rounded-xl z-10 h-full shadow-xl mx-auto">
          <div className="flex flex-row border-b-2 border-slate-100 pb-4 mx-auto w-full justify-center gap-7">
          { searchOn ?
              <div className="flex flex-row justify-evenly w-full">
                <SearchBar onSearch={onSearch} searchExpression={searchExpression} setSearchExpression={setSearchExpression} />
                <IconButton style="w-[5vw] text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all"
                action={()=>{setSearchOn(false)}}>
                  {exitButtonSVG}
                </IconButton>
              </div>              
            : 
            <>
              <h2 className="text-center text-white tracking-widest text-2xl my-auto">MEMBERS</h2>
              <IconButton action={() => {setSearchOn(true); setFoundProfiles([])}} style="w-[5vw] p-3 text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all" >{addSVG} </IconButton>
            </>              
            }              
          </div>
            <div className="flex flex-col overflow-auto gap-5 mt-10">
            { searchOn ? 
              <>
                {foundProfiles?.map((profile) => {
                  const request: AddMemberRequest = {conversationId: conversationId, memberId: profile.id};
                  return <div key={profile.id} className={userListStyle}>
                      <ProfileButton profile={profile}/>
                      <IconButton action={() => {onAdd(request)}}>{addSVG}</IconButton>
                    </div> 
                })}
              </>
            : 
              <>
                {members?.map(member => {
                  return <div key={member.id} className={userListStyle}>                      
                      <ProfileButton profile={member}/>
                      <IconButton style={deleteMemberStyle} action={() => {deleteMember(member.id)}}>{deleteSVG}</IconButton>
                  </div>             
                })}
              </>
            }
              
            </div>
        </div>
    </>
    : 
    <>
        {groupedMessages.map((messageGroup) => {
          return messageGroup ? messageGroup.map((message, index) => {
            const member : ConversationMember | undefined = members?.find(m => m.id === message.senderId) || undefined;                                        
            return (
              <div key={message.id} className="flex flex-col">
                {messageGroup.length - 1 === index ? 
                <UserSideIndicator 
                  userSide={message.senderId === currentId}
                  firstName={member?.firstName}
                  lastName={member?.lastName}                          
                  /> 
                : <></> }
                <Message
                  messageId={message.id}
                  isUserSide={message.senderId === currentId}
                  content={message.content}
                  time={message.sentAt}
                  picture={member?.picture}
                  updateMessage={onUpdate}
                  deleteMessage={onDelete}
                  isLastMessage={index === 0}
                  />
              </div>
            )
          })
          :
            <></>
          })
        }
      </>
    }  
    </>
}