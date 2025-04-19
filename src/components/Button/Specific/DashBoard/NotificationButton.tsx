import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";
import React, {Dispatch, SetStateAction} from "react";

type NotificationButtonProps = {
    showNotifications: boolean;
    setShowNotifications: Dispatch<SetStateAction<boolean>>
    numberOfNotifications: number;
}

export const NotificationButton:React.FC<NotificationButtonProps> = ({ setShowNotifications, showNotifications, numberOfNotifications }) => {
    
    const notificationButtonSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "size-6");
    const notificationButtonStyle = "items-center mx-auto w-14 h-14 bg-slate-400 text-white p-3 hover:outline hover:outline-4 hover:outline-offset-4 transition-all rounded-xl text-4xl";
    const activeNotificationButtonStyle = "items-center mx-auto w-14 h-14 bg-slate-100 text-slate-900 p-3 hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-slate-100 transition-all rounded-xl text-4xl";
    const notificationCounterStyle = "absolute top-0 right-1 -translate-y-1/2 z-20 bg-red-900 w-8 h-8 rounded-full my-auto text-center content-center text-slate-100";
    
    const notificationButtonOnClick = () => {
        setShowNotifications(!showNotifications);
    };

    return <div className="flex flex-col gap-y-2 relative">
        <p className={numberOfNotifications === 0 ? "hidden" : notificationCounterStyle }>{numberOfNotifications === 0 ? "" : numberOfNotifications}</p>
        <IconButton action={() => {notificationButtonOnClick()}} style={ showNotifications ? activeNotificationButtonStyle : notificationButtonStyle }>
            {notificationButtonSVG}
        </IconButton>
        <p className="tracking-wider text-center w-18 w-24 text-slate-100">Notifications</p>
    </div>
}
