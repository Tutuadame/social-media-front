import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../SampleButton/Button";
import { standardStyle } from "../../style";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const loginOnClick = () => loginWithRedirect();
  const loginText = "Log In";  

  return <Button action={loginOnClick} text={loginText} style={standardStyle}/> 
   
};