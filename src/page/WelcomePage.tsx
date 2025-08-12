import { CSSProperties, useState } from "react";
import { BasicButton } from "../components/Button/General/BasicButton.tsx";
import {LoginButton, RegistrationButton} from "../components";
import {PAGE} from "./pageStyles.ts";

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
      <BasicButton style={PAGE.welcomeSwitchButton} action={() => {setIsRegister(!isRegister)} } text={isRegister ? "Already have an account?" : "Don't have an account?"}/>
    </div>        
  </>
  );
}