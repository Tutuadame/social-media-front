import { ActivityButton, HomeButton, LogOutButton, NotificationButton, IdentityButton, SideBarButton } from '../components';
import { handleArrayMutation, getRelativeTime} from '../utils/htmlUtils';
import {useEffect, useRef, useState} from 'react';
import {KafkaNotification} from "../interface/notification/kafkaNotification.ts";
import {listNotifications} from "../api/notifications/notificationApi.ts";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {useQuery} from "react-query";
import styles from "./Global.module.css";
import { NOTIFICATIONS, SIDEBAR } from './globalStyle.ts';
import { NotificationsWindow } from './NotificationsWindow.tsx';
import { EventButton } from '../components/Button/Specific/DashBoard/EventsButton.tsx';
import { ThemeToggleButton } from '../components/Button/Specific/Global/ThemeToggleButton.tsx';

export const SideBar = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<KafkaNotification[]>([]);
  const { userProfile, userAccessToken, refetchProfile } = useLayoutContext();
  const notificationPageRef = useRef(0);

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
    const response = await listNotifications(userProfile.current.id, notificationPageRef.current, 10, userAccessToken).then(result => result.content);
    handleArrayMutation(setNotifications, notificationPageRef.current, response);
    notifications?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  
  const { isLoading: isNotificationsLoading, refetch: fetchNotifications } = useQuery({
    queryFn: async  () => await callNotifications(),
    queryKey: "setNotifications",
    enabled: showNotifications
  });

  const dynamicStyles = getSidebarStyles(openSideBar);
  
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
          <IdentityButton key="IdentityButton"/>
          <HomeButton key="HomeButton"/>
          <ActivityButton key="ActivityButton"/>
          <NotificationButton
            key="NotificationButton"
            setShowNotifications={setShowNotifications}
            numberOfNotifications={notifications?.length || 0}
          />
          <EventButton key="EventButton"/>
          <ThemeToggleButton key="ThemeToggleButton"/>
          <LogOutButton key="LogOutButton"/>
        </nav>
        <NotificationsWindow
          notifications={notifications}
          isNotificationsLoading={isNotificationsLoading}
          notificationPageRef={notificationPageRef}
          callNotifications={callNotifications}
          containerStyle={dynamicStyles.notificationContainer}
        />
        <SideBarButton openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        {openSideBar ?
          <></>
        :
        <>
          <IdentityButton key="IdentityButton" minimalView={true}/>
          <ActivityButton key="ActivityButton" minimalView={true}/>
          <HomeButton key="HomeButton" minimalView={true}/>
          <NotificationButton
            key="NotificationButton"
            setShowNotifications={setShowNotifications}
            numberOfNotifications={notifications?.length || 0}
            minimalView={true}
          />
          <EventButton key="EventButton" minimalView={true}/>
        </>}
      </div>
    </div>
  );
};
