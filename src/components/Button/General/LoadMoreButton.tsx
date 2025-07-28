import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "./IconButton";
import React, {MutableRefObject,useState} from "react";
import styles from "./GeneralButton.module.css";

type LoadMoreButtonProps = {
  pageRef: MutableRefObject<number>;
  callItems: () => void;
  style?: string;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  pageRef,
  callItems,
  style = styles['load-more'],
}) => {
    
  const baseStyle = "flex justify-center";
  const loadMoreSVG = createSvg(
    ["m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"],
    1,
    "size-7"
  );
  
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
      <div className={show}>
        <IconButton ariaLabel="See more" action={loadMoreAction} style={style}>
          {loadMoreSVG}
        </IconButton>
      </div>
    </>
  );
};
