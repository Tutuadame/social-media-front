import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const IdentityButton = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();

    const profileButtonOnClick = () => {
        navigate('/profile/social');
    };
    const buttonStyle = "h-fit w-fit hover:outline hover:outline-4 hover:outline-offset-4 rounded-xl transition-all mx-auto";
    const picStyle = "rounded-xl w-14 h-14";

    return <div className="flex flex-col gap-y-2 w-24">
        <button className={buttonStyle} onClick={profileButtonOnClick}>
            <img className={picStyle} src={user?.picture}/>
        </button>
        <p className="tracking-wider text-center w-18">Identity</p>
    </div>
}