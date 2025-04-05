import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "./IconButton";

type LoadMoreButtonProps = {
  callItems: () => void;
  loadMoreStyle: string;
  style?: string;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  callItems,
  loadMoreStyle,
  style = "transition-all bg-slate-200 p-3 mx-2 hover:bg-slate-900 rounded-full mt-4 hover:text-slate-100",
}) => {
  const loadMoreSVG = createSvg(
    ["m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"],
    1,
    "size-7"
  );

  return (
    <>
      <div className={loadMoreStyle}>
        <IconButton
          ariaLabel="See more"
          action={async () => {
            callItems();
          }}
          style={style}
        >
          {loadMoreSVG}
        </IconButton>
      </div>
    </>
  );
};
