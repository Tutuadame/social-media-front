import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../buttonStyles";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const loginOnClick = () => loginWithRedirect();

  return <Button onClick={loginOnClick}>Login</Button>
};