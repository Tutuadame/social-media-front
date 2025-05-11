import {CONTENT_TYPE_JSON, DELETE_METHOD, GET_METHOD, PATCH_METHOD, POST_METHOD} from "../methods";
import { deleteMessagePath, getMessagesPath, sendMessagePath, updateMessagePath } from "./paths";

const getMessagesErrorMessage = "Error fetching conversation messages: ";
const sendMessageErrorMessage = "Error sending message: ";
const updateMessageErrorMessage = "Error updating message: ";

export const getMessages = async (conversationId:string = "2", accessToken: string, pageNumber = 0, pageSize = 10) => {
    
    const params = new URLSearchParams({
      conversationId:conversationId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    });
  
    try {
      const response = await fetch(`${getMessagesPath}/?${params.toString()}`, {
        method: GET_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
      });

      return response.json()
        .then((result) => {return result.content});
    } catch (e) {
      console.error(getMessagesErrorMessage, (e as Error).message);
    }
};

export const sendMessage = async (conversationId: string, senderId: string, content: string, accessToken: string) => {
  try {
    const response = await fetch(sendMessagePath, {
      method: POST_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify({
        conversationId,
        content,
        senderId
      })
    });

    return response.json().then(result => result);    
  } catch (e) {
    console.error(sendMessageErrorMessage, (e as Error).message);    
  }
};

export const updateMessage = async (messageId: number, messageContent: string, accessToken: string) => {
  try {
    const response = await fetch(`${updateMessagePath}/${messageId}`, {
      method: PATCH_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify({
        messageContent
      }),
    });

    return response.json();    
  } catch (e) {
    console.error(updateMessageErrorMessage, (e as Error).message);    
  }
};

export const deleteMessage = async (messageId: number, accessToken: string) => {
  try {
    await fetch(`${deleteMessagePath}/${messageId}`, {
      method: DELETE_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
    });
  } catch (e) {
    console.error("Error deleting message:", (e as Error).message);    
  }
};