import { UpdateConnectionsStatusRequest } from "../../interface";
import { CheckConnectionRequest, CreateConnectionRequest } from "../../interface";
import { GetPageablePostsRequest } from "../../interface/profile/post";
import { CONTENT_TYPE_JSON, GET_METHOD, PATCH_METHOD, POST_METHOD } from "../methods";
import { createConnectionPath, getAcceptedConnectionsByUserPath, getPendingConnectionsByUserPath, isConnectedPath, updateConnectionPath } from "./paths";

const getPostByConnectionsErrorMessage = "Error receiving posts from connections: ";
const updateConnectionErrorMessage = "Error updating connection: ";
const createConnectionErrorMessage = "Error creating connection: ";
const isConnectedErrorMessage = "Error checking connection: ";

export const getAcceptedConnectionsByUser = async (profileId: string, accessToken: string) => {
    try {
      const response = await fetch(`${getAcceptedConnectionsByUserPath}/${profileId}`, {
        method: GET_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include"
      });

      return await response.json();
    } catch (e) {
      console.error(getPostByConnectionsErrorMessage, (e as Error).message);     
    }
};

export const getPendingConnectionsByUser = async (profileId: string, requestParams: GetPageablePostsRequest, accessToken: string) => {
  const { pageSize, pageNumber } = requestParams;
  
  const params = new URLSearchParams({
    profileId: profileId.toString(),
    pageSize: pageSize.toString(),
    pageNumber: pageNumber.toString(),
  });
  
  try {    
    const response = await fetch(`${getPendingConnectionsByUserPath}?${params.toString()}`, {
      method: GET_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include"
    });

    return await response.json();
  } catch (e) {
    console.error(getPostByConnectionsErrorMessage, (e as Error).message);     
  }
};

export const updateConnection = async (requestParams: UpdateConnectionsStatusRequest, accessToken: string) => {
    const { id, status } = requestParams;
    try {
      const response = await fetch(updateConnectionPath, {
        method: PATCH_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
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

export const createConnection = async (requestParams: CreateConnectionRequest, accessToken: string) => {
    const { initiatorId, targetId } = requestParams;
    try {
      const response = await fetch(createConnectionPath, {
        method: POST_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
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

export const checkConnectionStatus = async (requestParams: CheckConnectionRequest, accessToken: string) => {
  const { currentUserId, targetUserId } = requestParams;
  const params = new URLSearchParams({
    currentUserId: currentUserId.toString(),
    targetUserId: targetUserId.toString(),
  });

  try {
    const response = await fetch(`${isConnectedPath}?${params.toString()}`, {
      method: GET_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
    });
  return response.text();

  } catch (e) {
    console.error(isConnectedErrorMessage, (e as Error).message);
  }

}
