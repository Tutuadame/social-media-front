import { useNavigate } from "react-router-dom";
import {useLayoutContext} from "../../../../context/Layout/LayoutOutContext.tsx";
import styles from "./DashBoardButton.module.css";

export const IdentityButton = () => {
    const navigate = useNavigate();
    const { userProfile } = useLayoutContext()

    const profileButtonOnClick = () => {
        navigate('/profile/social');
    };
    
    return <div className={styles['dashboard-button-container']}>
        <button className={styles['identity-button']} onClick={profileButtonOnClick}>
            <img className={styles['identity-pic']} src={userProfile.current.picture} alt={"Profile"}/>
        </button>
        <p className={styles['dashboard-button-title']}>Identity</p>
    </div>
}