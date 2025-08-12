import { useEffect, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
import { clerk } from '../lib/clerk';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = () => {
      const signedIn = clerk.user !== null;
      setIsSignedIn(signedIn);
      
      if (signedIn) {
        navigate('/');
      }
    };

    checkAuthState();

    // Listen for auth state changes
    const unsubscribe = clerk.addListener(checkAuthState);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigate]);

  if (isSignedIn) {
    return null; // This will redirect to home
  }

  const handleSignIn = () => {
    const redirectUrl = encodeURIComponent(`${window.location.origin}/dashboard`);
    window.location.href = `https://regular-fox-83.accounts.dev/sign-in?redirect_url=${redirectUrl}`;
  };

  const handleSignUp = () => {
    const redirectUrl = encodeURIComponent(`${window.location.origin}/dashboard`);
    window.location.href = `https://regular-fox-83.accounts.dev/sign-up?redirect_url=${redirectUrl}`;
  };

  return (
    <section className="max-w-md mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Join the Koalition
        </h2>
        <p className="text-gray-400 mb-8">
          Sign in to access exclusive content, join events, and connect with fellow hackers.
        </p>
      </div>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-8">
          <div className="space-y-4">
            <Button
              onClick={handleSignIn}
              className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3"
            >
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>
            
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 py-3"
            >
              Create Account
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Auth;