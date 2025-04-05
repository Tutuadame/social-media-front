import { useAuth0 } from "@auth0/auth0-react";
import { HomePageComponent, WelcomePage } from "../components";


export const HomePage = () => {

    const {isAuthenticated} = useAuth0();

    return <> {isAuthenticated ? <HomePageComponent /> : <WelcomePage />} </>
}
