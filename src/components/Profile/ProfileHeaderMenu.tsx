import { ProfileMenuOption } from "../../interface";
import { Button } from "../SampleButton/Button";

interface ProfileMenuProps {
    options: ProfileMenuOption[];    
}

export const ProfileHeaderMenu : React.FC<ProfileMenuProps> = ({ options }) => {

    const menuContainerStyle = "flex flex-col justify-center m-auto mt-5"

    return (
        
        <div className={menuContainerStyle}>            
            {options.map((option, index) => (
                <Button 
                    key={index}
                    action={option.action} 
                    text={option.title} 
                />
            ))}
        </div>
    );
}