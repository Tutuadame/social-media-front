import { useTheme } from '../../../../context/Theme/ThemeContext';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-20 h-20 p-3 rounded bg-slate-100 hover:bg-slate-800 hover:text-slate-200 transition-all"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};