/**
 * Sticky Navbar Component
 * 
 * This component creates a navbar that always sticks to the top of the page,
 * regardless of scroll position.
 */

export function initStickyNavbar() {
    // Get the navbar element
    const navbar = document.querySelector('.navbar-fixed-top');
    
    if (!navbar) {
        console.error('Navbar element not found');
        return;
    }
    
    // Always make the navbar fixed at the top
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.width = '100%';
    navbar.style.zIndex = '1000';
    
    // Add some padding to the body to prevent content from hiding behind the navbar
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
    
    // Remove any scroll event listeners that might be changing the navbar's position
    window.removeEventListener('scroll', handleScroll);
    
    console.log('Sticky navbar initialized');
}

// Placeholder for any existing scroll handler that we're disabling
function handleScroll() {
    // This is intentionally empty as we're removing any existing scroll handlers
}

// Initialize the sticky navbar when the DOM is loaded
document.addEventListener('DOMContentLoaded', initStickyNavbar);
