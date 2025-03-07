import React from "react";

type IconButtonProps = {
  action?: () => void;
  children: React.ReactNode; // Receives SVG or icon component
  ariaLabel?: string;
  style?: string;  
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean
};

export const IconButton: React.FC<IconButtonProps> = ({
  action,
  children,
  ariaLabel = "icon button",
  style = "flex items-center justify-center w-14 h-14 bg-slate-900 text-white p-2 hover:text-slate-800 hover:bg-slate-100 transition rounded-full",
  type = "button",
  disabled = false
}) => {


  return (
    <>
      <button 
        disabled={disabled}
        onClick={action}
        className={style}
        aria-label={ariaLabel}
        type={type}
      >
        {children}
      </button>
    </>
  );
};
