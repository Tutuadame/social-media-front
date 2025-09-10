import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {updateIntroduction} from "../api/profile/profileAPI.ts";
import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {useMutation} from "react-query";
import {PAGE} from "./pageStyles.ts";
import { Button } from "../components/Button/buttonStyles.ts";

export const SocialProfilePage = () => {
  const isSecurity = window.location.href.includes("security");
  
  const { userProfile, userAccessToken, refetchProfile } = useLayoutContext();
  const { user } = useAuth0();
  
  const [intro, setIntro] = useState(userProfile?.current.introduction);
  const [edit, setEdit] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIntro(e.target.value);
  }

  const { mutateAsync: updateIntro } = useMutation({
    mutationFn: async () => {
      return await updateIntroduction(userProfile?.current.id, intro, userAccessToken).then(result => result.introduction);
    },
    mutationKey: "updateIntroduction",
  });

  const onSubmit = async () => {
    const result = await updateIntro();
    setIntro(result);
    setEdit(false);
    await refetchProfile();
  }

  return <div className="w-full">
      <div className={PAGE.profileHeader}>
        <Button onClick={() => {navigate("/profile/social")}}>Social</Button>
        <img src={userProfile?.current.picture} alt="" className={PAGE.profileAvatar}/>
        <Button onClick={() => {navigate("/profile/security")}}>Security</Button>
      </div>
      <div className={PAGE.profileTitleContainer}>
          <h2 className={PAGE.profileTitle}>Social Profile</h2>
      </div>

      <div className={PAGE.profileContentContainer}>
          <div className={PAGE.profileInfoContainer}>
              <h2>Name</h2>
              <h2>{userProfile?.current.firstName}, {userProfile?.current.lastName}</h2>
          </div>

          <div className={PAGE.profileInfoContainer}>
              <h2>Email</h2>
              <h2>{user?.email}</h2>
          </div>

          <div className={PAGE.profileInfoContainer}>
              <h2>Gender</h2>
              <h2>{userProfile?.current.gender}</h2>
          </div>

          <div className={PAGE.profileEditableContainer}>
              <div className="flex flex-row justify-between">
                  <h2>Introduction</h2>
                  { edit ? <></> : <Button onClick={()=>{setEdit(true)}}>Edit</Button>}
              </div>
              { edit ?
                  <>
                    <textarea
                      className={PAGE.profileTextarea}
                      value={intro}
                      onInput={handleChange}
                      placeholder={userProfile?.current.introduction}
                    >
                    </textarea>
                    <div className="flex flex-row w-full gap-10">
                      <Button onClick={onSubmit}>Submit</Button>
                      <Button onClick={() => {setEdit(false)}}>Back</Button>
                    </div>
                  </>
                  :
                    <h2 className={PAGE.profileTextDisplay}>{intro}</h2>
              }
          </div>
      </div>
  </div>;
}