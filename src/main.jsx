import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
// import PortfolioPreview from './components/PortfolioPreview.jsx';

// Your router setup is correct, no changes needed here
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <BuilderPage /> },
      // { path: 'builder', element: <BuilderPage /> },
      { path: 'login', element: <LoginPage /> },
      // { path: 'portfolio', element: <PortfolioPreview /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ResumeProvider>
        <RouterProvider router={router} />
      </ResumeProvider>
    </ThemeProvider>
  </React.StrictMode>
);