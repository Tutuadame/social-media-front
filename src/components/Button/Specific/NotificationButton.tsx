import React, {Dispatch, SetStateAction} from "react";
import { createSvg } from "../../../utils/htmlUtils";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { Button, DashboardButtonTitle, NotificationCounter } from "../buttonStyles";


type NotificationButtonProps = {
    setShowNotifications: Dispatch<SetStateAction<boolean>>,
    numberOfNotifications: number,
}

export const NotificationButton:React.FC<NotificationButtonProps> = ({ setShowNotifications, numberOfNotifications}) => {
    
    const notificationButtonSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "size-6");
    const notificationButtonMiniSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "mx-auto size-6");    
    const notificationStyle = numberOfNotifications === 0 ? "hide" : "show";
    const notificationNumber = numberOfNotifications === 0 ? "" : numberOfNotifications;
    const { theme, isDashboardOpen } = useTheme();

    return isDashboardOpen ?
    <Button role="dashboard" mode={theme === 'light' ? 'light' : 'dark'} onClick={() => {setShowNotifications(prev => !prev)}}>
        <NotificationCounter style={notificationStyle}>{notificationNumber}</NotificationCounter>
        {notificationButtonSVG}
        <DashboardButtonTitle>Notifications</DashboardButtonTitle>
    </Button>
    :
    <Button role="dashboardMini" mode={theme === 'light' ? 'light' : 'dark'} onClick={() => {setShowNotifications(prev => !prev)}}>
        <NotificationCounter style={notificationStyle}>{notificationNumber}</NotificationCounter>
        {notificationButtonMiniSVG}
    </Button>
}

