const basicButton = {
  text: `text-slate-800 text-2xl tracking-wide`,
  hover: `hover:bg-slate-800 hover:shadow-xl hover:text-slate-200`,
  positioning: `items-center`,
  size: `w-fit h-fit`,
  transition: `transition-all`,
  border: `rounded`,
  padding: `py-3 px-4`,
  margin: `mx-2 my-2`,
  color: `bg-slate-100`,
  shadow: `shadow-xl`
};

const dashboardButton = {
  hover: basicButton.hover,
  size: `w-full`,
  text: `text-slate-800`,
  transition: basicButton.transition,
  padding: `p-4`,
  rounded: basicButton.border,
  display: `flex flex-row`,
  positioning: `items-center justify-start`,
  gap: `gap-10`,
  group: `group`
}

const dashboardButtonTitle = {
  text: `text-center text-2xl`,
  size: `w-auto`,
  tracking: `tracking-widest`,
  transition: `transition-all`,
  hover: `group-hover:tracking-[.3rem]`
}

const toggleSidebarButtonOpen = {
  size: `w-20 h-20`,
  text: dashboardButton.text,
  transition: `transition-all duration-300 ease-in-out`,
  rotate: `rotate-180`,
  positioning: `mx-auto`,
  hover: basicButton.hover,
  rounded: basicButton.border,
}

const toggleSidebarButtonClose = {
  size: `w-20 h-20`,
  text: dashboardButton.text,
  transition: `transition-all duration-300 ease-in-out`,
  padding: `p-6`,
  hover: basicButton.hover,
  rounded: basicButton.border,
}

const loadMore = {
  border: `rounded-full`,
  padding: `p-3`,
  color: `bg-slate-100`,
  hover: `hover:bg-slate-900 hover:text-slate-100`,
  margin: `mt-10`
}

export const BUTTON = {
  basic: Object.values(basicButton).join(' '),
  dashboard: Object.values(dashboardButton).join(' '),
  dashboardButtonTitle: Object.values(dashboardButtonTitle).join(' '),
  toggleSidebarButtonOpen: Object.values(toggleSidebarButtonOpen).join(' '),
  toggleSidebarButtonClose: Object.values(toggleSidebarButtonClose).join(' '),
  loadMore: Object.values(loadMore).join(' '),
  hidden: "hidden"
} as const;