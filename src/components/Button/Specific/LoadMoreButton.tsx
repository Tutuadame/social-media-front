import React, {MutableRefObject,useState} from "react";
import { createSvg } from "../../../utils/htmlUtils";
import { Button } from "../buttonStyles";

type LoadMoreButtonProps = {
  pageRef: MutableRefObject<number>;
  callItems: () => void;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({pageRef, callItems}) => {
  
  const baseStyle = "flex justify-center";
  const loadMoreSVG = createSvg(["m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"], 1, "size-7");
  
  const [show, setShow] = useState(baseStyle);
  
  const handlePagination= (pageRef: MutableRefObject<number>) => {
    pageRef.current += 1;
  }
  
  const loadMoreAction = async () => {
    handlePagination(pageRef);
    callItems();
  }

  return (
    <>
      <Button role="loader" onClick={loadMoreAction}>{loadMoreSVG}</Button>
    </>
  );
};
