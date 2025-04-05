import {BasicButton} from "../components/Button/General/BasicButton.tsx";
import {useActivityContext} from "../context/Activity/ActivityContext.tsx";
import {PendingConnectionsComponent} from "../components/Activity/PendingConnectionsComponent.tsx";
import {UserPostsComponent} from "../components/Activity/UserPostsComponent.tsx";

export const ActivityPage = () => {
  const { category, switchCategory } = useActivityContext();
  const basicStyle = "p-4 text-2xl text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all my-auto font-medium tracking-widest";
  const activeStyle = "p-5 text-2xl text-slate-900 bg-slate-100 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all my-auto font-medium tracking-widest";
  
  return <div className={"flex flex-col w-full"}>
    <div className={"flex flex-row justify-around items-center p-10 bg-slate-800 h-fit w-full border-b-4"}>
      <h2 className={"tracking-widest text-3xl text-white"}>Activity</h2>
      <div className={"flex flex-row w-1/4 justify-evenly"}>
        <BasicButton style={category === "Posts" ? activeStyle : basicStyle} action={()=> {switchCategory("Posts")}} text={"Posts"} />
        <BasicButton style={category === "Requests" ? activeStyle : basicStyle} action={() => {switchCategory("Requests")}} text={"Requests"} />
      </div>
    </div>
      { category === "Requests" ? <PendingConnectionsComponent /> : <UserPostsComponent />}
  </div>
}