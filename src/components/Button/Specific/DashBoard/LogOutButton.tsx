import { useAuth0 } from "@auth0/auth0-react";
import { createSvg } from "../../../../utils/htmlUtils";
import { IconButton } from "../../General/IconButton";
import styles from "./DashBoardButton.module.css";

export const LogOutButton = () => {
    
    const { logout } = useAuth0();
    const logOutAction = () => logout({ logoutParams: { returnTo: window.location.origin }});
    const logOutSVG = createSvg(['M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"'], 2, "size-6");

    return <div className={styles['dashboard-button-container']}>
        <IconButton action={logOutAction} ariaLabel='Log out' style={styles['dashboard-button']}>
            {logOutSVG}
        </IconButton>
        <p className={styles['dashboard-button-title']}>Log Out</p>
    </div>
}

