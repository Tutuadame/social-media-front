import {useRef, useState} from "react"
import { GetPageablePostsRequest, Post } from "../../interface/profile/post";
import { getConnectionPosts } from "../../api/profile/postAPI";
import { LoadMoreButton } from "../Button/General/LoadMoreButton";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext";
import { CreatePostComponent } from "./CreatePostComponent";
import { searchForProfiles } from "../../api/profile/profileAPI";
import { ProfileResponse, SearchForProfileRequest } from "../../interface/profile/profile";
import { FoundItemsComponent } from "./FoundItemsComponent";
import { BasicButton } from "../Button/General/BasicButton";
import { SearchBar } from "../SearchBar";
import {useMutation, useQuery} from "react-query";
import {createSvg, handleArrayMutation} from "../../utils/htmlUtils.tsx";
import {ConnectionResponse} from "../../interface/profile/connection.ts";
import {PostComponent} from "../General/PostComponent.tsx";
import {nanoid} from "nanoid";
import { MAIN_AUTH } from "./homeStyle.ts";
import { IconButton } from "../Button/General/IconButton.tsx";


export const MainComponent = () => {
  
  const loadMoreButtonStyle = "transition-all h-fit p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10";
  const timeLineContainerStyle = "w-full gap-y-10 flex flex-col overflow-auto h-full pb-[10vh]";
  
  const { userConnections, userAccessToken, userProfile } = useLayoutContext();
  
  const postsPageRef = useRef<number>(0);
  const searchPageRef = useRef<number>(0);
  const expressionRef = useRef<string>("");
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [foundProfiles, setFoundProfiles] = useState<ProfileResponse[]>([]);
  const [searchExpression, setSearchExpression] = useState<string>("");
  
  const pageSize = 10;
  
  function resetSearch() {
    setIsSearchOn(false);
    setFoundProfiles([]);
    searchPageRef.current = 0;
    setSearchExpression("");
  }
  
  const { mutateAsync : search} = useMutation({
    mutationFn: async (params: SearchForProfileRequest) => {
      return await searchForProfiles(params, userAccessToken)
        .then(result => result.content);
    },
    onSuccess: (data) => {
      handleArrayMutation(setFoundProfiles, searchPageRef.current, data);
    }
  });

  const onSearch = async (name: string) => {
    setIsSearchOn(true);
    expressionRef.current = name;
    const requestParams: SearchForProfileRequest = {pageNumber: searchPageRef.current, pageSize: 10, name: name}
    await search(requestParams);
  }
  
  const callPosts = async () => {
    const request: GetPageablePostsRequest = { pageNumber: postsPageRef.current, pageSize: pageSize };
    const tempPosts = await getConnectionPosts(userProfile.current.id, request, userAccessToken).then(response => response.content);
    handleArrayMutation(setPosts, postsPageRef.current, tempPosts);
  }
  
  const { isLoading: isPostsLoading } = useQuery({
    queryFn: async () => await callPosts(),
    queryKey: "loadPosts",
  });

  return (
    <div className="flex flex-col w-full">
      <div className={MAIN_AUTH.homeHeader}>
        <div className={MAIN_AUTH.logoContainer}>
          <img src="src\assets\handball_logo.svg" alt="Description" className={MAIN_AUTH.logo} />
          <h2 className={MAIN_AUTH.logoTitle}>Sports Maniac</h2>
        </div>
        <div className={MAIN_AUTH.searchSection}>
          <SearchBar 
            onSearch={onSearch} 
            searchExpression={searchExpression} 
            setSearchExpression={setSearchExpression} 
            resetSearch={resetSearch}
            />
        </div>

      </div>
      <div className="flex-row flex w-full justify-between h-[80vh]">
        {/*<FoundItemsComponent
          foundProfiles={foundProfiles}
          isSearchOn={isSearchOn}
          onSearch={onSearch}
          searchExpression={searchExpression}
          pageRef={searchPageRef}
        />*/}
        <div className={timeLineContainerStyle}>
          <CreatePostComponent />
          {!isPostsLoading && posts.map(
            (post) => {
              let connectionProfile: ConnectionResponse = userConnections.current.find(
                (userConnection: ConnectionResponse) => userConnection.profileId === post.profileId
              ) || {} as ConnectionResponse;
              
              let profile: ProfileResponse = {
                id: connectionProfile.profileId,
                firstName: connectionProfile.firstName,
                lastName: connectionProfile.lastName,
                picture: connectionProfile.picture
              }
              
              return <div key={nanoid()} className="flex-row flex gap-3 group">
                <PostComponent post={post} profile={profile} />
              </div>
            })}
          <LoadMoreButton pageRef={postsPageRef} callItems={callPosts} style={loadMoreButtonStyle}/>
        </div>
      </div>
    </div>
  );
}