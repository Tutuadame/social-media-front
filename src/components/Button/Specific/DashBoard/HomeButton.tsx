import { useNavigate } from "react-router-dom";
import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";

export const HomeButton = () => {
    
    const homeButtonSVG = createSvg(['m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'], 2, "size-6");
    const homeButtonStyle = "items-center mx-auto w-14 h-14 bg-slate-400 text-white p-3 hover:outline hover:outline-4 hover:outline-offset-4 transition-all rounded-xl text-4xl";
    const navigate = useNavigate();
    const homeButtonOnClick = () => {
        navigate('/');
    };

    return <div className="flex flex-col gap-y-2 w-24">
        <IconButton action={homeButtonOnClick} style={homeButtonStyle}> 
            {homeButtonSVG}
        </IconButton>
        <p className="tracking-wider text-center w-18">Home</p>
    </div>
}
