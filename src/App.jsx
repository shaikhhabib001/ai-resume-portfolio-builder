import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// You can add a Navbar or Footer here if you want a consistent layout
function App() {
  return (
    <div className="font-sans antialiased min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header />
      <main className="">
        {/* The Outlet component renders the active child route */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;