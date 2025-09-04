import { useAuth0 } from "@auth0/auth0-react";
import { CreatePostRequest } from "../../interface/profile/post";
import { createPost } from "../../api/profile/postAPI";
import { BasicButton } from "../Button/General/BasicButton";
import React, { useState } from "react";
import {useLayoutContext} from "../../context/Layout/LayoutOutContext.tsx";

export const CreatePostComponent = () => {

  const newPostContainerStyle = "relative bg-slate-400 p-5 w-[40vw] max-h-[50vh] h-fit flex flex-col mx-auto rounded mt-10 shadow-xl";
  const textAreaStyle = "text-slate-900 w-full h-[15vh] bg-slate-200 border-2 rounded p-3 mb-5 tracking-widest focus:outline-none";  
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const [newContent, setNewContent] = useState<string>("");
  const { userAccessToken } = useLayoutContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  }

  async function sendCreateRequest() {
    const requestParams: CreatePostRequest = {
      content: newContent,
      profileId: currentId
    }
    await createPost(requestParams, userAccessToken).then(result => result);
    setNewContent("");
  }

  return <div className={newPostContainerStyle}>    
    <textarea name="newContent" id="" value={newContent} className={textAreaStyle} onInput={handleChange} placeholder="Got something to say?">
    </textarea>
    <BasicButton action={() => sendCreateRequest()} text="Share"/>
  </div>
}