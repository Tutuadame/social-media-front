import { Theme } from '../context/Theme/ThemeContext';

export const getBackgroundStyle = (theme: Theme): string => {
  return theme === 'light' ? 'bg-slate-200' : 'bg-slate-800';
};

export const getLayoutStyles = (theme: Theme) => {
  const bgStyle = getBackgroundStyle(theme);
  
  return {
    basic: `flex flex-row flex-nowrap ${bgStyle}`,
    main: `flex flex-row flex-nowrap flex-auto ${bgStyle} overflow-hidden`,
  };
};