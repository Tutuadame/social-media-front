import { useNavigate } from "react-router-dom";
import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";
import { BUTTON } from "../../buttonStyles.ts";

type HomeButtonProps = {
    minimalView?: boolean,
}

export const HomeButton:React.FC<HomeButtonProps> = ({minimalView = false}) => {
    
    const homeButtonSVG = createSvg(['m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'], 2, "size-6");
    const homeButtonMiniSVG = createSvg(['m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'], 2, "mx-auto size-6");
    const navigate = useNavigate();
    const homeButtonOnClick = () => {
        navigate('/');
    };

    return minimalView ? <IconButton action={homeButtonOnClick} style={BUTTON.dashboard}>{homeButtonMiniSVG}</IconButton> 
    :
    <IconButton action={homeButtonOnClick} style={BUTTON.dashboard}>{homeButtonSVG}<p className={BUTTON.dashboardButtonTitle}>Home</p></IconButton>
}
