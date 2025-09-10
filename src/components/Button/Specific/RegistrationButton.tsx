import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../buttonStyles.ts";

export const RegistrationButton = () =>{
    
    const { loginWithRedirect } = useAuth0();

    const onClickRegistrationButton = () => { loginWithRedirect({
        appState: { flow: "signup" },
        authorizationParams:{ screen_hint: "signup" }
    }) };
        
    return <Button onClick={onClickRegistrationButton}>Registration</Button>
}