import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {deleteAuth0User} from "../../../api/index.ts";
import {deleteProfile} from "../../../api/profile/profileAPI.ts";
import {useLayoutContext} from "../../../context/Layout/LayoutOutContext.tsx";
import { Button } from "../buttonStyles.ts";

type DeleteButtonProps ={
  profileId: string
}

export const DeleteButton : React.FC<DeleteButtonProps> = ({ profileId }) => {

    const { logout } = useAuth0();
    const { userAccessToken } = useLayoutContext();

    const deleteAllProfiles = async () => {
      try {
        await deleteAuth0User(profileId, userAccessToken);
        await deleteProfile(profileId, userAccessToken);

      await logout({logoutParams: {returnTo: window.location.origin}});
    } catch (e) {
      console.error((e as Error).message);
    }
  }
  
  return <Button onClick={deleteAllProfiles}>Delete</Button>
}