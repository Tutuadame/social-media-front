import React from "react";
import { BUTTON } from "../buttonStyles";

type IconButtonProps = {
  action?: () => void,
  children: React.ReactNode,
  ariaLabel?: string,
  style?: string,
  type?: "button" | "submit" | "reset" | undefined,
  disabled?: boolean
};

export const IconButton: React.FC<IconButtonProps> = ({
  action,
  children,
  style = BUTTON.basic,
  type = "button",
  disabled = false,
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
