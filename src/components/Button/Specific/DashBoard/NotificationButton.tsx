import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./DashBoardButton.module.css";
import { BUTTON } from "../../buttonStyles.ts";

type NotificationButtonProps = {    
    setShowNotifications: Dispatch<SetStateAction<boolean>>,
    numberOfNotifications: number,
    minimalView?: boolean
}

export const NotificationButton:React.FC<NotificationButtonProps> = ({ setShowNotifications, numberOfNotifications, minimalView=false }) => {
    
    const notificationButtonSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "size-6");
    const notificationButtonMiniSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "mx-auto size-6");    

    return minimalView ? <IconButton action={() => {setShowNotifications(prev => !prev)}} style={ BUTTON.dashboard }>
        <p className={numberOfNotifications === 0 ? "hidden" : styles['dashboard-notification-counter'] }>{numberOfNotifications === 0 ? "" : numberOfNotifications}</p>
        {notificationButtonMiniSVG}        
    </IconButton> 
    :
    <IconButton action={() => {setShowNotifications(prev => !prev)}} style={ BUTTON.dashboard }>
        <p className={numberOfNotifications === 0 ? "hidden" : styles['dashboard-notification-counter'] }>{numberOfNotifications === 0 ? "" : numberOfNotifications}</p>
        {notificationButtonSVG}
        <p className={BUTTON.dashboardButtonTitle}>Notifications</p>
    </IconButton>            
}
