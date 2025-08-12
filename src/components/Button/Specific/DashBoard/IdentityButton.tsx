import { useNavigate } from "react-router-dom";
import { BUTTON } from "../../buttonStyles.ts";
import { createSvg } from "../../../../utils/htmlUtils.tsx";
import { IconButton } from "../../General/IconButton.tsx";

type IdentityButtonProps = {
    minimalView?: boolean
}

export const IdentityButton: React.FC<IdentityButtonProps> = ({minimalView = false}) => {
    const navigate = useNavigate();

    const identityButtonSVG = createSvg(['M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'], 2, "size-6");
    const identityButtonMiniSVG = createSvg(['M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'], 2, "mx-auto size-6");

    const profileButtonOnClick = () => {
        navigate('/profile/social');
    };
    
    return minimalView ? <IconButton style={BUTTON.dashboard} action={profileButtonOnClick}>{identityButtonMiniSVG}</IconButton>
    :
    <IconButton style={BUTTON.dashboard} action={profileButtonOnClick}>{identityButtonSVG}<p className={BUTTON.dashboardButtonTitle}>Identity</p></IconButton>
}
