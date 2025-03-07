import { ReactNode } from "react";
import { IconButton } from "../../SampleButton/IconButton";

type ProfileOptionButtonProps = {
  action: () => void;
  text: string;
  svg: ReactNode;
  style?: string;  
};

export const ProfileOptionButton: React.FC<ProfileOptionButtonProps> = ({
  action,
  text,
  svg,
}) => {
  return (
    <div className="rounded-lg overflow-hidden bg-slate-500 p-6 w-1/6 h-64 hover:p-5 transition-all z-10">
      <IconButton
        action={action}
        ariaLabel={text}
        style={`relative group transition-all rounded text-center bg-slate-200 hover:shadow-xl hover:bg-slate-300 w-full h-full`}
      >
        <span className="inline-flex items-center justify-center transition-transform group-hover:scale-125">
          {svg}
        </span>
      </IconButton>
    </div>
  );
};