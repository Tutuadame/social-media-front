import tw from 'tw-classed';

const DARK_COLOR = `-slate-800`;
const LIGHT_COLOR = `-blue-200`;

const basicButtonStyle = {
  hover: `hover:shadow-xl`,
  positioning: `items-center`,
  transition: `transition-all`,
  border: `rounded`,
  shadow: `shadow-xl`
};

const lightStyle = {
  hover: `hover:bg-orange-300 hover:text-black`,
  default: `bg-blue-200 text-black`
};

const darkStyle = {
  hover: `hover:bg-blue-200 hover:text-slate-800`,
  backgroundColor: `bg-orange-300`,
  textColor: `text-black`
};

export const Button = tw('button', Object.values(basicButtonStyle).join(' '), {
    variants: {
      mode: {
        light: Object.values(lightStyle).join(' '),
        dark: Object.values(darkStyle).join(' ')
      },
      type:{
        default: "button",
        submit: "submit",
        hidden: "hidden"
      },
      role: {
        dashboard: 'w-fit flex flex-row items-center justify-start gap-10 group',
        dashboardMini: 'w-20 h-20 flex flex-row items-center justify-start gap-10 group mx-auto',
        loader: 'mt-10 p-3 rounded-full absolute bottom-0 translate-x-2/4',
        header: '',
        submit: '',
        link: '',
        interact: '',
        accept: '',
      },
      size: {
        small: '',
        medium: 'text-2xl tracking-wide p-3 m-2',
        large: ''
      }
    },
    defaultVariants: {
      mode: 'light',
      type: 'default',
      size: 'medium'
    }
});

const dashboardButtonTitle = {
  text: `text-center text-2xl`,
  size: `w-auto`,
  tracking: `tracking-widest`,
  transition: `transition-all`,
  hover: `group-hover:tracking-[.3rem]`
};

export const DashboardButtonTitle = tw('p', Object.values(dashboardButtonTitle).join(' '));

const notificationCount = {
  position: `absolute top-0 right-1`,
  transform: `-translate-y-1/2`,
  zIndex: `z-20`,
  background: `bg-red-900`,
  size: `w-8 h-8`,
  border: `rounded-full`,
  margin: `my-auto`,
  text: `text-center text-slate-100`,
  content: `content-center`
};

export const NotificationCounter = tw('p', 'hidden', {
  variants: {
    style: {
      show: Object.values(notificationCount).join(' '),
      hide: 'hidden',
    }
  }
});

const toggleDashboard = {
  size: `w-full h-20`,
  transition: `transition-all duration-300 ease-in-out`,
  border: `rounded`
};

export const DashboardToggle = tw('button', Object.values(toggleDashboard).join(' '), {
  variants: {
    style: {
      open: 'rotate-180 mx-auto',
      close: 'p-4'
    }
  },
  defaultVariants: {
    style: 'open',
  }
});