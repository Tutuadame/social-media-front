import { useAuth0 } from "@auth0/auth0-react";
import { BasicButton } from "../../General/BasicButton";
import styles from "./Home.module.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const loginOnClick = () => loginWithRedirect();

  return <BasicButton style={styles['home-button']} action={loginOnClick} text="Login"/>
};