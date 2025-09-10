import { useNavigate } from "react-router-dom";
import { Button, DashboardButtonTitle } from "../buttonStyles";
import { ReactElement } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";

type DashboardButtonProps = {
    openView?: boolean;
    title: string;
    onClick?: () => void;
    navigateTo?: string;
    regularSVG: ReactElement;
    miniSVG: ReactElement;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
    title,
    onClick,
    navigateTo,
    regularSVG,
    miniSVG
}) => {

    const navigate = useNavigate();
    const { theme, isDashboardOpen } = useTheme();
    const handleAction = () => {
        if (onClick) onClick();
        else if(navigateTo) navigate(navigateTo);
    };

    return <> {isDashboardOpen ?
        <Button role="dashboard" mode={theme === 'light' ? 'light' : 'dark'} onClick={handleAction}>
            {regularSVG} <DashboardButtonTitle>{title}</DashboardButtonTitle>
        </Button>
            :
        <Button role="dashboardMini" mode={theme === 'light' ? 'light' : 'dark'} onClick={handleAction}>
            {miniSVG}
        </Button>}
    </>
    
};