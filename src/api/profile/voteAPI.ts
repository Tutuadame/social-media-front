import { CreateVoteRequest } from "../../interface/profile/vote";
import { CONTENT_TYPE_JSON, GET_METHOD, POST_METHOD } from "../methods";
import { addVotePath, checkVotePath } from "./paths";

const addVoteErrorMessage = "Error creating a vote: ";
const checkVoteErrorMessage = "Error creating a vote: ";

export const addVote = async (createParams: CreateVoteRequest, accessToken: string) => {
    const {profileId, vote, postId} = createParams;
    try {
        const response = await fetch(addVotePath, {
            method: POST_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({
                profileId,
                vote,
                postId
            })
        });
        return response.json();
    } catch (e) {
        console.error(addVoteErrorMessage, (e as Error).message);
    }
};

export const checkVote = async (profileId: string, postId: number, accessToken: string) => {
    try {
        const response = await fetch(`${checkVotePath}/${profileId}/${postId}`, {
            method: GET_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
        });
        return response.json();
    } catch (e) {
        console.error(checkVoteErrorMessage, (e as Error).message);
    }
};