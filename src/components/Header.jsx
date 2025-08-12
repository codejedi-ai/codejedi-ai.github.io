import { useEffect, useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { clerk } from '../lib/clerk';
import UserButton from './UserButton';
import AuthButton from './AuthButton';

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuthState = () => {
      setIsSignedIn(clerk.user !== null);
    };

    checkAuthState();

    // Listen for auth state changes
    const unsubscribe = clerk.addListener(checkAuthState);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <header className="bg-black border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo_ngb.png"
              alt="DKK Logo"
              className="w-10 h-10 mr-3"
            />
            <span className="text-xl font-bold text-white">
              <span className="text-primary">DUO KEYBOARD </span>
              <span className="text-white">KOALITION</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            {isSignedIn ? (
              // Protected navigation for logged-in users
              <>
                <Link to="/dashboard" className="text-white hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/my-projects" className="text-white hover:text-primary transition-colors">My Projects</Link>
                <Link to="/projects" className="text-white hover:text-primary transition-colors">Projects</Link>
                <Link to="/events" className="text-white hover:text-primary transition-colors">Events</Link>
              </>
            ) : (
              // Public navigation for non-logged-in users
              <>
                <Link to="/" className="text-white hover:text-primary transition-colors">Home</Link>
                <Link to="/projects" className="text-white hover:text-primary transition-colors">Projects</Link>
                <Link to="/events" className="text-white hover:text-primary transition-colors">Events</Link>
              </>
            )}
            <div className="flex items-center">
              <UserButton />
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;