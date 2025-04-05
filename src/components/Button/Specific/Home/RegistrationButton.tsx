import { useAuth0 } from "@auth0/auth0-react";
import {BasicButton} from "../../General/BasicButton.tsx";

export const RegistrationButton = () =>{
    
    const { loginWithRedirect } = useAuth0();

    const onClickRegistrationButton = () => { loginWithRedirect({
        appState: { flow: "signup" },
        authorizationParams:{ screen_hint: "signup" }
    }) };
    const registrationButtonStyle = "hover:outline-slate-100 outline outline-4 outline-offset-4 items-center w-fit h-fit bg-slate-400 text-white px-16 py-3 mx-5 hover:text-slate-800 hover:bg-slate-100 transition rounded-full text-4xl";
    
    return <BasicButton style={registrationButtonStyle} action={onClickRegistrationButton} text="Registration"/>;
}