import { UpdateConnectionsStatusRequest, UpdateConnectionStatusResponse } from "../../interface/profile/connection.ts";
import { getPendingConnectionsByUser, updateConnection } from "../../api/profile/connectionAPI.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { GetPageablePostsRequest } from "../../interface/profile/post.ts";
import { useActivityContext } from "../../context/Activity/ActivityContext.tsx";
import {createSvg, handleArrayMutation} from "../../utils/htmlUtils.tsx";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext.tsx";
import {useQuery} from "react-query";
import {useEffect} from "react";
import { ProfileResponse } from "../../interface/profile/profile.ts";
import { Button } from "../Button/buttonStyles.ts";
import { ProfileButton } from "../Button/Specific/ProfileButton.tsx";
import { LoadMoreButton } from "../Button/Specific/LoadMoreButton.tsx";

export const PendingConnectionsComponent = () => {
    const { userAccessToken, refetchConnections } = useLayoutContext();
    const { requestPage, pendingConnections, setPendingConnections } = useActivityContext();
    const { user } = useAuth0();
    const currentId = user?.sub?.split('|')[1] || "no-id";
    const pageSize = 10;
    const checkSVG = createSvg(["m4.5 12.75 6 6 9-13.5"], 1, "size-7");
    const exitButtonSVG = createSvg(["M6 18 18 6M6 6l12 12"], 1, "size-7");
    const ACCEPTED_STATUS = "ACCEPTED";
    const BLOCKED_STATUS = "BLOCKED";

    const callUpdateConnection = async (connectionId: number, status: string) => {
      const request: UpdateConnectionsStatusRequest = {id: connectionId, status: status };
      const response: UpdateConnectionStatusResponse = await updateConnection(request, userAccessToken).then(result => result);
      setPendingConnections(pendingConnections.filter(connection => connection.id !== response.id));
      await refetchConnections();
    }

    async function callUserPendingConnections() {
      const pageable: GetPageablePostsRequest = {pageNumber: requestPage.current, pageSize: pageSize}
      const response = await getPendingConnectionsByUser(currentId, pageable, userAccessToken).then(response => response.content);
      handleArrayMutation(setPendingConnections, requestPage.current, response);
    }
    
    useQuery({
      queryFn: async () => await callUserPendingConnections(),
      queryKey: "getPageableRequest",
    });
  
  useEffect(() => {
    requestPage.current = 0;
  }, []);

    return (
      <div className="flex flex-col w-full mx-auto mt-5 h-[80vh]">
        <h2 className="text-white m-auto text-center h-fit w-fit text-4xl p-3 mt-10 mb-20 tracking-widest">Pending Connections</h2>

        {pendingConnections.length !== 0 ?
        <div className={"overflow-auto"}> {pendingConnections?.map((connection) => {
          const profile : ProfileResponse = {
            id: connection.profileId,
            firstName: connection.firstName,
            lastName: connection.lastName,
            picture: connection.picture
          }
          return (
            <div key={connection.id} className="flex flex-row gap-y-10 gap-x-16 m-auto mb-[2vh] justify-center bg-slate-900 p-5 rounded-xl w-fit">
              <ProfileButton profile={profile}/>
              <div className="flex flex-row gap-x-3">
                <Button onClick={async () => { await callUpdateConnection(connection.id, ACCEPTED_STATUS)}}> {checkSVG} </Button>
                <Button onClick={async () => { await callUpdateConnection(connection.id, BLOCKED_STATUS)}}> {exitButtonSVG} </Button>
              </div>
            </div>
          );
        })}
        
        <LoadMoreButton pageRef={requestPage} callItems={callUserPendingConnections}/>
        </div>
        : <h3 className="text-white m-auto text-center h-fit w-fit text-2xl p-3 mt-10 mb-20 tracking-widest"> No more requests for now! </h3>}
      </div>
    );
};