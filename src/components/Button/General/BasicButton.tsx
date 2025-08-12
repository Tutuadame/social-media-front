import React from "react";
import { BUTTON } from "../buttonStyles";

type ButtonProps = {
  action: () => void;
  text: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

export const BasicButton: React.FC<ButtonProps> = ({
  action: onClick,
  text,
  style = BUTTON.basic,
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={style}>
      {text}
    </button>
  );
};
