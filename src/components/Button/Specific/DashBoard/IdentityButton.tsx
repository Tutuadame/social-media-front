import { useNavigate } from "react-router-dom";
import {useLayoutContext} from "../../../../context/Layout/LayoutOutContext.tsx";
import {useEffect} from "react";

export const IdentityButton = () => {
    const navigate = useNavigate();
    const { profile } = useLayoutContext()

    const profileButtonOnClick = () => {
        navigate('/profile/social');
    };
    const buttonStyle = "h-fit w-fit hover:outline hover:outline-4 hover:outline-offset-4 rounded-xl transition-all mx-auto";
    const picStyle = "rounded-xl w-14 h-14";
    
    useEffect(() => {
        console.log(profile);
    }, [profile]);
    
    return <div className="flex flex-col gap-y-2 w-24">
        <button className={buttonStyle} onClick={profileButtonOnClick}>
            <img className={picStyle} src={profile.picture} alt={"Profile"}/>
        </button>
        <p className="tracking-wider text-center w-18">Identity</p>
    </div>
}