import { Filter, PortfolioProject } from '../classes/PortfolioProject.js';

// Define portfolio filters
const filters = [
    new Filter('all', 'All Projects', null, true),
    new Filter('cv', 'Computer Vision', '.CV'),
    new Filter('rl', 'Reinforcement Learning', '.RL'),
    new Filter('aws', 'AWS Projects', '.AWS'),
    new Filter('ml', 'Machine Learning', '.ML'),
    new Filter('web', 'Web Development', '.WEB')
];

// Define portfolio projects
const projects = [
    new PortfolioProject('CV', 'https://youtu.be/example1', 'img/portfolio/cv-project1.jpg', 'Object Detection System', 'Real-time object detection using YOLO and OpenCV'),
    new PortfolioProject('RL', 'https://youtu.be/example2', 'img/portfolio/rl-project1.jpg', 'Autonomous Agent', 'Reinforcement learning agent for complex environments'),
    new PortfolioProject('AWS', 'https://youtu.be/example3', 'img/portfolio/aws-project1.jpg', 'Serverless API', 'Scalable serverless architecture on AWS'),
    new PortfolioProject('ML', 'https://youtu.be/example4', 'img/portfolio/ml-project1.jpg', 'Predictive Analytics', 'Machine learning model for predictive analytics'),
    new PortfolioProject('WEB', 'https://youtu.be/example5', 'img/portfolio/web-project1.jpg', 'Interactive Dashboard', 'React-based interactive data visualization dashboard'),
    new PortfolioProject('CV', 'https://youtu.be/example6', 'img/portfolio/cv-project2.jpg', 'Facial Recognition', 'Advanced facial recognition system with emotion detection'),
    new PortfolioProject('RL', 'https://youtu.be/example7', 'img/portfolio/rl-project2.jpg', 'Game AI', 'Reinforcement learning for strategic game playing'),
    new PortfolioProject('AWS', 'https://youtu.be/example8', 'img/portfolio/aws-project2.jpg', 'Cloud Migration', 'Enterprise application migration to AWS cloud')
];

// Generate HTML for filters
function generateFilters(filters) {
    const filterHTML = filters.map(filter => filter.toHTML()).join('\n');
    return `
        <div class="portfolio-filter">
            <ul>
                ${filterHTML}
            </ul>
        </div>
    `;
}

// Generate HTML for all portfolio items
function generatePortfolioItems(projects) {
    return `
        <div class="portfolio-items isotope">
            ${projects.map(project => project.toHTML()).join('\n')}
        </div>
    `;
}

// Initialize portfolio section
function initPortfolio() {
    const portfolioSection = document.getElementById('Portfolio');
    
    if (portfolioSection) {
        // Create portfolio section content
        portfolioSection.innerHTML = `
            <div class="container">
                <h2>My Projects</h2>
                <div class="underline"></div>
                <p class="wow fadeInUp animated" data-wow-delay="0.3s">
                    Explore my latest projects across various domains of AI, machine learning, and software development.
                </p>
                ${generateFilters(filters)}
                ${generatePortfolioItems(projects)}
            </div>
        `;
        
        // Initialize isotope after content is loaded
        setTimeout(() => {
            const $container = $('.portfolio-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            
            // Add click handlers to filters
            $('.portfolio-filter a').click(function() {
                $('.portfolio-filter .active').removeClass('active');
                $(this).addClass('active');
                
                const selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
            
            // Initialize fancybox for project links
            $('.fancybox').fancybox({
                padding: 0,
                openEffect: 'elastic',
                openSpeed: 650,
                closeEffect: 'elastic',
                closeSpeed: 550,
                closeClick: true
            });
        }, 100);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPortfolio);
