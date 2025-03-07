import { User } from "@auth0/auth0-react";

export const getUserInfo = async (user:User) => {
    try {      
      const id = user?.sub?.split('|')[1];
      const callApi = await fetch(`https://social.media:8443/api/profile/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        
      });      
      return callApi.json();
    } catch (e) {
      console.error("Error fetching user data:", (e as Error).message);      
    }
};