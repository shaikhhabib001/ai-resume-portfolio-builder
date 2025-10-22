import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebaseConfig';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in: ", result.user);
      // You can redirect the user or update the UI here
       window.location.href = '/';
    } catch (error) {
      console.error("Error during sign in: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link to="/" className="mb-6 text-black-600 text-lg font-bold hover:underline">Go Back</Link>
      <p className="font-bold text-md mb-4">or</p>
      <h1 className="text-3xl font-bold text-black-600 mb-6">Login to Save Your Progress</h1>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center px-6 py-3 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-6 h-6 mr-4" />
        <span className="font-semibold text-gray-700">Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginPage;