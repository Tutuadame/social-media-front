import React from "react";
import { BUTTON } from "../buttonStyles";

type IconButtonProps = {
  action?: () => void,
  children: React.ReactNode,
  ariaLabel?: string,
  style?: string,
  activeStyle?: string,
  type?: "button" | "submit" | "reset" | undefined,
  disabled?: boolean
  active?: boolean
};

export const IconButton: React.FC<IconButtonProps> = ({
  action,
  children,
  style = BUTTON.basic,
  type = "button",
  disabled = false,
  active,
  activeStyle = "h-[6vh] w-[5vw] text-white bg-slate-900 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all p-2 my-auto"
}) => {
  

  return (
    <>
      <button
        disabled={disabled}
        onClick={action}
        className={style}
        type={type}
      >
        {children}
      </button>
    </>
  );
};
