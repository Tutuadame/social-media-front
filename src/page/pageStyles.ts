const activityHeader = {
  display: `flex flex-row`,
  positioning: `justify-around items-center`,
  padding: `p-10`,
  color: `bg-slate-800`,
  size: `h-fit w-full`,
  border: `border-b-4`
};

const activityTitle = {
  tracking: `tracking-widest`,
  text: `text-3xl text-white`
};

const activityButtonContainer = {
  display: `flex flex-row`,
  size: `w-1/4`,
  positioning: `justify-evenly`
};

const activityBasicButton = {
  padding: `p-4`,
  text: `text-2xl text-white`,
  color: `bg-slate-400`,
  border: `rounded-xl`,
  shadow: `shadow-xl`,
  outline: `outline-slate-100`,
  hover: `hover:outline hover:outline-2 hover:outline-offset-4`,
  transition: `transition-all`,
  positioning: `my-auto`,
  font: `font-medium tracking-widest`
};

const activityActiveButton = {
  padding: `p-5`,
  text: `text-2xl text-slate-900`,
  color: `bg-slate-100`,
  border: `rounded-xl`,
  shadow: `shadow-xl`,
  outline: `outline-slate-100`,
  hover: `hover:outline hover:outline-2 hover:outline-offset-4`,
  transition: `transition-all`,
  positioning: `my-auto`,
  font: `font-medium tracking-widest`
};

const welcomePage = {
  display: `relative flex flex-col`,
  size: `w-full h-full`,
  positioning: `items-center`,
  gap: `gap-10`
};

const welcomeTitle = {
  margin: `mt-28 mb-64`,
  text: `text-center tracking-widest text-6xl text-white`
};

const welcomeSwitchButton = {
  positioning: `items-center justify-center`,
  size: `w-fit h-12`,
  text: `text-slate-900 text-xl text-white`,
  padding: `px-5`,
  margin: `mx-5`
};

const profileHeader = {
  size: `w-full h-[20vh]`,
  content: `content-end`,
  border: `border-b-4`,
  color: `bg-slate-800`,
  display: `flex flex-row`,
  positioning: `justify-evenly relative`
};

const profileAvatar = {
  size: `w-36 h-36`,
  border: `rounded-full border-8-transparent`,
  positioning: `absolute translate-y-1/2 bottom-0`,
  color: `bg-slate-100`,
  padding: `p-1`
};

const profileTitleContainer = {
  size: `w-full h-[10vh]`,
  margin: `mt-14`
};

const profileTitle = {
  size: `w-full h-full`,
  text: `text-3xl tracking-widest text-white`,
  content: `content-center text-center`
};

const profileContentContainer = {
  size: `max-h-[60vh] w-10/12`,
  display: `flex flex-col`,
  padding: `p-5`,
  margin: `m-auto`,
  gap: `gap-10`,
  overflow: `overflow-auto`
};

const profileInfoContainer = {
  size: `w-2/3`,
  display: `flex flex-row`,
  gap: `gap-x-10`,
  text: `text-2xl tracking-widest text-slate-100`,
  color: `bg-slate-800`,
  padding: `p-10`,
  positioning: `justify-between`,
  margin: `mx-auto`,
  shadow: `shadow-xl`,
  border: `rounded-xl`,
  font: `font-thin`
};

const profileEditableContainer = {
  size: `w-2/3`,
  display: `flex flex-col`,
  gap: `gap-10`,
  text: `text-2xl tracking-widest text-slate-100`,
  color: `bg-slate-800`,
  padding: `p-10`,
  positioning: `justify-between`,
  margin: `mx-auto`,
  shadow: `shadow-xl`,
  border: `rounded-xl`,
  font: `font-thin`
};

const profileEditButton = {
  transition: `transition-all`,
  text: `text-slate-100`,
  color: `bg-slate-400`,
  border: `rounded-xl`,
  padding: `p-3`,
  hover: `hover:outline outline-4 outline-offset-4`
};

const profileTextarea = {
  text: `text-slate-900 text-xl`,
  border: `rounded-xl`,
  padding: `p-3`,
  size: `w-full h-[15vh]`,
  color: `bg-slate-400`,
  font: `font-normal`,
  focus: `focus:outline-none`
};

const profileTextDisplay = {
  text: `text-slate-900 text-xl`,
  border: `rounded-xl`,
  padding: `p-5`,
  size: `max-w-1/2 h-[15vh]`,
  color: `bg-slate-400`,
  positioning: `my-auto`,
  font: `font-normal`
};

const profileSubmitButton = {
  margin: `m-auto`,
  size: `w-1/4 h-fit`,
  color: `bg-slate-400`,
  text: `text-white text-3xl tracking-widest`,
  padding: `p-3`,
  transition: `transition-all`,
  font: `font-light`,
  border: `rounded-xl`,
  hover: `hover:outline hover:outline-4 hover:outline-offset-4`
};

const profileIdentityMenuButton = {
  size: `w-1/2 h-full`,
  color: `bg-slate-400`,
  text: `text-white text-5xl tracking-widest`,
  padding: `p-5`,
  transition: `transition-all`,
  positioning: `my-auto`,
  font: `font-light`
};

const profileActiveButton = {
  size: `w-1/2 h-full`,
  color: `bg-slate-100`,
  text: `text-slate-900 text-5xl tracking-widest`,
  padding: `p-5`,
  transition: `transition-all`,
  positioning: `my-auto`,
  font: `font-light`
};

const registrationContainer = {
  display: `flex flex-col`,
  size: `w-full h-full`,
  text: `text-center`
};

const registrationTitle = {
  text: `text-4xl tracking-widest text-white`,
  margin: `my-10`
};

const registrationForm = {
  display: `flex flex-col`,
  margin: `mx-auto`,
  size: `w-2/5`,
  color: `bg-slate-700`,
  padding: `p-10`,
  gap: `gap-y-14`,
  border: `rounded-xl`,
  shadow: `shadow-xl`,
  positioning: `my-auto`
};

const registrationSubtitle = {
  text: `text-left text-2xl tracking-widest text-white`
};

const registrationInputContainer = {
  display: `flex flex-row`,
  size: `w-full`,
  positioning: `justify-between`,
  color: `bg-slate-800`,
  padding: `p-5`,
  border: `rounded-xl`,
  shadow: `shadow-xl`
};

const registrationLabel = {
  text: `text-2xl font-normal text-white`,
  positioning: `my-auto`
};

const registrationInput = {
  size: `w-[13vw]`,
  border: `border-4 border-slate-400`,
  padding: `p-3`,
  rounded: `rounded-xl`,
  focus: `focus:outline-none`
};

const registrationSubmitButton = {
  size: `w-1/3 h-fit`,
  color: `bg-slate-400`,
  text: `text-white text-3xl tracking-widest`,
  padding: `p-3`,
  transition: `transition-all`,
  font: `font-light`,
  margin: `mx-auto`,
  border: `rounded-xl`,
  hover: `hover:outline hover:outline-4 hover:outline-offset-4`
};

const securityUpdateButton = {
  tracking: `tracking-widest`,
  color: `bg-slate-400`,
  padding: `p-5`,
  text: `text-xl`,
  border: `rounded-xl`,
  hover: `hover:outline hover:outline-4 hover:outline-offset-4`,
  transition: `transition-all`
};

const securityOptionContainer = {
  display: `flex flex-row`,
  positioning: `justify-between`,
  color: `bg-slate-800`,
  padding: `p-5`,
  border: `rounded-xl`,
  shadow: `shadow-xl`
};

const securityDeleteContainer = {
  display: `flex flex-col`,
  gap: `gap-y-10`,
  positioning: `justify-between`,
  color: `bg-slate-800`,
  padding: `p-8`,
  border: `rounded-xl`,
  shadow: `shadow-xl`,
  size: `w-fit`,
  margin: `mx-auto`
};

const securityContainerTitle = {
  text: `text-2xl tracking-widest`,
  content: `content-center`
};

const securityOverviewContainer = {
  size: `w-full h-fit`
};

const securityFormContainer = {
  display: `flex flex-col`,
  margin: `m-auto`,
  positioning: `justify-between`,
  size: `w-1/3`,
  gap: `gap-y-10`,
  text: `text-white`
};

const socialUserContainer = {
  display: `flex flex-col`,
  size: `h-fit w-full max-w-[55%]`,
  gap: `gap-y-10`,
  overflow: `overflow-auto`,
  color: `bg-slate-400`,
  padding: `p-5`,
  border: `border-2 rounded-xl`,
  shadow: `shadow-2xl`,
  margin: `m-auto`
};

const socialUserHeader = {
  size: `w-3/5`,
  display: `flex flex-row`,
  text: `text-2xl tracking-widest text-white`,
  positioning: `justify-between items-center`,
  margin: `mt-10 mx-auto`,
  padding: `p-1`,
  gap: `gap-x-5`
};

const socialUserAvatar = {
  size: `w-36 h-36`,
  margin: `m-auto`,
  border: `rounded-full border-8-transparent`,
  color: `bg-slate-100`,
  padding: `p-1`
};

const socialUserActionButton = {
  padding: `p-5`,
  color: `bg-slate-900`,
  size: `w-1/2`,
  border: `rounded-xl`,
  hover: `hover:outline hover:outline-2 hover:outline-offset-4`,
  transition: `transition-all`,
  margin: `mx-auto`
};

const socialUserInfoContainer = {
  size: `w-4/5`,
  display: `flex flex-row`,
  gap: `gap-x-10`,
  text: `text-2xl tracking-widest text-slate-100`,
  color: `bg-slate-800`,
  padding: `p-10`,
  positioning: `justify-between`,
  margin: `mx-auto`,
  shadow: `shadow-xl`,
  border: `rounded-xl`,
  font: `font-thin`
};

const socialUserLastInfoContainer = {
  size: `w-4/5`,
  margin: `mb-10 mx-auto`,
  display: `flex flex-col`,
  gap: `gap-x-10`,
  text: `text-2xl tracking-widest text-slate-100`,
  color: `bg-slate-800`,
  padding: `p-10`,
  positioning: `justify-between`,
  shadow: `shadow-xl`,
  border: `rounded-xl`,
  font: `font-thin`
};

const socialUserIntroLabel = {
  margin: `mr-auto mb-10`
};

const socialUserIntroText = {
  margin: `mx-auto`
};

const socialUserPendingText = {
  text: `text-white text-2xl tracking-widest`
};

const socialUserBlockedContainer = {
  margin: `m-auto`
};

const socialUserBlockedText = {
  tracking: `tracking-widest`,
  text: `text-2xl text-white`
};

export const PAGE = {
  // Activity Page
  activityContainer: `flex flex-col w-full`,
  activityHeader: Object.values(activityHeader).join(' '),
  activityTitle: Object.values(activityTitle).join(' '),
  activityButtonContainer: Object.values(activityButtonContainer).join(' '),
  activityBasicButton: Object.values(activityBasicButton).join(' '),
  activityActiveButton: Object.values(activityActiveButton).join(' '),
  
  // Welcome Page
  welcomePage: Object.values(welcomePage).join(' '),
  welcomeTitle: Object.values(welcomeTitle).join(' '),
  welcomeSwitchButton: Object.values(welcomeSwitchButton).join(' '),
  
  // Profile Pages
  profileHeader: Object.values(profileHeader).join(' '),
  profileAvatar: Object.values(profileAvatar).join(' '),
  profileTitleContainer: Object.values(profileTitleContainer).join(' '),
  profileTitle: Object.values(profileTitle).join(' '),
  profileContentContainer: Object.values(profileContentContainer).join(' '),
  profileInfoContainer: Object.values(profileInfoContainer).join(' '),
  profileEditableContainer: Object.values(profileEditableContainer).join(' '),
  profileEditButton: Object.values(profileEditButton).join(' '),
  profileTextarea: Object.values(profileTextarea).join(' '),
  profileTextDisplay: Object.values(profileTextDisplay).join(' '),
  profileSubmitButton: Object.values(profileSubmitButton).join(' '),
  profileIdentityMenuButton: Object.values(profileIdentityMenuButton).join(' '),
  profileActiveButton: Object.values(profileActiveButton).join(' '),
  
  // Registration Page
  registrationContainer: Object.values(registrationContainer).join(' '),
  registrationTitle: Object.values(registrationTitle).join(' '),
  registrationForm: Object.values(registrationForm).join(' '),
  registrationSubtitle: Object.values(registrationSubtitle).join(' '),
  registrationInputContainer: Object.values(registrationInputContainer).join(' '),
  registrationLabel: Object.values(registrationLabel).join(' '),
  registrationInput: Object.values(registrationInput).join(' '),
  registrationSubmitButton: Object.values(registrationSubmitButton).join(' '),
  registrationButtonContainer: `flex flex-row w-full`,
  
  // Security Page
  securityUpdateButton: Object.values(securityUpdateButton).join(' '),
  securityOptionContainer: Object.values(securityOptionContainer).join(' '),
  securityDeleteContainer: Object.values(securityDeleteContainer).join(' '),
  securityContainerTitle: Object.values(securityContainerTitle).join(' '),
  securityOverviewContainer: Object.values(securityOverviewContainer).join(' '),
  securityFormContainer: Object.values(securityFormContainer).join(' '),
  
  // Social User Page
  socialUserContainer: Object.values(socialUserContainer).join(' '),
  socialUserHeader: Object.values(socialUserHeader).join(' '),
  socialUserAvatar: Object.values(socialUserAvatar).join(' '),
  socialUserActionButton: Object.values(socialUserActionButton).join(' '),
  socialUserInfoContainer: Object.values(socialUserInfoContainer).join(' '),
  socialUserLastInfoContainer: Object.values(socialUserLastInfoContainer).join(' '),
  socialUserIntroLabel: Object.values(socialUserIntroLabel).join(' '),
  socialUserIntroText: Object.values(socialUserIntroText).join(' '),
  socialUserPendingText: Object.values(socialUserPendingText).join(' '),
  socialUserBlockedContainer: Object.values(socialUserBlockedContainer).join(' '),
  socialUserBlockedText: Object.values(socialUserBlockedText).join(' ')
} as const;