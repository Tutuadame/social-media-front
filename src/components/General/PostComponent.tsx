import { getRelativeTime } from "../../utils/htmlUtils.tsx";
import { Post } from "../../interface/profile/post.ts";
import React, { useState } from "react";
import { ProfileButton } from "../Button/Specific/Global/ProfileButton.tsx";
import { ConversationMember } from "../../interface/communication/member.ts";
import {VoteButton} from "../Button/Specific/Home/VoteButton.tsx";

type PostProps = {
    profile?: ConversationMember,
    post: Post,
    rounded?: string,
}

export const PostComponent: React.FC<PostProps> = ({profile, post, rounded="rounded-xl"}) => {
    const [currentPost, setCurrentPost] = useState(post);
    const [activeType, setActiveType] = useState<string>();

    function checkProfile() {
      if (profile) {
        return (
          <div className="flex flex-row pb-6">
            <ProfileButton profile={profile} />
            <p className="ml-auto my-auto text-white text-sm transition-all tracking-widest">
              {getRelativeTime(post.createdAt)}
            </p>
          </div>
        );
      }
      return <></>;
    }

    return <div className={`relative bg-slate-900 p-5 ${rounded} w-[40vw] max-h-[50vh] h-fit flex flex-col mx-auto`}>
        {checkProfile()}        
        <div className="w-full h-full border-l-4 border-white content-center">
            <p className="ml-5 text-white py-5">{post.content}</p>
        </div>
        <div className="flex flex-row gap-10 pt-2 transition-all">
            <VoteButton activeType={activeType} setActiveType={setActiveType} likeType="like" profile={profile} post={currentPost} setCurrentPost={setCurrentPost}/>
            <VoteButton activeType={activeType} setActiveType={setActiveType} likeType="dislike" profile={profile} post={currentPost} setCurrentPost={setCurrentPost}/>
        </div>
    </div>
};