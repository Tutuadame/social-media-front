import { useNavigate } from "react-router-dom";
import { ProfileResponse } from "../../../../interface/profile/profile";
import { ConversationMember } from "../../../../interface/communication/member";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";

type ProfileButtonProps = {
  profile: ProfileResponse | ConversationMember,
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ profile }) => {

  const navigate = useNavigate();
  const { user } = useAuth0();
  const currentId = user?.sub.split('|')[1];
  const buttonStyle = "transition-all flex flex-row bg-slate-100 rounded-xl min-w-[12vw] max-w-[20] p-2 text-slate-900 gap-x-3 justify-start hover:bg-slate-900 hover:text-slate-100 hover:outline hover:outline-offset-4";
  const goToUserProfile = (userId: string) => {
    if(currentId === userId) {
      navigate("/profile/social")
    } else {
      navigate(`/user/${userId}`);
    }
  }

  if(!profile) return <>Profile not set!</>

  return <>
    <button onClick={() => {goToUserProfile(profile.id)}} className={buttonStyle}>
      <img src={profile.picture} alt=""  className="w-12 h-12 border-2 border-white rounded-full"/>
      <p className="text-xl my-auto p-2">{profile.firstName + " " + profile.lastName}</p>
    </button>
  </>;
}