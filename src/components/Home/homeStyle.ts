const homeHeader = {
  size: `w-full h-[20vh]`,
  display: `flex flex-row relative`,
  color: `bg-slate-400`,
  items: `justify-evenly items-center`,
  border: `border-b-2 border-slate-800`,  
};

const logo = {
  size: `w-[5vw]`,
  margin: `mx-auto`
  //color: `invert` for dark mode!
}

const logoTitle = {
  size: `w-full`,
  margin: `mx-auto mb-4`,
  position: `text-center`,
  text: `text-xl`,
  tracking: `tracking-widest`
}

const logoContainer = {
  display: `absolute flex flex-column flex-wrap`,
  size: `w-[20] h-full`,
  position: `top-0 left-0`
}

const searchSection = {
  size: `w-6/12 h-full`,
  margin: `mx-auto`,
  display: `flex flex-row`,
  items: `items-center justify-center`,  
}

export const MAIN_AUTH = {
  homeHeader: Object.values(homeHeader).join(' '),
  logo: Object.values(logo).join(' '),
  searchSection: Object.values(searchSection).join(' '),
  logoContainer: Object.values(logoContainer).join(' '),
  logoTitle: Object.values(logoTitle).join(' '),
};