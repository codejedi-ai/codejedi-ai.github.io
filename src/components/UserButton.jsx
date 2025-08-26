import { useEffect, useRef, useState } from 'preact/hooks';
import { clerk } from '../lib/clerk';

function UserButton() {
  const userButtonRef = useRef(null);
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

  useEffect(() => {
    if (isSignedIn && userButtonRef.current) {
      // Clear any existing content
      userButtonRef.current.innerHTML = '';
      
      // Create a simple user button that links to the user profile
      const user = clerk.user;
      if (user) {
        const userButton = document.createElement('div');
        userButton.className = 'flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity';
        userButton.innerHTML = `
          <img 
            src="${user.imageUrl}" 
            alt="${user.fullName || user.emailAddresses[0]?.emailAddress}" 
            class="w-8 h-8 rounded-full border border-gray-600"
          />
          <span class="text-white text-sm hidden sm:block">${user.firstName || 'User'}</span>
        `;
        
        userButton.addEventListener('click', () => {
          const redirectUrl = encodeURIComponent(`${window.location.origin}/dashboard`);
          window.location.href = `https://regular-fox-83.accounts.dev/user?redirect_url=${redirectUrl}`;
        });
        
        userButtonRef.current.appendChild(userButton);
      }
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  return <div ref={userButtonRef} className="flex items-center" />;
}

export default UserButton;
