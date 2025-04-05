import { CreateProfileRequest, SearchForProfileRequest } from "../../interface/profile/profile";
import { CONTENT_TYPE_JSON, CONTENT_TYPE_TEXT, DELETE_METHOD, GET_METHOD, PATCH_METHOD, POST_METHOD } from "../methods";
import { deleteProfilePath, getProfilePath, profileRegistrationPath, searchForProfilesPath, updateProfileIntroductionPath } from "./paths";

const getProfileErrorMessage = "Error getting user profile: ";
const updateIntroductionErrorMessage = "Error updating user introduction: ";
const createProfileErrorMessage = "Error creating user profile: ";

export const createProfile = async (requestParams: CreateProfileRequest) => {
    const { profileId, firstName, lastName, gender } = requestParams;
    try {
        const response = await fetch(profileRegistrationPath, {
            headers: CONTENT_TYPE_JSON,
            method: POST_METHOD,
            credentials: "include",
            body: JSON.stringify({ profileId, firstName, lastName, gender })
        });
        
        return response.json();
    } catch (e) {
        console.error(createProfileErrorMessage, (e as Error).message);
    }
}

export const getProfile = async (id: string) => {
    try {
        const response = await fetch(`${getProfilePath}/${id}`, {
            method: POST_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
        });

        return response.json();
    } catch (e) {
        console.error(getProfileErrorMessage, (e as Error).message);
    }
};

export const deleteProfile = async (id: string) => {
    try {
        const response = await fetch(`${deleteProfilePath}/${id}`, {
            method: DELETE_METHOD,
            headers: CONTENT_TYPE_TEXT,
            credentials: "include",
        });

        return response.text();
    } catch (e) {
        console.error(getProfileErrorMessage, (e as Error).message);
    }
};

export const updateIntroduction = async (id: string, introduction: string) => {

    try {
        const response = await fetch(`${updateProfileIntroductionPath}/${id}`, {
            method: PATCH_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
            body: JSON.stringify({introduction})
        });

        return response.json().then(result => result);
    } catch (e) {
        console.error(updateIntroductionErrorMessage, (e as Error).message);
    }
};

export const searchForProfiles = async (requestParams: SearchForProfileRequest) => {
    const params = new URLSearchParams({
        pageNumber: requestParams.pageNumber.toString(),
        pageSize: requestParams.pageSize.toString(),
        name: requestParams.name.toString(),
    });

    try {
        const response = await fetch(`${searchForProfilesPath}?${params.toString()}`, {
            method: GET_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
        });

        return response.json();
    } catch (e) {
        console.error(updateIntroductionErrorMessage, (e as Error).message);
    }
}