import { useEffect, useRef, useState } from "react"
import { GetPageablePostsRequest, Post } from "../../interface/profile/post";
import { getConnectionPosts } from "../../api/profile/postAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadMoreButton } from "../Button/General/LoadMoreButton";
import { ConnectionResponse } from "../../interface/profile/connection";
import { PostComponent } from "./PostComponent";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext";
import { ConversationMember } from "../../interface/communication/member";
import { CreatePostComponent } from "./CreatePostComponent";
import { searchForProfiles } from "../../api/profile/profileAPI";
import { GenericProfileResponse, SearchForProfileRequest } from "../../interface/profile/profile";
import { FoundItemsComponent } from "./FoundItemsComponent";
import { BasicButton } from "../Button/General/BasicButton";
import { SearchBar } from "../SearchBar";

export const HomePageComponent = () => {
  const { user } = useAuth0();     
  const [posts, setPosts] = useState<Post[]>([]);
  const { connections } = useLayoutContext();
  const postsPageRef = useRef<number>(0);
  const searchPageRef = useRef<number>(0);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [postsLoadMoreStyle, setPostsLoadMoreStyle] = useState("flex justify-center");
  const [searchLoadMoreStyle, setSearchLoadMoreStyle] = useState("flex justify-center");
  const [foundProfiles, setFoundProfiles] = useState<GenericProfileResponse[]>([]);
  const [ searchExpression, setSearchExpression ] = useState<string>("");
  const expressionRef = useRef<string>("");
  const pageSize = 10;

  const onSearch = async (name: string) => {
    setIsSearchOn(true);
    if (expressionRef.current !== name) {
      setSearchLoadMoreStyle("flex justify-center");
      searchPageRef.current = 0;
      setFoundProfiles([]);
    }
    expressionRef.current = name;
    const requestParams: SearchForProfileRequest = {
      pageNumber: searchPageRef.current,
      pageSize: 10,
      name: name        
    }

    const response = await searchForProfiles(requestParams).then(result => {
      console.log(result.content.length);
      return result.content
    });
    setFoundProfiles(prev => [...prev, ...response]);
    
    if (response.length < 10) {
      setSearchLoadMoreStyle("flex justify-center hidden");
    } else {        
      searchPageRef.current += 1;
    }
  }

  const callPosts = async () => {
    if(!user) return;

    const request: GetPageablePostsRequest = { pageNumber: postsPageRef.current, pageSize: pageSize };                
    const tempPosts = await getConnectionPosts(user, request).then(response => response.content);
    if (postsPageRef.current === 0) {
      setPosts(tempPosts);
    } else {               
      setPosts(prev => [...prev, ...tempPosts]);
    }

    if (tempPosts.length < 10) {
      setPostsLoadMoreStyle("flex justify-center hidden");
    } else {        
      postsPageRef.current += 1;
    }        
  }

  const checkProfile = (post: Post) => {
    let conversationMember: ConversationMember | undefined = undefined;
    let connectionProfile: ConnectionResponse | undefined = connections.find(
      (connection) => connection.profileId === post.profileId
    );
    if(connectionProfile) {
      conversationMember = {
        id: connectionProfile.profileId,
        firstName: connectionProfile.firstName,
        lastName: connectionProfile.lastName,
        picture: connectionProfile.picture
      }
    }            
    if(!conversationMember) return <>Profile not found in Connections!</>;
    return <div className="flex-row flex gap-3 group">
      <PostComponent post={post} profile={conversationMember}/>
    </div>
  }

  useEffect(() => {
    setPosts([]);
    callPosts();
    if (searchExpression !== "") {
      setFoundProfiles(prev => prev.filter(p => {
        p.firstName.includes(searchExpression) || p.lastName.includes(searchExpression) || (p.firstName + p.lastName).includes(searchExpression)
      }))
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-slate-800 h-[20vh] flex flex-row justify-center items-center border-b-4 border-white gap-10">
        <h2 className="tracking-widest text-2xl text-white">Missing somebody?</h2>
        <SearchBar onSearch={onSearch} searchExpression={searchExpression} setSearchExpression={setSearchExpression} />
        <BasicButton action={() => {
          setIsSearchOn(false);
          setFoundProfiles([]);
          searchPageRef.current = 0;
          setSearchExpression("");
        }} text="Reset" />
      </div>
      <div className="flex-row flex w-full justify-between h-[80vh]">
        <FoundItemsComponent 
          foundProfiles={foundProfiles}
          isSearchOn={isSearchOn}
          onSearch={onSearch}
          loadMoreStyle={searchLoadMoreStyle}
          searchExpression={searchExpression}
        />
        <div className="w-full gap-y-10 flex flex-col overflow-auto h-full pb-[10vh]">
          <CreatePostComponent />
          {posts.map((post) => checkProfile(post))}
          <LoadMoreButton
            callItems={callPosts}
            loadMoreStyle={postsLoadMoreStyle}
            style="transition-all h-fit p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
          />
        </div>        
      </div>
    </div>
  );
}