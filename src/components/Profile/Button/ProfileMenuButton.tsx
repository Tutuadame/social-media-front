import { IconButton } from '../../SampleButton/IconButton'

type ProfileMenuButtonProps = {
    action: () => void;
    text: string;
};

export const ProfileMenuButton: React.FC<ProfileMenuButtonProps> = ({ action, text }) => {        
    return <IconButton action={action} ariaLabel={text}>
           <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-12 h-12"
           >
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
           </svg>
    </IconButton>;                      
}