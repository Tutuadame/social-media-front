import { useAuth0 } from "@auth0/auth0-react";
import { HomePage, WelcomePage } from "../components";


export const Home = () => {

    const {isAuthenticated} = useAuth0();

    return <> {isAuthenticated ? <HomePage /> : <WelcomePage />} </>
}
