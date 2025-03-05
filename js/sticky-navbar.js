// Sticky Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar element
    const header = document.getElementById('header_wrapper');
    const body = document.body;
    const navLinks = document.querySelectorAll('#mainNav a');
    
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
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for sticky header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('#mainNav li').forEach(item => {
                    item.classList.remove('active');
                });
                this.parentElement.classList.add('active');
                
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                const mainNav = document.getElementById('main-nav');
                if (window.getComputedStyle(navToggle).display !== 'none' && mainNav.classList.contains('in')) {
                    navToggle.click();
                }
            }
        });
    });
    
    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + header.offsetHeight + 10;
        
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
});
