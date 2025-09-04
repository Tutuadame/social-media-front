import { Dispatch, SetStateAction } from "react";
import { createSvg } from "../../../../utils/htmlUtils";
import { IconButton } from "../../General/IconButton";
import { BUTTON } from "../../buttonStyles";

type SideBarButtonnProps = {
  openSideBar: boolean,
  setOpenSideBar: Dispatch<SetStateAction<boolean>>
}

export const SideBarButton:React.FC<SideBarButtonnProps> = ({ openSideBar, setOpenSideBar }) => {

  const sidebarMoverSVG = createSvg(['m8.25 4.5 7.5 7.5-7.5 7.5'], 2, "size-9 m-auto");
  let style = openSideBar ? BUTTON.toggleSidebarButtonOpen: BUTTON.toggleSidebarButtonClose;

  return  <IconButton style={style} action={() => setOpenSideBar(prev => !prev)} ariaLabel="Move menu">
      {sidebarMoverSVG}
    </IconButton>
}