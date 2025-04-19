import { MainComponent, WelcomePage } from "../components";
import { useAuth0 } from "@auth0/auth0-react";


export const HomePage = () => {
    
    const { isAuthenticated } = useAuth0();

    return <> {isAuthenticated ? <MainComponent /> : <WelcomePage />} </>
}