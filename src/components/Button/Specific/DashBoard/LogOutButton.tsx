import { useAuth0 } from "@auth0/auth0-react";
import { createSvg } from "../../../../utils/htmlUtils";
import { IconButton } from "../../General/IconButton";
import { BUTTON } from "../../buttonStyles";

export const LogOutButton = () => {
    
    const { logout } = useAuth0();
    const logOutAction = () => logout({ logoutParams: { returnTo: window.location.origin }});
    const logOutSVG = createSvg(['M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"'], 2, "size-6");

    return <IconButton action={logOutAction} ariaLabel='Log out' style={BUTTON.dashboard}>
        {logOutSVG}
        <p className={BUTTON.dashboardButtonTitle}>Log Out</p>
    </IconButton>
}

