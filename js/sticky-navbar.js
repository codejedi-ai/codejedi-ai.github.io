// Sticky Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar element
    const header = document.getElementById('header_wrapper');
    const body = document.body;
    
    // Get the offset position of the navbar
    const sticky = header.offsetTop;
    
    // Add the sticky class to the navbar when you reach its scroll position
    // Remove the sticky class when you leave the scroll position
    function handleScroll() {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
            body.classList.add('has-sticky-nav');
        } else {
            header.classList.remove('sticky');
            body.classList.remove('has-sticky-nav');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
});
