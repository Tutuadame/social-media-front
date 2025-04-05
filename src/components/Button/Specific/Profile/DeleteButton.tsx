import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {deleteAuth0User} from "../../../../api";
import {deleteMember} from "../../../../api/communication/memberAPI.ts";
import {deleteProfile} from "../../../../api/profile/profileAPI.ts";
import {BasicButton} from "../../General/BasicButton.tsx";

type DeleteButtonProps ={
  profileId: string
}

export const DeleteButton : React.FC<DeleteButtonProps> = ({ profileId }) => {

    const deleteButtonStyle = "mx-auto h-[6vh] w-[8vw] text-2xl text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 hover:bg-red-600 transition-all p-2 my-auto tracking-widest";
    const { logout } = useAuth0();

    const deleteAllProfiles = async () => {
      try {
        await deleteAuth0User(profileId);
        await deleteMember(profileId);
        await deleteProfile(profileId);

        await logout({logoutParams: {returnTo: window.location.origin}});
      } catch (e) {
        console.error((e as Error).message);
      }
    }

    return <BasicButton action={deleteAllProfiles} text="Delete" style={deleteButtonStyle}/>
}