import { useEffect, useState } from 'preact/hooks';
import { Navigate } from 'react-router-dom';
import { clerk } from '../lib/clerk';

function ProtectedRoute({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(null); // null = loading, true/false = auth state

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

  // Show loading state while checking auth
  if (isSignedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Redirect to auth page if not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  // Render protected content if signed in
  return children;
}

export default ProtectedRoute;
