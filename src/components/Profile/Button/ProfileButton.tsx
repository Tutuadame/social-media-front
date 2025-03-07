import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const ProfileButton = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();

    const profileButtonOnClick = () => navigate('/profile');

    
    const picStyle = "rounded w-12 h-12";

    return (
       user !== undefined ? <button onClick={profileButtonOnClick}><img className={picStyle} src={user.picture}/></button> : null
    );    
}