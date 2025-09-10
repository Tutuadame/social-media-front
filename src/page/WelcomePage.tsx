import { CSSProperties, useState } from "react";
import { LoginButton, RegistrationButton } from "../components";
import {PAGE} from "./pageStyles.ts";
import { Button } from "../components/Button/buttonStyles.ts";

export const WelcomePage = () => {
  
  const homePageStyle: CSSProperties = {
    position: 'absolute',
    backgroundImage: `url('src/assets/home_unauth_bg.webp')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: `blur(2px) brightness(60%)`,
    overflow: 'auto',
    height: '100vh',
    width: '100vw'
  };
  
  const [isRegister, setIsRegister] = useState<boolean>(true);

  return (
  <>
    <img style={homePageStyle} src="../assets/home_unauth_bg.webp" alt="Background"/>
    <div className={PAGE.welcomePage}>
      <h1 className={PAGE.welcomeTitle}>It all starts now!</h1>
      {isRegister ? <RegistrationButton /> : <LoginButton />}
      <Button onClick={() => {setIsRegister(!isRegister)}}>{isRegister ? "Already have an account?" : "Don't have an account?"}</Button>
    </div>
  </>
  );
}