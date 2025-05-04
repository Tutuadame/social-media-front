import { createSvg } from "../utils/htmlUtils";
import { IconButton } from "./Button/General/IconButton";
import React, { Dispatch, SetStateAction } from "react";


type SearchBarProps = {
  onSearch: (fieldValue: string) => void;
  searchExpression: string,
  setSearchExpression: Dispatch<SetStateAction<string>>,
};

export const SearchBar = ({ onSearch, searchExpression, setSearchExpression }: SearchBarProps) => {  
  const searchIconSVG = createSvg(
    ["m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"],
    2,
    "size-7"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
    setSearchExpression(e.target.value);
  };

  return (
    <div className="flex flex-row relative shadow-xl h-fit rounded-xl w-full max-w-[20vw]">
      <input                
        onChange={handleChange}
        type="text"
        name="search"
        value={searchExpression}
        className="transition-all bg-slate-100 w-10/12 h-14 p-3 outline-none rounded-l-xl"
        placeholder="Search..."
      />
      <IconButton
      	ariaLabel="Search"
      	action={() => {onSearch(searchExpression)}}
      	type="button"        
      	style="transition-all text-white h-14 w-3/12 max-w-[5vw] min-w-[3vw] h-14 bg-slate-400 hover:bg-slate-300 hover:text-slate-900 rounded-r-xl"
      >
        {searchIconSVG}
      </IconButton>
    </div>
  );
};
