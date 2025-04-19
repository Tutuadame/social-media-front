import { useEffect, useState } from "react";
import { getProfile } from "../api/profile/profileAPI";
import { ProfileResponse } from "../interface/profile/profile";
import { useNavigate, useParams } from "react-router-dom";
import { BasicButton } from "../components/Button/General/BasicButton";
import { createConnection, checkConnectionStatus } from "../api/profile/connectionAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { CheckConnectionRequest } from "../interface";
import { createConversation } from "../api/communication/conversationAPI";
import { CreateConversationRequest, SimpleConversation } from "../interface/communication/conversation";
import { CreateConnectionRequest } from "../interface";
import { useLayoutContext } from "../context/Layout/LayoutOutContext";

export const SocialUserPage = () => {

  const { userId } = useParams<{userId: string}>();
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";  
  const [userProfile, setUserProfile] = useState<ProfileResponse>();
  const [connected, setConnected] = useState<string | undefined>(undefined);
  const infoRowContainerStyle = "w-4/5 flex flex-row gap-x-10 text-2xl tracking-widest text-slate-100 bg-slate-800 p-10 justify-between mx-auto shadow-xl rounded-xl font-thin";
  const lastInfoContainerStyle = "w-4/5 mb-10 flex flex-col gap-x-10 text-2xl tracking-widest text-slate-100 bg-slate-800 p-10 justify-between mx-auto shadow-xl rounded-xl font-thin";
  const actionButton = "p-5 bg-slate-900 w-1/2 rounded-xl hover:outline hover:outline-2 hover:outline-offset-4 transition-all mx-auto";
  const navigate = useNavigate();
  const { setConnections } = useLayoutContext();
  const { accessToken } = useLayoutContext();
  
  
  if(!userId) return <>The Profile ID is UNDEFINED</>;

  async function callProfile() {
    if(userId) {
      const result = await getProfile(userId, accessToken.current).then(result => result);
      setUserProfile(result);
    }
  }

  async function connect() {
    if(userId) {
      const createRequest: CreateConnectionRequest = {
        initiatorId: currentId,
        targetId: userId,
      }
      const response = await createConnection(createRequest, accessToken.current);
      setConnections(prev => [...prev, response]);
      setConnected("PENDING");
    }
  }

  async function startConversation() {
    if(userProfile && userId) {
      const createRequest: CreateConversationRequest = {
        members: [userId, currentId],
        name: `${userProfile.firstName} ${userProfile.lastName}`
      }
      const response: SimpleConversation = await createConversation(createRequest, accessToken.current).then(result => result);
      navigate(`/communication/conversation/${response.id}`);
    }
  }

  async function callConnectionCheck() {
    if(userId) {
      const requestParams: CheckConnectionRequest = {
        currentUserId: currentId,
        targetUserId: userId
      }
      const result = await checkConnectionStatus(requestParams, accessToken.current).then(result => result);
      console.log(result);
      !result ? setConnected("") : setConnected(result);
    }
  }

  useEffect( () => {
    (async () =>{
      await callConnectionCheck();
      if(!userProfile) {
        await callProfile();
      }
    })()
  }, [])
  
  if(connected === "BLOCKED") return <div className={"m-auto"}>
    <h2 className={"tracking-widest text-2xl text-white"}>The user is not available!</h2>
  </div>

  return <div className="flex flex-col h-fit w-full gap-y-10 overflow-auto max-w-[55%] bg-slate-400 p-5 border-2 rounded-xl shadow-2xl m-auto">    
    <div className="w-3/5 flex flex-row text-2xl tracking-widest justify-between mt-10 mx-auto p-1 text-white gap-x-5 items-center">
      <img src={userProfile?.picture} className="w-36 h-36 m-auto rounded-full border-8-transparent bg-slate-100 p-1" alt={"Profile"}/>
      { connected === "ACCEPTED" ?
        <BasicButton style={actionButton} text="Message" action={() => {startConversation()}}/>
          :
          connected === "PENDING" ?
            <h2 className={"text-white text-2xl tracking-widest"}>Pending...</h2>
            :
          <BasicButton style={actionButton} text="Connect" action={() => {connect()}}/>
      }
    </div>    
    <div className={infoRowContainerStyle}>
      <p className="">Name</p>
      <p>{userProfile?.firstName} {userProfile?.lastName}</p>
    </div>
    <div className={infoRowContainerStyle}>
      <p className="">Gender</p>
      <p>{userProfile?.gender}</p>
    </div>
    <div className={lastInfoContainerStyle}>
      <p className="mr-auto mb-10">Introduction</p>
      <p className="mx-auto">{userProfile?.introduction}</p>
    </div>
    
  </div>;
}