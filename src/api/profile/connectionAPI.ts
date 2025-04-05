import { UpdateConnectionsStatusRequest } from "../../interface/index";
import { CheckConnectionRequest, CreateConnectionRequest } from "../../interface/profile/connection";
import { GetPageablePostsRequest } from "../../interface/profile/post";
import { CONTENT_TYPE_JSON, GET_METHOD, PATCH_METHOD, POST_METHOD } from "../methods";
import { createConnectionPath, getAcceptedConnectionsByUserPath, getPendingConnectionsByUserPath, isConnectedPath, updateConnectionPath } from "./paths";

const getPostByConnectionsErrorMessage = "Error receiving posts from connections: ";
const updateConnectionErrorMessage = "Error updating connection: ";
const createConnectionErrorMessage = "Error creating connection: ";
const isConnectedErrorMessage = "Error checking connection: ";

export const getAcceptedConnectionsByUser = async (profileId: string) => {    
    try {
      const response = await fetch(`${getAcceptedConnectionsByUserPath}/${profileId}`, {
        method: POST_METHOD,
        headers: CONTENT_TYPE_JSON,
        credentials: "include",
        body: JSON.stringify({
          profileId,
        })
      });

      return await response.json();
    } catch (e) {
      console.error(getPostByConnectionsErrorMessage, (e as Error).message);     
    }
};

export const getPendingConnectionsByUser = async (profileId: string, requestParams: GetPageablePostsRequest) => {    
  const {pageSize, pageNumber} = requestParams;
  try {    
    const response = await fetch(`${getPendingConnectionsByUserPath}/${profileId}`, {
      method: POST_METHOD,
      headers: CONTENT_TYPE_JSON,
      credentials: "include",
      body: JSON.stringify({
        pageSize,
        pageNumber
      })
    });

    return await response.json();
  } catch (e) {
    console.error(getPostByConnectionsErrorMessage, (e as Error).message);     
  }
};

export const updateConnection = async (requestParams: UpdateConnectionsStatusRequest) => {
    const { id, status } = requestParams;
    try {
      const response = await fetch(updateConnectionPath, {
        method: PATCH_METHOD,
        headers: CONTENT_TYPE_JSON,
        credentials: "include",
        body: JSON.stringify({
          id,
          status            
        })
      });
      return response.json();

    } catch (e) {
      console.error(updateConnectionErrorMessage, (e as Error).message);      
    }
};

export const createConnection = async (requestParams: CreateConnectionRequest) => {
    const { initiatorId, targetId } = requestParams;
    try {
      const response = await fetch(createConnectionPath, {
        method: POST_METHOD,
        headers: CONTENT_TYPE_JSON,
        credentials: "include",
        body: JSON.stringify({
          initiatorId,
          targetId
        })
      });
    return response.json();

    } catch (e) {
      console.error(createConnectionErrorMessage, (e as Error).message);
    }
};

export const checkConnectionStatus = async (requestParams: CheckConnectionRequest) => {
  const { currentUserId, targetUserId } = requestParams;
  const params = new URLSearchParams({
    currentUserId: currentUserId.toString(),
    targetUserId: targetUserId.toString(),
  });

  try {
    const response = await fetch(`${isConnectedPath}?${params.toString()}`, {
      method: GET_METHOD,
      headers: CONTENT_TYPE_JSON,
      credentials: "include",
    });
  return response.text();

  } catch (e) {
    console.error(isConnectedErrorMessage, (e as Error).message);
  }

}
