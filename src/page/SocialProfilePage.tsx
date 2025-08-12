import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {updateIntroduction} from "../api/profile/profileAPI.ts";
import {BasicButton} from "../components/Button/General/BasicButton.tsx";
import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {useMutation} from "react-query";
import {PAGE} from "./pageStyles.ts";

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
           <BasicButton action={() => {navigate("/profile/social")}} style={!isSecurity ? PAGE.profileActiveButton : PAGE.profileIdentityMenuButton} text="Social"/>
           <img src={userProfile?.current.picture} alt="" className={PAGE.profileAvatar}/>
           <BasicButton action={() => {navigate("/profile/security")}} style={isSecurity ? PAGE.profileActiveButton : PAGE.profileIdentityMenuButton} text="Security"/>
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
                   { edit ? <></> : <BasicButton action={()=>{setEdit(true)}} text="Edit" style={PAGE.profileEditButton}/>}
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
                       <BasicButton action={onSubmit} text="Submit" style={PAGE.profileSubmitButton}/>
                       <BasicButton action={() => {setEdit(false)}} text="Back" style={PAGE.profileSubmitButton}/>
                     </div>
                   </>
                   :
                    <h2 className={PAGE.profileTextDisplay}>{intro}</h2>
               }
           </div>
       </div>
   </div>;
}