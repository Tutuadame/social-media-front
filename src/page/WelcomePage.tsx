import { CSSProperties, useState } from "react";
import { BasicButton } from "../components/Button/General/BasicButton.tsx";
import {LoginButton, RegistrationButton} from "../components";

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
    const pageStyle = "relative flex flex-col w-full h-full items-center gap-10";
    const switchButtonStyle = "items-center justify-center w-fit h-12 text-slate-900 px-5 mx-5 text-xl text-white";

    return (
    <>
        <img style={homePageStyle} src="../assets/home_unauth_bg.webp" alt="Background"/>
        <div className={pageStyle}>   
            <h1 className={"mt-28 text-center tracking-widest text-6xl text-white mb-64"}>It all starts now!</h1>
            {isRegister ? <RegistrationButton /> : <LoginButton />}
            <BasicButton style={switchButtonStyle} action={() => {setIsRegister(!isRegister)} } text={isRegister ? "Already have an account?" : "Don't have an account?"}/>
        </div>        
    </>
    );
}