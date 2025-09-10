import { useNavigate } from "react-router-dom";
import { ProfileResponse } from "../../../../interface/profile/profile";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import styles from "./Global.module.css";

type ProfileButtonProps = {
  profile: ProfileResponse,
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ profile }) => {

  const navigate = useNavigate();
  const { user } = useAuth0();
  // @ts-ignore
  const currentId = user?.sub.split('|')[1];
  const goToUserProfile = (userId: string) => {
    if(currentId === userId) {
      navigate("/profile/social")
    } else {
      navigate(`/user/${userId}`);
    }
  }

  if(!profile) return <>Profile not set!</>

  return <>
    <button key={profile.id} onClick={() => {goToUserProfile(profile.id)}} className={styles['profile-button']}>
      <img src={profile.picture} alt=""  className={styles['profile-pic']}/>
      <p className={styles['full-name']}>{profile.firstName + " " + profile.lastName}</p>
    </button>
  </>;
}