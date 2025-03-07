import { User } from "@auth0/auth0-react";

export const getConversations = async (user : User, pageNumber = 0, pageSize = 10) => {
    try {      
      const memberId = user?.sub?.split('|')[1];      
      const callApi = await fetch(`http://social.media:8444/conversationApi/conversations/${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{ 
        "pageNumber": ${pageNumber},
        "pageSize": ${pageSize}
        }`,
      });
      return callApi.json()
        .then((result) => result.content);
    } catch (e) {
      console.error("Error fetching user conversations:", (e as Error).message);
    }
};

export const updateConversationName = async (conversationId: number, name: string) => {
  try{
    const callApi = await fetch(`http://social.media:8444/conversationApi/naming/${conversationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name
      })      
    });
    return callApi.json()
      .then((result) => result);
  } catch (e){
    console.error("Error updating user conversation:", (e as Error).message); 
  }
};

export const deleteConversation = async (conversationId: number) => {
  try{
    await fetch(`http://social.media:8444/conversationApi/${conversationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });    
  } catch (e){
    console.error("Error deleting user conversation:", (e as Error).message);
  }
};