import React from "react";

type ButtonProps = {
  action: () => void;
  text: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

export const BasicButton: React.FC<ButtonProps> = ({
  action: onClick,
  text,
  style = "h-[6vh] w-[6vw] text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all my-auto font-semibold tracking-widest",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`${style}`}>
      {text}
    </button>
  );
};
