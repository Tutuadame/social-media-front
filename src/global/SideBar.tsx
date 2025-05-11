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

export const SideBar = () => {
  const sidebarMoverSVG = createSvg(['m8.25 4.5 7.5 7.5-7.5 7.5'], 2, "size-9");
  const [openSideBar, setOpenSideBar] = useState(true);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<KafkaNotification[]>([]);
  const { userProfile, userAccessToken, refetchProfile } = useLayoutContext();
  const notificationPageRef = useRef(0);

  const getSidebarStyles = (isOpen: boolean) => ({
    container: `relative transition-all bg-slate-800 h-[100vh] border-r-4 border-white shadow-md flex flex-col ${
      isOpen ? 'justify-start gap-y-12 p-6 w-3/12' : 'w-[3vw]'
    }`,
    toggleButton: `absolute top-1/2 right-0 translate-x-1/2 z-10 items-center w-14 h-14 bg-slate-800 text-white p-2 transition-all rounded-full
         outline outline-4 hover:outline-white hover:text-slate-800 hover:bg-slate-100 ${
      isOpen ? 'rotate-180' : ''
    }`,
    title: isOpen ? 'text-slate-100 mx-auto h-fit tracking-widest text-3xl' : 'hidden',
    nav: isOpen ? 'flex flex-row w-full transition-all h-fit gap-10 flex-wrap justify-evenly' : 'hidden',
    madeByStyle: isOpen ? "text-center tracking-widest content-end mt-auto text-slate-100" : "hidden",
    notificationContainer: isOpen && showNotifications ? "border-2 scrollbar-webkit scrollbar-thin bg-slate-100 p-5 m-auto w-10/12 rounded-xl shadow-xl max-h-[40vh] overflow-y-auto" : "hidden"
  });
  
  const notificationStyle = "bg-slate-100 border-4 p-2 border-slate-600 rounded-xl my-2";
  const notificationHeaderStyle = "text-slate-900 text-2xl text-center py-5 tracking-widest";
  const timeStyle = "text-slate-black rounded-xl text-right tracking-widest";
  const messageStyle = "text-slate-black p-3 rounded-xl text-left w-full mx-auto tracking-widest";
  
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

  const styles = getSidebarStyles(openSideBar);
  
  useEffect(() => {
    (async () => {
      await refetchProfile();
      await fetchNotifications();
    })()
  }, []); //Do not remove! Loads the user info!
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <nav className={styles.nav}>
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
      <div className={styles.notificationContainer}>
        <h2 className={notificationHeaderStyle}>Notifications</h2>
        {!isNotificationsLoading ? notifications?.map((notification, index) => {
          if(!notification) return null;
          return (
            <div
              className={notificationStyle}
              key={`notification-${index}-${notification.createdAt}`}
            >
              <div>
                <p className={timeStyle}>{getRelativeTime(notification.createdAt)}</p>
              </div>
              <p className={messageStyle}>{notification.message}</p>
            </div>
          );
        }) : <Loader />}
        <LoadMoreButton
          pageRef={notificationPageRef}
          callItems={callNotifications}
          style="transition-all p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
        />
      </div>
      <IconButton
        style={styles.toggleButton}
        action={() => setOpenSideBar(prev => !prev)}
        ariaLabel="move menu"
      >
        {sidebarMoverSVG}
      </IconButton>
      <MadeByMark style={styles.madeByStyle}/>
    </div>
  );
};
