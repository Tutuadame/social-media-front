import { useAuth0 } from "@auth0/auth0-react";
import {BasicButton} from "../../General/BasicButton.tsx";
import styles from "./Home.module.css";

export const RegistrationButton = () =>{
    
    const { loginWithRedirect } = useAuth0();

    const onClickRegistrationButton = () => { loginWithRedirect({
        appState: { flow: "signup" },
        authorizationParams:{ screen_hint: "signup" }
    }) };    
    
    return <BasicButton style={styles['home-button']} action={onClickRegistrationButton} text="Registration"/>;
}