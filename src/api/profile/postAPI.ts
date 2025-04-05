import { User } from "@auth0/auth0-react";
import { CreatePostRequest, GetPageablePostsRequest } from "../../interface/profile/post";
import { CONTENT_TYPE_JSON, DELETE_METHOD, POST_METHOD } from "../methods";
import { createPostPath, deletePostPath, getConnectionPostsPath, getProfilePostsPath } from "./paths";

const getConnectionPostsErrorMessage = "Error getting posts from connections: ";
const getProfilePostsErrorMessage = "Error getting user posts: ";
const createPostErrorMessage = "Error creating the post: ";
const deletePostErrorMessage = "Error deleting the post: ";

export const getConnectionPosts = async (user: User, requestParams: GetPageablePostsRequest) => {
    const id = user?.sub?.split("|")[1];
    const { pageNumber, pageSize } = requestParams;

    try {        
        const response = await fetch(`${getConnectionPostsPath}/${id}`, {
            method: POST_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
            body: JSON.stringify({pageNumber, pageSize})
        });
    
        return response.json();
    } catch (e) {
        console.error(getConnectionPostsErrorMessage, (e as Error).message);
    }
};

export const getProfilePosts = async (id: string, requestParams: GetPageablePostsRequest) => {    
    const { pageNumber, pageSize } = requestParams;

    try {
        const response = await fetch(`${getProfilePostsPath}/${id}`, {
            method: POST_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
            body: JSON.stringify({pageNumber, pageSize})
        });

        return response.json();
    } catch (e) {
        console.error(getProfilePostsErrorMessage, (e as Error).message);
    }
};

export const createPost = async (requestParams: CreatePostRequest) => {
    const { content, profileId } = requestParams;

    try {
        const response = await fetch(createPostPath, {
            method: POST_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
            body: JSON.stringify({content, profileId})
        });
        
        return response.json();
    } catch (e) {
        console.error(createPostErrorMessage, (e as Error).message);
    }
}

export const deletePost = async (postId: number) => {    
    try {
        await fetch(`${deletePostPath}/${postId}`, {
            method: DELETE_METHOD,
            headers: CONTENT_TYPE_JSON,
            credentials: "include",
        });
    } catch (e) {
        console.error(deletePostErrorMessage, (e as Error).message);
    }
}