import { ResponseMessage } from './../../interface/ResponseMessage';
import { User } from "@auth0/auth0-react";

export const deleteUser = async (user:User) => {
    try {      
        const id = user?.sub?.split('|')[1];
        const response:ResponseMessage = await fetch(`https://social.media:8443/api/delete-profile/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }            
        })
        .then((result) => result.json())
        .catch((err) => new Error(`HTTP error! ${err}`));
    
      console.log(response.content);
      return response;
    } catch (e) {
        console.error("Error fetching user data:", (e as Error).message);      
    }
};