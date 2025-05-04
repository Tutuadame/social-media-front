import { deleteUserPath, updateUserInfoPath } from "./paths";
import { CONTENT_TYPE_JSON, CONTENT_TYPE_TEXT, DELETE_METHOD, PATCH_METHOD } from "../methods";

const deleteUserErrorMessage = "Error while deleting user: ";
const updateUserInfoErrorMessage = "Error updating user data: ";

export const deleteAuth0User = async (profileId: string, accessToken: string) => {
  try {
    const response = await fetch(`${deleteUserPath}/${profileId}`, {
      method: DELETE_METHOD,
      headers: {
        ...CONTENT_TYPE_TEXT,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include"
    });

    return response.text();
  } catch (e) {
    console.error(deleteUserErrorMessage, (e as Error).message);
  }
};

export const updateUserInfo = async (userId: string, key: string, value: string, accessToken: string) => {
    try {
      const response = await fetch(`${updateUserInfoPath}/${userId}`, {
        method: PATCH_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify({ key, value })
      });

      return response.text();
    } catch (e) {
      console.error(updateUserInfoErrorMessage, (e as Error).message);
    }
};