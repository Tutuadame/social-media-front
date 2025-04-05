import { useAuth0 } from "@auth0/auth0-react";
import { deletePost, getProfilePosts } from "../../../../api/profile/postAPI";
import { GetPageablePostsRequest, Post } from "../../../../interface/profile/post";
import { useEffect, useState } from "react";
import { useActivityContext } from "../../../../context/Profile/Activity/ActivityContext";
import { PostComponent } from "../../../Home/PostComponent";
import { getProfile } from "../../../../api/profile/profileAPI";
import { ProfileResponse } from "../../../../interface/profile/profile";
import { useLayoutContext } from "../../../../context/Layout/LayoutOutContext";
import { IconButton } from "../../../Button/General/IconButton";
import { createSvg } from "../../../../utils/htmlUtils";
import { LoadMoreButton } from "../../../Button/General/LoadMoreButton";

export const PostsTable = () => {

    const { user } = useAuth0();
    const currentId = user?.sub?.split('|')[1] || "no-id";
    const [posts, setPosts] = useState<Post[]>();
    const { tablePage } = useActivityContext();
    const { setProfile } = useLayoutContext();
    const [loadMoreStyle, setLoadMoreStyle] = useState("flex justify-center");
    const pageSize = 10;
    const deletePostStyle = "transition-all w-fit hover:bg-red-600 rounded-r-xl bg-red-200 p-3";
    const deleteSVG = createSvg(
      ["m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"],
       1.2, "size-7"
      );

    async function callUserPosts() {
      const pageable: GetPageablePostsRequest = {
        pageNumber: tablePage.current,
        pageSize: pageSize,
      }
      

      try {
        const response = await getProfilePosts(currentId, pageable).then(response => response.content);
        if (response.length < 10) {
          setLoadMoreStyle("flex justify-center hidden");
        } else {
          tablePage.current += 1;
        }
        
        if (posts && tablePage.current >= 1) {
          setPosts([...response, ...posts])
        } else {
          setPosts([...response])
        }
      } catch (err) {
        setLoadMoreStyle("flex justify-center hidden");
      }      
    }

    async function callUserProfile() {
      const response : ProfileResponse = await getProfile(currentId).then(response => response);
      setProfile(response);
    }

    const deleteUserPost = async (id: number) => {
      await deletePost(id);
      setPosts(
        posts?.filter(p => p.id !== id)
      );
    }

    useEffect(() => {      
      setLoadMoreStyle("flex justify-center");
      callUserProfile();
      callUserPosts();
    }, []);

    return <div className="flex flex-col w-full gap-10 h-full">
        <h2 className="text-white m-auto text-center h-fit w-fit text-4xl p-3 mt-10 mb-20 tracking-widest">Created Posts</h2>
        { posts?.length === 0 ? 
          <h3 className="text-white m-auto text-center h-fit w-fit text-2xl p-3 mt-10 mb-20 tracking-widest"> Go ahead and create something!</h3>
        :
        <>
          {posts?.map((post) => {
            return (
              <div className="flex flex-row gap-y-10 m-auto">  
                <PostComponent post={post} rounded="rounded-l-xl"/>
                <IconButton ariaLabel="Delete" style={deletePostStyle} action={() => {deleteUserPost(post.id)}}>
                  {deleteSVG}
                </IconButton>
              </div>
            );
          })}  
          <LoadMoreButton
            callItems={callUserPosts}
            loadMoreStyle={loadMoreStyle}
            style="transition-all p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
          />
        </>}
      </div>
    
};