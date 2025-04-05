import {createSvg} from "../../../../utils/htmlUtils.tsx";
import {IconButton} from "../../General/IconButton.tsx";


export const NotificationButton = () => {

    /**Needs an api for calling the actually notifications and their number can be used instead of the example value */

    const notificationButtonSVG = createSvg(["M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"], 2, "size-6");
    const notificationButtonStyle = "items-center mx-auto w-14 h-14 bg-slate-400 text-white p-3 hover:outline hover:outline-4 hover:outline-offset-4 transition-all rounded-xl text-4xl";

    return <div className="flex flex-col gap-y-2 relative">
        <p className="absolute top-0 right-1 -translate-y-1/2 z-20 bg-red-900 w-8 h-8 rounded-full my-auto text-center content-center">1</p> 
        <IconButton action={() => {}} style={notificationButtonStyle}> 
            {notificationButtonSVG}
        </IconButton>
        <p className="tracking-wider text-center w-18 w-24">Notifications</p>
    </div>
}
