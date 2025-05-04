import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {updateIntroduction} from "../api/profile/profileAPI.ts";
import {BasicButton} from "../components/Button/General/BasicButton.tsx";
import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {useMutation} from "react-query";

export const SocialProfilePage = () => {
  const infoContainerStyle = "w-2/3 flex flex-row gap-x-10 text-2xl tracking-widest text-slate-100 bg-slate-800 p-10 justify-between mx-auto shadow-xl rounded-xl font-thin";
  const editableContainerStyle = "w-2/3 flex flex-col gap-10 text-2xl tracking-widest text-slate-100 bg-slate-800 p-10 justify-between mx-auto shadow-xl rounded-xl font-thin";
  const submitButtonStyle = "m-auto w-1/4 h-fit bg-slate-400 text-white text-3xl tracking-widest p-3 transition-all font-light rounded-xl hover:outline hover:outline-4 hover:outline-offset-4";
  const identityMenuButtonStyle = "w-1/2 h-full bg-slate-400 text-white text-5xl tracking-widest p-5 transition-all my-auto font-light";
  const activeButtonStyle = "w-1/2 h-full bg-slate-100 text-slate-900 text-5xl tracking-widest p-5 transition-all my-auto font-light";
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

   return <div className="w-full h-[95vh]">
       <div className="w-full h-[20vh] content-end border-b-4 bg-slate-800 flex flex-row justify-evenly relative">
           <BasicButton action={() => {navigate("/profile/social")}} style={!isSecurity ? activeButtonStyle : identityMenuButtonStyle} text="Social"/>
           <img src={userProfile?.current.picture} alt="" className="w-36 h-36 rounded-full absolute translate-y-1/2 bottom-0 border-8-transparent bg-slate-100 p-1"/>
           <BasicButton action={() => {navigate("/profile/security")}} style={isSecurity ? activeButtonStyle : identityMenuButtonStyle} text="Security"/>
       </div>
       <div className="w-full h-[10vh] mt-14">
           <h2 className="w-full h-full text-3xl tracking-widest text-white content-center text-center">Social Profile</h2>
       </div>

       <div className="max-h-[60vh] flex flex-col w-10/12 p-5 m-auto gap-10 overflow-auto">
           <div className={infoContainerStyle}>
               <h2>Name</h2>
               <h2>{userProfile?.current.firstName}, {userProfile?.current.lastName}</h2>
           </div>

           <div className={infoContainerStyle}>
               <h2>Email</h2>
               <h2>{user?.email}</h2>
           </div>

           <div className={infoContainerStyle}>
               <h2>Gender</h2>
               <h2>{userProfile?.current.gender}</h2>
           </div>

           <div className={editableContainerStyle}>
               <div className="flex flex-row justify-between">
                   <h2>Introduction</h2>
                   { edit ? <></> : <BasicButton action={()=>{setEdit(true)}} text="Edit" style="transition-all text-slate-100 bg-slate-400 rounded-xl p-3 hover:outline outline-4 outline-offset-4"/>}
               </div>
               { edit ?
                   <>
                     <textarea
                       className="text-slate-900 rounded-xl p-3 text-xl w-full h-[15vh] bg-slate-400 font-normal focus:outline-none"
                       value={intro}
                       onInput={handleChange}
                       placeholder={userProfile?.current.introduction}
                     >
                     </textarea>
                     <div className="flex flex-row w-full gap-10">
                       <BasicButton action={onSubmit} text="Submit" style={submitButtonStyle}/>
                       <BasicButton action={() => {setEdit(false)}} text="Back" style={submitButtonStyle}/>
                     </div>
                   </>
                   :
                    <h2 className="text-slate-900 rounded-xl p-5 text-xl max-w-1/2 h-[15vh] bg-slate-400 my-auto font-normal">{intro}</h2>
               }
           </div>
       </div>
   </div>;
}