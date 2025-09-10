import { createSvg } from "../utils/htmlUtils";
import { Button } from "./Button/buttonStyles";
import React, { Dispatch, SetStateAction } from "react";


type SearchBarProps = {
  onSearch: (fieldValue: string) => void;
  searchExpression: string,
  setSearchExpression: Dispatch<SetStateAction<string>>,
  resetSearch: () => void,

};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchExpression, setSearchExpression, resetSearch }) => {
  const searchIconSVG = createSvg(["m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"], 2, "m-auto size-7");
  const resetSVG = createSvg(["M6 18 18 6M6 6l12 12"], 2, "m-auto size-7");
  const inputStyle = "transition-all bg-slate-200 w-7/12 h-14 py-3 px-4 outline-none rounded shadow-xl mx-2";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchExpression(e.target.value);
  };

  return (
    <>
      <input onChange={handleChange} type="text" name="search" value={searchExpression} className={inputStyle} placeholder="Search..."/>
      <Button onClick={() => {onSearch(searchExpression)}}>{searchIconSVG}</Button>
      <Button onClick={resetSearch}>{resetSVG}</Button>
    </>
  );
};
