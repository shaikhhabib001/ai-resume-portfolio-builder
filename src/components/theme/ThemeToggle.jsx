import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg dark:bg-gray-800 cursor-pointer dark:hover:bg-gray-700 shadow-sm text-gray-800"
      aria-label="Toggle theme"
      alt="Toggle theme is working only on sytem theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;