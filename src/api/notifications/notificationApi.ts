import {CONTENT_TYPE_JSON, GET_METHOD} from "../methods.ts";

const listNotificationsPath = "https://localhost:8446/notificationApi/notifications";

export const listNotifications = async (userId: string, pageNumber:number, pageSize:number, accessToken: string) => {
  
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    userId: userId,
  });
  
  try {
    const response = await fetch(`${listNotificationsPath}?${params.toString()}`, {
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      method: GET_METHOD,
      credentials: "include",
    });
    
    return response.json();
  } catch (e) {
    console.error((e as Error).message);
  }
}