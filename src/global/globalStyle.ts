const basicLayout = {
  display: `flex flex-row flex-nowrap`,
  color: `bg-slate-200`,
};

const mainLayout = {
  display: `flex flex-row flex-nowrap flex-auto`,
  color: `bg-slate-200`,
  overflow: `overflow-hidden`
}

export const LAYOUT = {
  basic: Object.values(basicLayout).join(' '),
  main: Object.values(mainLayout).join(' '),
} as const;

const openContainer = {
  display: `flex flex-col`,
  positioning: `relative justify-start`,
  size: `h-full w-full`,  
  gap: `gap-y-12`,
  padding: `p-6`,
  transition: `transition-all duration-500 ease-in-out`,  
};

const closedContainer = {
  display: `flex flex-col`,
  positioning: `relative justify-start`,
  size: `h-full w-fit`,   
  gap: `gap-y-6`,
  padding: `p-3`,
  transition: `transition-all duration-500 ease-in-out`,  
};

const openMain = {
  display: `flex flex-col relative`,
  size: `w-[23vw] h-[100vh]`,  
  transition: `transition-all duration-300 ease-in-out`,
  border: `border-r-2 border-slate-800`
};

const closedMain = {
  display: openMain.display,
  size: `w-28 h-[100vh]`,  
  transition: openMain.transition, 
  border: `border-r-2 border-slate-800` 
};

const titleContainerOpen = {
  display: `default`,  
};

const titleContainerClosed = {
  //display: `hidden`,
};

const titleOpen = {
  text: `text-slate-900 text-4xl text-center`,
  margin: `mx-auto my-16`,
  tracking: `tracking-[.3em]`,
  size: `h-fit`,
  transition: `transition-all duration-300 ease-in-out`,  
};

const titleClose = {
  text: `text-slate-900 text-xl text-center`,  
  size: `h-fit`,
  transition: `transition-all duration-300 ease-in-out`,
  opacity: `invisible absolute opacity-0`,
  display: `top-0 left-5`
};

export const SIDEBAR = {
  closedContainer: Object.values(closedContainer).join(' '),
  openContainer: Object.values(openContainer).join(' '),
  openMain: Object.values(openMain).join(' '),
  closedMain: Object.values(closedMain).join(' '),
  titleContainerOpen: Object.values(titleContainerOpen).join(' '),
  titleContainerClosed: Object.values(titleContainerClosed).join(' '),
  titleOpen: Object.values(titleOpen).join(' '),
  titleClose: Object.values(titleClose).join(' '),
} as const;

const notificationContainerOpen = {
  border: `rounded border-2 border-slate-900`,
  size: `max-h-[40vh] min-h-[60vh] w-10/12`,
  overflow: `overflow-y-auto overflow-x-hidden`,
  shadow: `shadow-xl`,
  scrollbar: `scrollbar-webkit scrollbar-thin`,
  margin: `m-auto`,
  color: `bg-slate-200`,
  padding: `p-5`,
  display: `absolute z-10`,
  positioning: `top-5`,
  transition: `transition-all duration-300 ease-in-out`,
};

const notificationContainerClose = {
  border: `rounded border-2 border-slate-900`,
  size: `max-h-[40vh] min-h-[20vh] w-10/12`,
  overflow: `overflow-y-auto overflow-x-hidden`,
  shadow: `shadow-xl`,
  scrollbar: `scrollbar-webkit scrollbar-thin`,
  margin: `m-auto`,
  color: `bg-slate-200`,
  padding: `p-5`,
  display: `absolute invisible w-0`,
  positioning: `top-5`,
  transition: `transition-all duration-300 ease-in-out`,
};

export const NOTIFICATIONS = {
  containerOpen: Object.values(notificationContainerOpen).join(' '),
  containerClose: Object.values(notificationContainerClose).join(' '),
}