import { Link } from 'react-router-dom';
import ThemeToggle from './theme/ThemeToggle';

const Header = () => {
  return (
    <header className="bg-blue-600 dark:bg-blue-700 text-white shadow-md"> {/* 2. Add dark style */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AI Resume Builder</Link>
        <div className="flex items-center gap-4">
          {/* <Link to="/" className="px-4 hover:text-gray-300">Home</Link>
          <Link to="/builder" className="px-4 hover:text-gray-300">Builder</Link> */}
          <ThemeToggle />
          <Link to="/login" className="px-4 py-2 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;