import { NotificationButton, SideBarButton } from '../components';
import { handleArrayMutation } from '../utils/htmlUtils';
import { useEffect, useRef, useState } from 'react';
import { KafkaNotification } from "../interface/notification/kafkaNotification.ts";
import { listNotifications } from "../api/notifications/notificationApi.ts";
import { useLayoutContext } from "../context/Layout/LayoutOutContext.tsx";
import { useQuery } from "react-query";
import styles from "./Global.module.css";
import { NOTIFICATIONS, SIDEBAR } from './globalStyle.ts';
import { NotificationsWindow } from './NotificationsWindow.tsx';
import { useTheme } from '../context/Theme/ThemeContext.tsx';
import { DashboardButton } from '../components/Button/General/DashBoardButton.tsx';
import { activityButtonMiniSVG, activityButtonSVG, eventButtonMiniSVG, eventButtonSVG, homeButtonMiniSVG, homeButtonSVG, identityButtonMiniSVG, identityButtonSVG, lightMiniSVG, lightSVG, logOutMiniSVG, logOutSVG } from '../assets/svg.ts';
import { useAuth0 } from '@auth0/auth0-react';

export const SideBar = () => {
  const {toggleTheme, toggleDashboard, isDashboardOpen, theme} = useTheme();
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<KafkaNotification[]>([]);
  const { userProfile, userAccessToken, refetchProfile } = useLayoutContext();
  const notificationPageRef = useRef(0);
  const { logout } = useAuth0();
  const logOutAction = () => logout({ logoutParams: { returnTo: window.location.origin }});

  const getSidebarStyles = (isOpen: boolean) => ({
    container: isOpen ? SIDEBAR.openContainer : SIDEBAR.closedContainer,
    title: isOpen ? SIDEBAR.titleOpen : SIDEBAR.titleClose,
    nav: isOpen ? `${styles['nav-open']}` : `${styles['hide']}`,
    madeByStyle: isOpen ? `${styles['made-by']}` : `${styles['hide']}`,
    notificationContainer: isOpen && showNotifications ? NOTIFICATIONS.containerOpen : NOTIFICATIONS.containerClose,
    main: isOpen ? SIDEBAR.openMain : SIDEBAR.closedMain,
    titleContainer: isOpen ? SIDEBAR.titleContainerOpen : SIDEBAR.titleContainerClosed
  });
  
  async function callNotifications() {
    try {
      const response = await listNotifications(userProfile.current.id, notificationPageRef.current, 10, userAccessToken).then(result => result.content);
      handleArrayMutation(setNotifications, notificationPageRef.current, response);
      notifications?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } catch (e) {
      console.log(e);
    }
  }
  
  const { isLoading: isNotificationsLoading, refetch: fetchNotifications } = useQuery({
    queryFn: async  () => await callNotifications(),
    queryKey: "setNotifications",
    enabled: showNotifications
  });

  const dynamicStyles = getSidebarStyles(isDashboardOpen);
  
  useEffect(() => {
    (async () => {
      await refetchProfile();
      await fetchNotifications();
    })()
  }, []); //Do not remove! Loads the user info!
  
  return (
    <div className={dynamicStyles.main}>
      <div className={dynamicStyles.titleContainer}>
        <h1 className={dynamicStyles.title}>Dashboard</h1>
      </div>
      <div className={dynamicStyles.container}>
        <nav className={dynamicStyles.nav}>
          <DashboardButton key="IdentityButton" title='Identity' regularSVG={identityButtonSVG} miniSVG={identityButtonMiniSVG} navigateTo='/profile/social'/>
          <DashboardButton key="HomeButton" title='Home' regularSVG={homeButtonSVG} miniSVG={homeButtonMiniSVG} navigateTo='/'/>
          <DashboardButton key="ActivityButton" title='Activity' regularSVG={activityButtonSVG} miniSVG={activityButtonMiniSVG} navigateTo='/profile/activity'/>
          <DashboardButton key="EventButton" title='Events' regularSVG={eventButtonSVG} miniSVG={eventButtonMiniSVG} navigateTo='/'/>
          <DashboardButton key="ThemeToggleButton" title='Light' regularSVG={lightSVG} miniSVG={lightMiniSVG} onClick={toggleTheme}/>
          <DashboardButton key="LogOutButton" title='Log Out' regularSVG={logOutSVG} miniSVG={logOutMiniSVG} onClick={logOutAction}/>
          <NotificationButton key="NotificationButton" setShowNotifications={setShowNotifications} numberOfNotifications={notifications?.length || 0}/>
        </nav>
        <NotificationsWindow
          notifications={notifications}
          isNotificationsLoading={isNotificationsLoading}
          notificationPageRef={notificationPageRef}
          callNotifications={callNotifications}
          containerStyle={dynamicStyles.notificationContainer}
        />
      </div>
      <div className='bg-blue-200 hover:bg-orange-300 transition-all'>
        <SideBarButton openSideBar={isDashboardOpen} setOpenSideBar={toggleDashboard}/>
      </div>
      
    </div>
  );
};

