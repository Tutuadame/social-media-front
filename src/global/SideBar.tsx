import { ActivityButton, HomeButton, LogOutButton, MessagesButton, NotificationButton, IdentityButton } from '../components';
import { IconButton } from '../components/Button/General/IconButton';
import {createSvg, getRelativeTime, handleArrayMutation} from '../utils/htmlUtils';
import {useEffect, useRef, useState} from 'react';
import { MadeByMark } from './MadeByMark';
import {KafkaNotification} from "../interface/notification/kafkaNotification.ts";
import {listNotifications} from "../api/notifications/notificationApi.ts";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {LoadMoreButton} from "../components/Button/General/LoadMoreButton.tsx";
import {useQuery} from "react-query";
import {Loader} from "../components/General/Loader.tsx";
import styles from "./Global.module.css";

export const SideBar = () => {
  const sidebarMoverSVG = createSvg(['m8.25 4.5 7.5 7.5-7.5 7.5'], 2, "size-9");
  const [openSideBar, setOpenSideBar] = useState(true);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<KafkaNotification[]>([]);
  const { userProfile, userAccessToken, refetchProfile } = useLayoutContext();
  const notificationPageRef = useRef(0);

  const getSidebarStyles = (isOpen: boolean) => ({
    container: isOpen ? `${styles['sidebar-container-open']}` : `${styles['sidebar-container-close']}`,
    toggleButton: isOpen ? `${styles['toggle-button-open']}`: '',
    title: isOpen ? `${styles['title-open']}` : `${styles['hide']}`,
    nav: isOpen ? `${styles['nav-open']}` : `${styles['hide']}`,
    madeByStyle: isOpen ? `${styles['made-by']}` : `${styles['hide']}`,
    notificationContainer: isOpen && showNotifications ? `${styles['notification-container']}` : `${styles['hide']}`
  });  
  
  async function callNotifications() {
    const response = await listNotifications(userProfile.current.id, notificationPageRef.current, 10, userAccessToken).then(result => result.content);
    handleArrayMutation(setNotifications, notificationPageRef.current, response);
    notifications?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  
  const { isLoading: isNotificationsLoading, refetch: fetchNotifications } = useQuery({
    queryFn: async  () => await callNotifications(),
    queryKey: "setNotifications",
    enabled: showNotifications
  })

  const dynamicStyles = getSidebarStyles(openSideBar);
  
  useEffect(() => {
    (async () => {
      await refetchProfile();
      await fetchNotifications();
    })()
  }, []); //Do not remove! Loads the user info!
  
  return (
    <div className={dynamicStyles.container}>
      <h1 className={dynamicStyles.title}>Dashboard</h1>
      <nav className={dynamicStyles.nav}>
        <IdentityButton key="IdentityButton"/>
        <LogOutButton key="LogOutButton"/>
        <HomeButton key="HomeButton"/>
        <ActivityButton key="ActivityButton"/>
        <MessagesButton key="MessagesButton"/>
        <NotificationButton
          key="NotificationButton"
          setShowNotifications={setShowNotifications}
          showNotifications={showNotifications}
          numberOfNotifications={notifications?.length || 0}
        />
      </nav>
      <div className={dynamicStyles.notificationContainer}>
        <h2 className={styles['notification-header']}>Notifications</h2>
        {!isNotificationsLoading ? notifications?.map((notification, index) => {
          if(!notification) return null;
          return (
            <div
              className={styles['notification-style']}
              key={`notification-${index}-${notification.createdAt}`}
            >
              <div>
                <p className={styles['time']}>{getRelativeTime(notification.createdAt)}</p>
              </div>
              <p className={styles['notification-message']}>{notification.message}</p>
            </div>
          );
        }) : <Loader />}
        <LoadMoreButton
          pageRef={notificationPageRef}
          callItems={callNotifications}
          style={styles['load-more']}
        />
      </div>
      <IconButton
        style={dynamicStyles.toggleButton}
        action={() => setOpenSideBar(prev => !prev)}
        ariaLabel="move menu"
      >
        {sidebarMoverSVG}
      </IconButton>
      <MadeByMark style={dynamicStyles.madeByStyle}/>
    </div>
  );
};
