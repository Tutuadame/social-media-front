import { GenericProfileResponse } from "../../interface/profile/profile"
import { LoadMoreButton } from "../Button/General/LoadMoreButton";
import { ProfileButton } from "../Button/Specific/Global/ProfileButton";
import React, {MutableRefObject} from "react";

type FoundItemsComponentProps = {
  foundProfiles: GenericProfileResponse[] | undefined,
  isSearchOn: boolean,
  onSearch: (name: string) => void,
  searchExpression: string,
  pageRef: MutableRefObject<number>
}

export const FoundItemsComponent: React.FC<FoundItemsComponentProps> = ({ foundProfiles, isSearchOn, onSearch, searchExpression, pageRef }) => {
  const dropDownStyle = "flex flex-col gap-10 w-[25vw] bg-slate-800 p-5 overflow-auto transition-all mb-5 border-r-4 border-b-4 h-fit";
  const dropDownStyleActive = "flex flex-col gap-10 w-[25vw] bg-slate-800 p-5 max-h-[82vh] overflow-auto transition-all mb-5 border-r-4 h-full";

  return <div className={isSearchOn ? dropDownStyleActive: dropDownStyle}>
    <h2 className="text-2xl tracking-widest text-white text-center">Search results</h2>
    { !isSearchOn ?
      <p className="text-white text-center tracking-widest">Your results will appear here!</p>
    :
    <>
      {foundProfiles?.length === 0 ?
        <p className="text-white text-center tracking-widest">No user were found!</p>
      :
        <>
          {foundProfiles?.map((profile) => {
            return <ProfileButton key={profile.id} profile={profile}/>
          })}
          <LoadMoreButton
            pageRef={pageRef}
            callItems={() => {
              onSearch(searchExpression);
            }}
            style="transition-all h-fit p-3 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-slate-100 mt-10"
            />
        </>
      }
    </>
    }
  </div>;
}