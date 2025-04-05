type ButtonProps = {
  action: () => void;
  text: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

export const BasicButton: React.FC<ButtonProps> = ({
  action: onClick,
  text,
  style = "h-[6vh] w-[5vw] text-white bg-slate-400 rounded-xl shadow-xl outline-slate-100 hover:outline hover:outline-2 hover:outline-offset-4 transition-all p-2 my-auto tracking-widest",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`${style}`}>
      {text}
    </button>
  );
};
