import { User } from "@auth0/auth0-react";
import { deleteUserPath, getUserInfoPath, updateUserInfoPath } from "./paths";
import { CONTENT_TYPE_JSON, CONTENT_TYPE_TEXT, DELETE_METHOD, GET_METHOD, PATCH_METHOD } from "../methods";

const deleteUserErrorMessage = "Error while deleting user: ";
const getUserInfoErrorMessage = "Error fetching user data: ";
const updateUserInfoErrorMessage = "Error updating user data: ";

export const deleteAuth0User = async (profileId: string) => {
  try {
    const response = await fetch(`${deleteUserPath}/${profileId}`, {
      method: DELETE_METHOD,
      headers: CONTENT_TYPE_TEXT,
      credentials: "include"
    });
    console.log(response);

    return response.text();
  } catch (e) {
    console.error(deleteUserErrorMessage, (e as Error).message);
  }
};

export const getUserInfo = async (user: User) => {
    try {      
      const id = user?.sub?.split('|')[1];
      const response = await fetch(`${getUserInfoPath}/${id}`, {
        method: GET_METHOD,
        headers: CONTENT_TYPE_JSON,
        credentials: "include"
      });      
      return response.json();
    } catch (e) {
      console.error(getUserInfoErrorMessage, (e as Error).message);
    }
};

export const updateUserInfo = async (userId: string, key: string, value: string) => {
    try {
      const response = await fetch(`${updateUserInfoPath}/${userId}`, {
        method: PATCH_METHOD,
        headers: CONTENT_TYPE_JSON,
        credentials: "include",
        body: JSON.stringify({key, value})   
      });

      return response.text();
    } catch (e) {
      console.error(updateUserInfoErrorMessage, (e as Error).message);
    }
};