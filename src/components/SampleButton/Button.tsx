import { baseButtonStyle } from "../../style/button";

type ButtonProps = {
    action: () => void;
    text: string;
    style?: string;
};

export const Button: React.FC<ButtonProps> = ({ action: onClick, text, style = ""}) => {
    return (
        <button type="button" onClick={onClick} className={`${style}`}>
            {text}
        </button>
    );
};