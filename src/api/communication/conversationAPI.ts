import {
  createConversationPath,
  deleteConversationPath,
  getConversationsPath,
  getSingleConversationPath,
  searchForConversationsPath,
  updateConversationNamePath
} from "./paths";
import {CONTENT_TYPE_JSON, DELETE_METHOD, GET_METHOD, PATCH_METHOD, POST_METHOD} from "../methods";
import {Conversation, CreateConversationRequest} from "../../interface/communication/conversation";
import {useQuery, UseQueryOptions} from "react-query";

const getConversationsErrorMessage = "Error fetching user conversations: ";
const updateConversationNameErrorMessage = "Error updating user conversation: ";
const deleteConversationErrorMessage = "Error deleting user conversation: ";
const searchForConversationsErrorMessage = "Error searching for conversations: ";
const createConversationErrorMessage = "Error creating conversation: ";
const getSelectedConversationErrorMessage = "Error getting selected conversation: ";

type CustomQueryOptions<TData> = Pick<UseQueryOptions<TData>, 'onSuccess' | 'enabled'>;

export const getConversations = async (id: string, pageNumber = 0, pageSize = 10, accessToken: string) => {
    try {
      const response = await fetch(`${getConversationsPath}/${id}`, {
        method: POST_METHOD,
        headers: {
          ...CONTENT_TYPE_JSON,
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify({pageNumber, pageSize})
      });

      return response.json();
    } catch (e) {
      console.error(getConversationsErrorMessage, (e as Error).message);
    }
}

export const getSelectedConversation = async (conversationId: string, accessToken: string) => {
  try {    
    const response = await fetch(`${getSingleConversationPath}/${conversationId}`, {
      method: GET_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include"     
    });

    return response.json();      
  } catch (e) {
    console.error(getSelectedConversationErrorMessage, (e as Error).message);
  }
}

export const useGetConversation = (conversationId: string, accessToken: string, options?: CustomQueryOptions<Conversation>) =>
  useQuery<Conversation>({
    queryFn: async () => {
      const response = await fetch(`${getSingleConversationPath}/${conversationId}`, {
        method: GET_METHOD,
        headers: {...CONTENT_TYPE_JSON, "Authorization": `Bearer ${accessToken}`},
        credentials: "include"
      });
      return response.json();
    },
    queryKey: ["getConversation", conversationId],
    ...options
  });

export const createConversation = async (params: CreateConversationRequest, accessToken: string) => {
  const { members, name } = params;
  try {
    const response = await fetch(createConversationPath, {
      method: POST_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify({members, name})
    });

    return response.json();
  } catch (e) {
    console.error(createConversationErrorMessage, (e as Error).message);
  }
}

export const updateConversationName = async (conversationId: string, name: string, accessToken: string) => {
  try{
    const response = await fetch(`${updateConversationNamePath}/${conversationId}`, {
      method: PATCH_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify({name})
    });
    return response.json();
  } catch (e){
    console.error(updateConversationNameErrorMessage, (e as Error).message); 
  }
};

export const deleteConversation = async (conversationId: string, accessToken: string) => {
  try{
    await fetch(`${deleteConversationPath}/${conversationId}`, {
      method: DELETE_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
    });    
  } catch (e){
    console.error(deleteConversationErrorMessage, (e as Error).message);
  }
};

export const searchForConversations = async (name:string, id:string, pageNumber: number = 0, pageSize:number = 10, accessToken: string) => {
  const params = new URLSearchParams({
    name,
    requesterId: id.toString(),
    pageSize: pageSize.toString(),
    pageNumber: pageNumber.toString()
  });

  try {
    const response = await fetch(`${searchForConversationsPath}?${params.toString()}`,{
      method: GET_METHOD,
      headers: {
        ...CONTENT_TYPE_JSON,
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
    });

    return response.json();
  } catch (e) {
    console.error(searchForConversationsErrorMessage, (e as Error).message);
  }
    
}