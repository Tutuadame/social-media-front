import {
  AddMemberRequest,
  ConversationMember,
  DeleteMemberFromConversationRequest
} from "../../../interface/communication/member.ts";
import React, {useState} from "react";
import {createSvg} from "../../../utils/htmlUtils.tsx";
import {useConversationUIContext} from "../../../context/Communication/ConversationUIContext.tsx";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import {addMember, deleteMemberFromConversation, searchForMembers} from "../../../api/communication/memberAPI.ts";
import {SearchBar} from "../../SearchBar.tsx";
import {IconButton} from "../../Button/General/IconButton.tsx";
import {nanoid} from "nanoid";
import {ProfileButton} from "../../Button/Specific/Global/ProfileButton.tsx";
import {useMutation} from "react-query";
import {deleteConversation} from "../../../api/communication/conversationAPI.ts";
import {useConversationContext} from "../../../context/Communication/ConversationContext.tsx";

type ConversationManagementProps = {
  currentId: string,
  conversationId: string,
}

export const ConversationManagement: React.FC<ConversationManagementProps> = ({currentId, conversationId}) => {
  const managementContainerStyle = "flex flex-col w-1/2 p-4 bg-slate-900 gap-y-3 rounded-xl z-10 h-full shadow-xl mx-auto";
  const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-9");
  const deleteSVG = createSvg(
    ["m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"],
    1.2, "size-7"
  );
  const addSVG = createSvg(["M12 4.5v15m7.5-7.5h-15"], 2, "size-7");
  const deleteMemberStyle = "transition-all w-[4vw] h-16 border-solid hover:bg-red-600 rounded-xl bg-red-200";
  const userListStyle = "flex flex-row w-full mx-auto justify-center gap-x-10 h-fit py-2";
  const addMemberButtonStyle = "w-[5vw] p-3 text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all";
  const exitMemberSearchButtonStyle = "w-[5vw] text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all";
  const startLink = "https://social.media:3000/communication/conversation/start"
  
  const { setSearchOn, searchOn } = useConversationUIContext()
  const {userAccessToken} = useLayoutContext();
  const { members, setMembers } = useConversationContext();
  
  const [foundProfiles, setFoundProfiles] = useState([] as ConversationMember[]);
  const [searchExpression, setSearchExpression] = useState("");
  
  const { mutateAsync : onSearch } = useMutation({
    mutationFn: async (name: string) => {
      return await searchForMembers(name, currentId, 0, 10, userAccessToken).then(response => response.content);
    },
    mutationKey: "onSearchForConnectedMembers",
    onSuccess: (response) => {
      setFoundProfiles(response.filter(
        (match: ConversationMember) => !members?.some(m => m.id === match.id)
      ));
    }
  })
  
  const { mutateAsync : onAddMember } = useMutation({
    mutationFn: async (request: AddMemberRequest) => {
      return await addMember(request, userAccessToken);
    },
    mutationKey: "addMemberToTheConversation",
    onSuccess: (response) => {
      setMembers(members.concat(response));
      setFoundProfiles(foundProfiles.filter((profile: ConversationMember) => profile.id !== response.id));
    }
  })
  
  const { mutateAsync : onDeleteMember } = useMutation({
    mutationFn: async (userId: string) => {
      const deleteRequest: DeleteMemberFromConversationRequest = {memberId: userId, conversationId: conversationId};
      if (currentId === userId && members.length === 1) {
        await deleteConversation(conversationId, userAccessToken);
      }
      return await deleteMemberFromConversation(deleteRequest, userAccessToken);
    },
    mutationKey: "deleteMemberFromConversation",
    onSuccess: (variables) => {
      if( members.length === 1 ){
        setMembers(members?.filter((m) => m.id !== variables));
        window.location.href = startLink;
      } else {
        setMembers(members?.filter((m) => m.id !== variables));
      }
    }
  });
  
  return <>
    <div className={managementContainerStyle}>
      <div className="flex flex-row border-b-2 border-slate-100 pb-4 mx-auto w-full justify-center gap-7">
        {searchOn ?
          <div className="flex flex-row justify-evenly w-full">
            <SearchBar onSearch={onSearch} searchExpression={searchExpression} setSearchExpression={setSearchExpression}/>
            <IconButton style={exitMemberSearchButtonStyle} action={() => {setSearchOn(false)}}>
              {exitButtonSVG}
            </IconButton>
          </div>
          :
          <>
            <h2 className="text-center text-white tracking-widest text-2xl my-auto">MEMBERS</h2>
            <IconButton action={() => {setSearchOn(true); setFoundProfiles([]);}} style={addMemberButtonStyle}>
              {addSVG}
            </IconButton>
          </>
        }
      </div>
      <div className="flex flex-col overflow-auto gap-5 mt-10">
        {searchOn ?
          <>
            {foundProfiles?.map((profile) => {
              const request: AddMemberRequest = {conversationId: conversationId, memberId: profile.id};
              return <div key={nanoid()} className={userListStyle}>
                <ProfileButton profile={profile}/>
                <IconButton action={() => {onAddMember(request)}}>
                  {addSVG}
                </IconButton>
              </div>
            })}
          </>
          :
          <>
            {members?.map(member => {
              return <div key={nanoid()} className={userListStyle}>
                <ProfileButton profile={member}/>
                <IconButton style={deleteMemberStyle} action={
                  async () => {
                    await onDeleteMember(member.id);
                  }
                }>
                  {deleteSVG}
                </IconButton>
              </div>
            })}
          </>
        }</div>
    </div>
  </>
}