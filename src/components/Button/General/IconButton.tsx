import React from "react";
import styles from "./GeneralButton.module.css";

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
  style = styles['icon-button'],
  type = "button",
  disabled = false,
  active,
  activeStyle = styles['active-icon-button']
}) => {
  

  return (
    <>
      <button 
        disabled={disabled}
        onClick={action}
        className={active ? activeStyle : style}
        type={type}
      >
        {children}
      </button>
    </>
  );
};
