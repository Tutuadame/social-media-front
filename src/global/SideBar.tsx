import { useAuth0 } from '@auth0/auth0-react';
import { ActivityButton, HomeButton, LogOutButton, MessagesButton, NotificationButton, IdentityButton } from '../components';
import { IconButton } from '../components/Button/General/IconButton';
import { createSvg } from '../utils/htmlUtils';
import { useState } from 'react';
import { MadeByMark } from './MadeByMark';

export const SideBar = () => {
  const sidebarMoverSVG = createSvg(['m8.25 4.5 7.5 7.5-7.5 7.5'], 2, "size-9");    
  const {isAuthenticated} = useAuth0();
  const [open, setOpen] = useState(true);

  const getSidebarStyles = (isOpen: boolean) => ({
      container: `relative transition-all bg-slate-800 h-[100vh] border-r-4 border-white shadow-md flex flex-col text-white ${
          isOpen ? 'justify-start gap-y-12 p-6 w-3/12' : 'w-[3vw]'
      }`,
      toggleButton: `absolute top-1/2 right-0 translate-x-1/2 z-10 items-center w-14 h-14 bg-slate-800 text-white p-2 transition-all rounded-full 
          outline outline-4 hover:outline-white hover:text-slate-800 hover:bg-slate-100 ${
          isOpen ? 'rotate-180' : ''
      }`,
      title: isOpen ? 'mx-auto h-fit tracking-widest text-3xl' : 'hidden',
      nav: isOpen ? 'flex flex-row w-full transition-all h-fit gap-10 flex-wrap justify-evenly' : 'hidden',
      madeByStyle: isOpen ? "text-center tracking-widest content-end mt-auto" : "hidden",
  });

  const styles = getSidebarStyles(open);

  if (!isAuthenticated) return null;

  return (
      <div className={styles.container}>
          <h1 className={styles.title}>Dashboard</h1>
          <nav className={styles.nav}>
              <IdentityButton key={"IdentityButton"}/>
              <LogOutButton key={"LogOutButton"}/>
              <HomeButton key={"HomeButton"}/>
              <ActivityButton key={"ActivityButton"}/>
              <MessagesButton key={"MessagesButton"}/>
              <NotificationButton key={"NotificationButton"}/>
          </nav>
          <IconButton
              style={styles.toggleButton}
              action={() => setOpen(prev => !prev)}
              ariaLabel="move menu"
          >
              {sidebarMoverSVG}
          </IconButton>
          <MadeByMark  style={styles.madeByStyle}/>
      </div>
  );
};
