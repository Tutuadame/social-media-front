import { createSvg } from "../../../utils/htmlUtils";
import { IconButton } from "../../SampleButton/IconButton";

type BackButtonProps = {
  action: () => void;
};

export const BackButton: React.FC<BackButtonProps> = ({ action }) => {
  const goBackSVG = createSvg(["M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"], 1, "size-11");

  return (
    <>
      <IconButton
        ariaLabel="Back"
        style="absolute transition-all min-h min-w p-2 -mx-24 rounded bg-slate-400 hover:bg-slate-300 left-0"
        action={action}
      >
        {goBackSVG}
      </IconButton>
    </>
  );
};
