import { MessageResponse } from "../../interface/messageAPI";

export const getMessages = async (conversationId:number = 2, pageNumber = 0, pageSize = 10) => {
    try {      
      const callApi = await fetch(`http://social.media:8444/messageApi/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        pageNumber,
        pageSize
        }),
      });
      return callApi.json()
        .then((result) => {
          return result.content;
        });
    } catch (e) {
      console.error("Error fetching user conversations:", (e as Error).message);
    }
};

export const sendMessage = async (conversationId: number, senderId: string, content: string) : Promise<MessageResponse> => {
  try {
    const response = await fetch("http://social.media:8444/messageApi/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
        content,
        senderId,
        sentAt: new Date().toISOString().split(".")[0],
      }),
    });
    if (!response.ok) {      
      throw new Error(`HTTP error! Status: ${response.status}`);      
    }

    const result: MessageResponse = await response.json();
    return result;
  } catch (e) {
    console.error("Error sending message:", (e as Error).message);
    throw e;
  }
};

export const updateMessage = async (messageId: number, messageContent: string) => {
  try {
    const response = await fetch(`http://social.media:8444/messageApi/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageContent
      }),
    });
    if (!response.ok) {      
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: MessageResponse = await response.json();
    return result;
  } catch (e) {
    console.error("Error updating message:", (e as Error).message);
    throw e;
  }
};

export const deleteMessage = async (messageId: number) => {
  try {
    await fetch(`http://social.media:8444/messageApi/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (e) {
    console.error("Error deleting message:", (e as Error).message);
    throw e;
  }
};