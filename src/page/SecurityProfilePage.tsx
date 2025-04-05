import {useSecurityMenuContext} from "../context/Profile/Identity/SecurityMenuContext.tsx";
import {EmailForm} from "../components/Profile/Form/EmailForm.tsx";
import {PasswordForm} from "../components/Profile/Form/PasswordForm.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {BasicButton} from "../components/Button/General/BasicButton.tsx";
import {DeleteButton} from "../components";
import {useEffect, useState} from "react";
import {ProfileResponse} from "../interface/profile/profile.ts";
import {getProfile} from "../api/profile/profileAPI.ts";

export const SecurityProfilePage = () => {
    const { option } = useSecurityMenuContext();
    const identityMenuButtonStyle = "w-1/2 h-full bg-slate-400 text-white text-5xl tracking-widest p-5 transition-all my-auto font-light";
    const [profile, setProfile] = useState<ProfileResponse>();
    const { user } = useAuth0();
    const currentId = user?.sub?.split('|')[1] || "no-id";
    
    const callUserProfile = async (id: string) => {
        const response = await getProfile(id).then(response => response);
        setProfile(response);
    }
    
    useEffect(() => {
        (async () => {
            if (!profile) callUserProfile(currentId);
        })();
    }, []);

    return <div className="w-full h-full">
        <div className="w-full h-[20vh] content-end border-b-4 bg-slate-800 flex flex-row justify-evenly relative">
            <BasicButton action={() => {}} style={identityMenuButtonStyle} text="Social"/>
            <img src={profile?.picture} alt="" className="w-36 h-36 rounded-full absolute translate-y-1/2 bottom-0 border-8-transparent bg-slate-100 p-1"/>
            <BasicButton action={() => {}} style={identityMenuButtonStyle}  text="Security"/>
        </div>
        <div className="w-full h-[10vh] my-14">
            <h2 className="w-full h-full text-3xl tracking-widest text-white content-center text-center">Security Profile</h2>
        </div>
        {option === "Overview" ? <SecurityOverview /> : (option === "Email" ? <EmailForm /> : <PasswordForm />)}
    </div>
}

const SecurityOverview = () => {

    const { user } = useAuth0();
    const currentId = user?.sub?.split('|')[1] || "no-id";
    const updateButtonStyle = "tracking-widest bg-slate-400 p-5 text-xl rounded-xl hover:outline hover:outline-4 hover:outline-offset-4 transition-all";
    const optionContainerStyle = "flex flex-row justify-between bg-slate-800 p-5 rounded-xl shadow-xl";
    const deleteContainerStyle = "flex flex-col gap-y-10 justify-between bg-slate-800 p-8 rounded-xl shadow-xl w-fit mx-auto";
    const containerTitleStyle = "text-2xl tracking-widest content-center";
    const EMAIL_TYPE = "Email";
    const PASSWORD_TYPE = "Password";
    const DELETE_TYPE = "Delete Your Account";
    const { switchOption } = useSecurityMenuContext();

    return <div className="w-full h-full">
        <div className="flex flex-col m-auto justify-between w-1/3 gap-y-10 text-white">
            <div className={optionContainerStyle}>
                <h3 className={containerTitleStyle}>{EMAIL_TYPE}</h3>
                <BasicButton action={() => {switchOption(EMAIL_TYPE)}} text="Update" style={updateButtonStyle}/>
            </div>

            <div className={optionContainerStyle}>
                <h3 className={containerTitleStyle}>{PASSWORD_TYPE}</h3>
                <BasicButton action={() => {switchOption(PASSWORD_TYPE)}} text="Update" style={updateButtonStyle}/>
            </div>

            <div className={deleteContainerStyle}>
                <h3 className={containerTitleStyle}>{DELETE_TYPE}</h3>
                <DeleteButton profileId={currentId}/>
            </div>
        </div>
    </div>
}