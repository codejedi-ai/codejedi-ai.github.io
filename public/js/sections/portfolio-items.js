let portfolioItems = [];
let portfolioFilters = [];
let portfolio_quotes = [];

// Fetch portfolio data from JSON file
async function fetchPortfolioData() {
    try {
        const response = await fetch('data/portfolio.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        portfolioItems = data.items;
        portfolioFilters = data.filters;
        
        // After data is loaded, generate the portfolio items and filters
        generateFilters();
        generatePortfolioItems();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback to hardcoded data if JSON fails to load
        portfolioItems = [
            {
                category: 'CV',
                title: 'K-Means Algorithm for Unsupervised Learning',
                image: 'img/bunny.bmp',
                link: 'vids/K-means_V1.mp4',
                description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
            },
            {
                category: 'CV',
                title: 'CNN for Hurricane Damage Classification',
                image: 'img/damage_no_damage.png',
                link: 'vids/Hurricane.mp4',
                description: 'Utilized Convolutional Neural Networks for classifying hurricane damage, aiding disaster response planning.'
            },
            {
                category: 'CV',
                title: 'Panoramic Image Stitching',
                image: 'img/ImageStitching.png',
                link: 'vids/PanoramicStich_1.mp4',
                description: 'Implemented homographies with Scikit libraries for panoramic image stitching, seamlessly blending visual elements.'
            },
            {
                category: 'RL',
                title: 'Deep Q-Learning for Game AI',
                image: 'img/portfolio/rl1.jpg',
                link: '#',
                description: 'Implemented Deep Q-Networks for training AI agents to play complex games with superhuman performance.'
            },
            {
                category: 'AWS',
                title: 'Serverless Architecture',
                image: 'img/portfolio/aws1.jpg',
                link: '#',
                description: 'Designed and deployed a scalable serverless application using AWS Lambda, API Gateway, and DynamoDB.'
            },
            {
                category: 'NLP',
                title: 'Sentiment Analysis Engine',
                image: 'img/portfolio/nlp1.jpg',
                link: '#',
                description: 'Built a sentiment analysis system for social media monitoring using transformer-based models.'
            }
        ];
        
        portfolioFilters = [
            {id: 'all', label: 'All', filter: '*'},
            {id: 'nengo', label: 'Neuroscience', filter: '.Nengo'},
            {id: 'rl', label: 'Reinforcement Learning', filter: '.RL'},
            {id: 'cv', label: 'Computer Vision', filter: '.CV'}, 
            {id: 'swe', label: 'Software Developments', filter: '.SWE'},
            {id: 'aws', label: 'AWS', filter: '.AWS'},
            {id: 'nlp', label: 'NLP', filter: '.NLP'}
        ];
        
        generateFilters();
        generatePortfolioItems();
    }
}

// Fetch quotes data from JSON file
async function fetchPortfolioQuotes() {
    try {
        const response = await fetch('data/quotes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        portfolio_quotes = data.portfolio;
        
        // After quotes are loaded, display a quote
        displayQuote();
    } catch (error) {
        console.error('Error loading quotes data:', error);
        // Fallback to hardcoded quotes
        portfolio_quotes = [
            {
                text: "Necessity is the mother of invention",
                author: "Plato"
            },
            {
                text: "Knowledge = Experience x Sensitivity",
                author: "Yuval Noah Harari"
            },
            {
                text: "The best way to predict the future is to create it",
                author: "Abraham Lincoln"
            }
        ];
        displayQuote();
    }
}

function generateFilters() {
    const filterList = document.querySelector('#filters ul.clearfix');
    
    if (!filterList) {
        console.error('Filter list not found');
        return;
    }
    
    // Clear existing content
    filterList.innerHTML = '';
    
    portfolioFilters.forEach(filter => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a class="${filter.id === 'all' ? 'active' : ''}" 
               href="#" 
               data-filter="${filter.filter}">
                ${filter.label}
            </a>
        `;
        filterList.appendChild(li);
    });

    // Add isotope click handlers
    const filterButtons = document.querySelectorAll('#filters a');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Add animation class to portfolio wrapper
            const portfolioWrapper = document.querySelector('#portfolio_wrapper');
            portfolioWrapper.classList.add('filtering');
            
            setTimeout(() => {
                portfolioWrapper.isotope({ filter: filterValue });
                
                // Remove animation class after filtering
                setTimeout(() => {
                    portfolioWrapper.classList.remove('filtering');
                }, 400);
            }, 200);
        });
    });
}


function generatePortfolioItems() {
    const wrapper = document.getElementById('portfolio_wrapper');
    
    if (!wrapper) {
        console.error('Portfolio wrapper not found');
        return;
    }
    
    // Clear existing content
    wrapper.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const figure = document.createElement('figure');
        figure.className = `portfolio-item ${item.category} isotope-item effect-oscar`;
        
        figure.innerHTML = `
            <span class="category-badge">${item.category}</span>
            <a href="${item.link}" class="fancybox">
                <div class="portfolio_img">
                    <img src="${item.image}" alt="${item.title}" />
                </div>
                <figcaption>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <div class="view-project">View Project</div>
                </figcaption>
            </a>
        `;
        
        wrapper.appendChild(figure);
    });
    
    // Initialize isotope after all items are added
    setTimeout(() => {
        if (typeof $.fn.isotope !== 'undefined') {
            $('#portfolio_wrapper').isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 30
                },
                percentPosition: true
            });
        }
    }, 100);
}


function generateRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    const quote = generateRandomQuote(portfolio_quotes);
    const quoteElement = document.querySelector('#Portfolio .section-title h6');
    if (quoteElement) {
        quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
    }
}
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchPortfolioData();
    fetchPortfolioQuotes();
});
