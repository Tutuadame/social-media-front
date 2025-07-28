import React from "react";
import styles from "./GeneralButton.module.css";

type ButtonProps = {
  action: () => void;
  text: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

export const BasicButton: React.FC<ButtonProps> = ({
  action: onClick,
  text,
  style = styles['basic-button'],
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`${style}`}>
      {text}
    </button>
  );
};
