import { useAuth0 } from "@auth0/auth0-react";
import { CreatePostRequest } from "../../interface/profile/post";
import { createPost } from "../../api/profile/postAPI";
import { BasicButton } from "../Button/General/BasicButton";
import React, { useState } from "react";
import {useLayoutContext} from "../../context/Layout/LayoutOutContext.tsx";

export const CreatePostComponent = () => {

  const newPostContainerStyle = "relative bg-slate-900 p-5 w-[40vw] max-h-[50vh] h-fit flex flex-col mx-auto rounded-xl mt-10";
  const textAreaStyle = "text-white w-full h-[15vh] bg-slate-400 border-2 rounded-xl p-3 mb-5 tracking-widest focus:outline-none";
  const newPostTitleStyle = "text-white text-2xl pb-5 tracking-widest";
  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const [newContent, setNewContent] = useState<string>("");
  const { accessToken } = useLayoutContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  }

  async function sendCreateRequest() {
    const requestParams: CreatePostRequest = {
      content: newContent,
      profileId: currentId
    }
    await createPost(requestParams, accessToken.current).then(result => result);
    setNewContent("");  
  }

  return <div className={newPostContainerStyle}>
    <h2 className={newPostTitleStyle}>Got something to say?</h2>
    <textarea name="newContent" id="" value={newContent} className={textAreaStyle} onInput={handleChange}>
    </textarea>
    <BasicButton action={() => sendCreateRequest()} text="Share"/>
  </div>
}