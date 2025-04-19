import { useEffect, useState } from "react";
import { UpdateConnectionsStatusRequest, UpdateConnectionStatusResponse } from "../../interface/profile/connection.ts";
import { getPendingConnectionsByUser, updateConnection } from "../../api/profile/connectionAPI.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { GetPageablePostsRequest } from "../../interface/profile/post.ts";
import { useActivityContext } from "../../context/Activity/ActivityContext.tsx";
import { IconButton } from "../Button/General/IconButton.tsx";
import { createSvg } from "../../utils/htmlUtils.tsx";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext.tsx";
import { LoadMoreButton } from "../Button/General/LoadMoreButton.tsx";
import { ProfileButton } from "../Button/Specific/Global/ProfileButton.tsx";
import { ConversationMember } from "../../interface/communication/member.ts";

export const PendingConnectionsComponent = () => {
    const { connections, setConnections, accessToken} = useLayoutContext();
    const { tablePage } = useActivityContext();
    const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center");
    const { user } = useAuth0();
    const currentId = user?.sub?.split('|')[1] || "no-id";
    const pageSize = 10;    
    const optionStyle = "flex items-center w-16 h-16 bg-slate-100 text-slate-900 p-2 transition rounded-xl my-auto hover:bg-slate-900 hover:text-slate-100 hover:outline";    
    const checkSVG = createSvg(["m4.5 12.75 6 6 9-13.5"], 1, "size-7");
    const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-7");
    const ACCEPTED_STATUS = "ACCEPTED";
    const BLOCKED_STATUS = "BLOCKED";

    const callUpdateConnection = async (connectionId: number, status: string) => {
      const request: UpdateConnectionsStatusRequest = {
          id: connectionId,
          status: status,
      };
      if (connections) {
          const response: UpdateConnectionStatusResponse = await updateConnection(request, accessToken.current).then(result => result);
          setConnections(connections.filter(con => con.id !== response.id));
      } else {
          throw new Error("connections are undefined!");
      }        
    }

    async function callUserPendingConnections() {
      const pageable: GetPageablePostsRequest = {
        pageNumber: tablePage.current,
        pageSize: pageSize,
      }
      const response = await getPendingConnectionsByUser(currentId, pageable, accessToken.current).then(response => response.content);
      if (response.length < 10) {
        setLoadMoreStyle("flex justify-center hidden");
      } else {
        tablePage.current += 1;
      }

      if (connections && tablePage.current >= 1) {
        setConnections([...response, ...connections]);
      } else {
        setConnections([...response]);
      }
    }

    useEffect(() => {
      setConnections([]);
      setLoadMoreStyle("flex justify-center");        
      callUserPendingConnections();
    }, [])

    return (
      <div className="flex flex-col w-full mx-auto mt-5 h-[80vh]">
        <h2 className="text-white m-auto text-center h-fit w-fit text-4xl p-3 mt-10 mb-20 tracking-widest">Pending Connections</h2>

        {connections?.length !== 0 ? 
        <div className={"overflow-auto"}> {connections?.map((connection) => {
          const cM : ConversationMember = {
            id: connection.profileId,
            firstName: connection.firstName,
            lastName: connection.lastName,
            picture: connection.picture
          }
          return (
            <div className="flex flex-row gap-y-10 gap-x-16 m-auto mb-[2vh] justify-center bg-slate-900 p-5 rounded-xl w-fit">
              <ProfileButton profile={cM}/>              
              <div className="flex flex-row gap-x-3">
                <IconButton style={optionStyle} action={() => {callUpdateConnection(connection.id, ACCEPTED_STATUS)}}> {checkSVG} </IconButton>
                <IconButton style={optionStyle} action={() => {callUpdateConnection(connection.id, BLOCKED_STATUS)}}> {exitButtonSVG} </IconButton>
              </div>              
            </div>            
          );
        })}
        
        <LoadMoreButton
            callItems={callUserPendingConnections}
            loadMoreStyle={loadMoreStyle}
            style="transition-all p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"              
          />
        </div>
        : <h3 className="text-white m-auto text-center h-fit w-fit text-2xl p-3 mt-10 mb-20 tracking-widest"> Nobody added you yet! </h3>}
      </div>
    );
};