import { useAuth0 } from "@auth0/auth0-react";
import { standardStyle } from "../../style";
import { Button } from "../SampleButton/Button";

export const RegistrationButton = () =>{
    
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const onClickRegistrationButton = () =>{ loginWithRedirect({authorizationParams:{screen_hint: "signup"}})};
    const text = "Registration";
  
    return (isAuthenticated ? null : <Button action={onClickRegistrationButton} text={text} style={standardStyle}/>) 
}