import { AddMemberRequest, DeleteMemberFromConversationRequest } from "../../interface";
import { CreateMemberRequest } from "../../interface/communication/member";
import { CONTENT_TYPE_JSON, CONTENT_TYPE_TEXT, DELETE_METHOD, GET_METHOD, POST_METHOD } from "../methods";
import { addMemberPath, createMemberPath, deleteMemberFromConversationPath, deleteMemberPath, getMembersPath, searchForMembersPath } from "./paths";

const addMemberErrorMessage = "Error adding member to the conversation: ";
const deleteMemberFromConversationErrorMessage = "Error deleting member from the conversation: ";
const getMembersErrorMessage = "Error getting members of the conversation: ";
const searchForMembersErrorMessage = "Error searching for members to add: ";
const createMemberErrorMessage = "Error creating a messenger profile: ";
const deleteMemberErrorMessage = "Error deleting messenger profile: ";

export const addMember = async (requestParams: AddMemberRequest, accessToken: string) => {
    const { memberId, conversationId } = requestParams;
    try {
        const response = await fetch(addMemberPath, {
            method: POST_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({memberId, conversationId})
        });

        return response.json();
    } catch (e) {
        console.error(addMemberErrorMessage, (e as Error).message);
    }
};

export const createMember = async (requestParams: CreateMemberRequest, accessToken: string) => {
    const { memberId, firstName, lastName } = requestParams;
    try {
        const response = await fetch(createMemberPath, {
            method: POST_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({memberId, firstName, lastName})
        });

        return response.json();
    } catch (e) {
        console.error(createMemberErrorMessage, (e as Error).message);
    }
};

export const deleteMember = async (profileId: string, accessToken: string) => {
    try {
        const response = await fetch(`${deleteMemberPath}/${profileId}`, {
            method: DELETE_METHOD,
            headers: {
                ...CONTENT_TYPE_TEXT,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
        });

        return response.text();
    } catch (e) {
        console.error(deleteMemberErrorMessage, (e as Error).message);
    }
};

export const deleteMemberFromConversation = async (requestParams: DeleteMemberFromConversationRequest, accessToken: string) => {
    const { memberId, conversationId } = requestParams;
    try {
        const response = await fetch(deleteMemberFromConversationPath, {
            method: DELETE_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({memberId, conversationId})
        });        
        return response.text();
    } catch (e) {
        console.error(deleteMemberFromConversationErrorMessage, (e as Error).message);
    }
};

export const getMembers = async (members: string[], accessToken: string) => {
    try {        
        const response = await fetch(getMembersPath, {
            method: POST_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify(members)
        });
    
        return response.json().then(response => response);
    } catch (e) {
        console.error(getMembersErrorMessage, (e as Error).message);
    }
};

export const searchForMembers = async (name:string, id:string, pageNumber: number = 0, pageSize:number = 10, accessToken: string) => {
    try {
        const params = new URLSearchParams({
            name,
            requesterId: id.toString(),
            pageSize: pageSize.toString(),
            pageNumber: pageNumber.toString()
        });
          
        const response = await fetch(`${searchForMembersPath}?${params.toString()}`,{
            method: GET_METHOD,
            headers: {
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
        });
        return response.json(); //Pageable
    } catch (e) {
        console.error(searchForMembersErrorMessage, (e as Error).message);
    }
}