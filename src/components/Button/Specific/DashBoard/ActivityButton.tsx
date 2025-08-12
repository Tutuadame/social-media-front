import { useNavigate } from "react-router-dom";
import { createSvg } from "../../../../utils/htmlUtils";
import { IconButton } from "../../General/IconButton";
import { BUTTON } from "../../buttonStyles";

type ActivityButtonProps = {
    minimalView?: boolean
}

export const ActivityButton : React.FC<ActivityButtonProps> = ({ minimalView = false }) => {
    
    const activityButtonSVG = createSvg(['M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122'], 2, "size-6");
    const activityButtonMiniSVG = createSvg(['M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122'], 2, "mx-auto size-6");
    const navigate = useNavigate();
    const activityButtonOnClick = () => {
        navigate('/profile/activity');
    };

    return minimalView ? <IconButton action={activityButtonOnClick} style={BUTTON.dashboard}>{activityButtonMiniSVG} </IconButton>    
    : 
    <IconButton action={activityButtonOnClick} style={BUTTON.dashboard}>{activityButtonSVG}<p className={BUTTON.dashboardButtonTitle}>Activity</p></IconButton> 
}

