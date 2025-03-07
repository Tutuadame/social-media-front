import { ProfileOptionButton } from "..";

type MainMenuProps = {
  profileOptions: any;
}

export const MainMenu: React.FC<MainMenuProps> = ({profileOptions}) => {
  
  return (
    <div className="relative flex flex-row m-auto gap-5 flex-wrap w-full h-full justify-center">
      {profileOptions.map((option:any, key: number) => (
        <ProfileOptionButton
          key={key}
          svg={option.svg}
          text={option.text}
          action={option.action}
        />
      ))}
    </div>
  );
};
