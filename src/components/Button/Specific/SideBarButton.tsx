import { Dispatch, SetStateAction } from "react";
import { createSvg } from "../../../utils/htmlUtils";
import { DashboardToggle } from "../buttonStyles";


type SideBarButtonProps = {
  openSideBar: boolean,
  setOpenSideBar: Dispatch<SetStateAction<boolean>>
}

export const SideBarButton:React.FC<SideBarButtonProps> = ({ openSideBar, setOpenSideBar }) => {

  const sidebarMoverSVG = createSvg(['m8.25 4.5 7.5 7.5-7.5 7.5'], 2, "size-9 m-auto");
  const style = openSideBar ? "open": "close";

  return  <DashboardToggle style={style} onClick={() => setOpenSideBar(prev => !prev)}>
      {sidebarMoverSVG}
    </DashboardToggle>
}

