import { useState } from "react";
import { getProfile } from "../api/profile/profileAPI";
import { ProfileResponse } from "../interface/profile/profile";
import { useNavigate, useParams } from "react-router-dom";
import { BasicButton } from "../components/Button/General/BasicButton";
import { createConnection, checkConnectionStatus } from "../api/profile/connectionAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { CheckConnectionRequest } from "../interface";
import { createConversation } from "../api/communication/conversationAPI";
import { CreateConversationRequest } from "../interface/communication/conversation";
import { CreateConnectionRequest } from "../interface";
import { useLayoutContext } from "../context/Layout/LayoutOutContext";
import {useMutation, useQuery} from "react-query";
import {NoPage} from "./NoPage.tsx";
import {PAGE} from "./pageStyles.ts";

export const SocialUserPage = () => {

  const { userId } = useParams<{userId: string}>();
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";  
  const [userProfile, setUserProfile] = useState<ProfileResponse>();
  const [connected, setConnected] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { userAccessToken, userConnections } = useLayoutContext();
  
  if(!userId) return <NoPage />
  
  useQuery({
    queryFn: async () => {
      const requestParams: CheckConnectionRequest = {currentUserId: currentId, targetUserId: userId}
      const result = await checkConnectionStatus(requestParams, userAccessToken).then(result => result);
      !result ? setConnected("") : setConnected(result);
    },
    queryKey: "callConnectionCheck",
    enabled: !!userId
  });
  
  useQuery({
    queryFn: async () => {
      const result = await getProfile(userId, userAccessToken).then(result => result);
      setUserProfile(result);
    },
    queryKey: "callProfile",
    enabled: !!userId
  });
  
  const {mutateAsync : startConversation} = useMutation({
    mutationFn: async () => {
      const createRequest: CreateConversationRequest = {members: [userId, currentId], name: `New Chat`}
      await createConversation(createRequest, userAccessToken).then(result => result);
    },
    mutationKey: "startConversation",
    onSuccess:  () => navigate(`/communication/conversation/start`)
  });
  
  const {mutateAsync : connect} = useMutation({
    mutationFn: async () => {
      const createRequest: CreateConnectionRequest = {initiatorId: currentId, targetId: userId};
      return await createConnection(createRequest, userAccessToken);
    },
    mutationKey: "connect",
    onSuccess: (response) => {
      userConnections.current = userConnections.current.concat(response);
      setConnected("PENDING");
    }
  });
  
  if(connected === "BLOCKED") return <div className={PAGE.socialUserBlockedContainer}>
    <h2 className={PAGE.socialUserBlockedText}>The user is not available!</h2>
  </div>

  return <div className={PAGE.socialUserContainer}>    
    <div className={PAGE.socialUserHeader}>
      <img src={userProfile?.picture} className={PAGE.socialUserAvatar} alt={"Profile"}/>
      { connected === "ACCEPTED" ?
        <BasicButton style={PAGE.socialUserActionButton} text="Message" action={startConversation}/>
          :
          connected === "PENDING" ?
            <h2 className={PAGE.socialUserPendingText}>Pending...</h2>
            :
          <BasicButton style={PAGE.socialUserActionButton} text="Connect" action={ async () => { await connect()}}/>
      }
    </div>    
    <div className={PAGE.socialUserInfoContainer}>
      <p className="">Name</p>
      <p>{userProfile?.firstName} {userProfile?.lastName}</p>
    </div>
    <div className={PAGE.socialUserInfoContainer}>
      <p className="">Gender</p>
      <p>{userProfile?.gender}</p>
    </div>
    <div className={PAGE.socialUserLastInfoContainer}>
      <p className={PAGE.socialUserIntroLabel}>Introduction</p>
      <p className={PAGE.socialUserIntroText}>{userProfile?.introduction}</p>
    </div>
    
  </div>;
}