/**
 * Navbar JavaScript
 * Handles smooth scrolling and active menu highlighting
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar element
    const navbar = document.querySelector('.navbar-fixed-top');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add fixed class to navbar
    navbar.classList.add('fixed');
    
    // Add padding to body to prevent content from hiding behind navbar
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('.nav-links li').forEach(item => {
                    item.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            }
        });
    });
    
    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + navbar.offsetHeight + 10;
        
        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute('href'));
            
            if (section && 
                section.offsetTop <= fromTop && 
                section.offsetTop + section.offsetHeight > fromTop) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    });
    
    // Handle window resize to adjust body padding if navbar height changes
    window.addEventListener('resize', () => {
        const updatedNavbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = `${updatedNavbarHeight}px`;
    });
});
