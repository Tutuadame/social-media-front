import { MutableRefObject } from "react";
import { LoadMoreButton } from "../components/Button/General/LoadMoreButton";
import { Loader } from "../components/General/Loader";
import { KafkaNotification } from "../interface/notification/kafkaNotification";
import { getRelativeTime } from "../utils/htmlUtils";
import styles from "./Global.module.css";

type NotificationsWindowProps = {
  notifications: KafkaNotification[],
  isNotificationsLoading: boolean,
  notificationPageRef: MutableRefObject<number>,
  callNotifications: () => void,
  containerStyle: string
}

export const NotificationsWindow: React.FC<NotificationsWindowProps> = ({notifications, isNotificationsLoading, notificationPageRef, callNotifications, containerStyle}) => {

  
  return <div className={containerStyle}>
    <h2 className={styles['notification-header']}>Notifications</h2>
    {!isNotificationsLoading ? notifications?.map((notification, index) => {
      if(!notification) return null;
      return (
        <div
          className={styles['notification-style']}
          key={`notification-${index}-${notification.createdAt}`}
        >
          <div>
            <p className={styles['relative-time']}>{getRelativeTime(notification.createdAt)}</p>
          </div>
          <p className={styles['notification-message']}>{notification.message}</p>
        </div>
      );
    }) : <Loader />}
    <LoadMoreButton pageRef={notificationPageRef} callItems={callNotifications} />
  </div>
}