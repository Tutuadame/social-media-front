import {useActivityContext} from "../context/Activity/ActivityContext.tsx";
import {PendingConnectionsComponent} from "../components/Activity/PendingConnectionsComponent.tsx";
import {UserPostsComponent} from "../components/Activity/UserPostsComponent.tsx";
import { PAGE } from "./pageStyles.ts";
import { Button } from "../components/Button/buttonStyles.ts";

export const ActivityPage = () => {
  const { category, switchCategory } = useActivityContext();
  
  return <div className={PAGE.activityContainer}>
    <div className={PAGE.activityHeader}>
      <h2 className={PAGE.activityTitle}>Activity</h2>
      <div className={PAGE.activityButtonContainer}>
        <Button onClick={()=> {switchCategory("Posts")}}>Posts</Button>
        <Button onClick={()=> {switchCategory("Requests")}}>Requests</Button>
      </div>
    </div>
      { category === "Requests" ? <PendingConnectionsComponent /> : <UserPostsComponent />}
  </div>
}