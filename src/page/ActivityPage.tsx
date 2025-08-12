import {BasicButton} from "../components/Button/General/BasicButton.tsx";
import {useActivityContext} from "../context/Activity/ActivityContext.tsx";
import {PendingConnectionsComponent} from "../components/Activity/PendingConnectionsComponent.tsx";
import {UserPostsComponent} from "../components/Activity/UserPostsComponent.tsx";
import {PAGE} from "./pageStyles.ts";

export const ActivityPage = () => {
  const { category, switchCategory } = useActivityContext();
  
  return <div className={PAGE.activityContainer}>
    <div className={PAGE.activityHeader}>
      <h2 className={PAGE.activityTitle}>Activity</h2>
      <div className={PAGE.activityButtonContainer}>
        <BasicButton style={category === "Posts" ? PAGE.activityActiveButton : PAGE.activityBasicButton} action={()=> {switchCategory("Posts")}} text={"Posts"} />
        <BasicButton style={category === "Requests" ? PAGE.activityActiveButton : PAGE.activityBasicButton} action={() => {switchCategory("Requests")}} text={"Requests"} />
      </div>
    </div>
      { category === "Requests" ? <PendingConnectionsComponent /> : <UserPostsComponent />}
  </div>
}