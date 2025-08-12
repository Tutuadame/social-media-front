import { getRelativeTime } from "../../utils/htmlUtils.tsx";
import { Post } from "../../interface/profile/post.ts";
import React, { useState } from "react";
import { ProfileButton } from "../Button/Specific/Global/ProfileButton.tsx";
import { ConversationMember } from "../../interface/communication/member.ts";
import { VoteButton } from "../Button/Specific/Home/VoteButton.tsx";
import { POST_STYLES } from "./generalStyle.ts";

type PostProps = {
  profile?: ConversationMember,
  post: Post,  
}

export const PostComponent: React.FC<PostProps> = ({profile, post}) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [activeType, setActiveType] = useState<string>();

  function checkProfile() {
    if (profile) {
      return (
        <div className={POST_STYLES.profileSection}>
          <ProfileButton profile={profile} />
          <p className={POST_STYLES.timestamp}>
            {getRelativeTime(post.createdAt)}
          </p>
        </div>
      );
    }
    return <></>;
  }

  return (
    <div className={POST_STYLES.container}>
      {checkProfile()}        
      <div className={POST_STYLES.contentContainer}>
        <p className={POST_STYLES.contentText}>{post.content}</p>
      </div>
      <div className={POST_STYLES.voteSection}>
        <VoteButton 
          activeType={activeType} 
          setActiveType={setActiveType} 
          likeType="like" 
          profile={profile} 
          post={currentPost} 
          setCurrentPost={setCurrentPost}
        />
        <VoteButton 
          activeType={activeType} 
          setActiveType={setActiveType} 
          likeType="dislike" 
          profile={profile} 
          post={currentPost} 
          setCurrentPost={setCurrentPost}
        />
      </div>
    </div>
  );
};