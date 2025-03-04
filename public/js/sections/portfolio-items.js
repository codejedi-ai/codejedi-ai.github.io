let portfolioItems = [];
let portfolioFilters = [];
let portfolio_quotes = [];

// Fetch portfolio data from JSON file
async function fetchPortfolioData() {
    try {
        const response = await fetch('/data/portfolio.json');
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
    }
}

// Fetch quotes data from JSON file
async function fetchPortfolioQuotes() {
    try {
        const response = await fetch('/data/quotes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        portfolio_quotes = data.portfolio;
        
        // After quotes are loaded, display a quote
        displayQuote();
    } catch (error) {
        console.error('Error loading quotes data:', error);
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
        figure.className = `portfolio-item ${item.category} isotope-item`;
        
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
                    gutter: 25
                }
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
// Within the portfolio section, the following HTML structure is expected:
// <!-- Container -->
// <div class="container portfolio_title">
//     <!-- Title -->
//     <div class="section-title">
//         <h2>Projects</h2>
//         <h6></h6> <!-- Quote will be inserted here --></div>
// </div>
// <!-- Container -->
// 
// <div class="portfolio-top"></div>
// 
// <!-- Portfolio Filters -->
// <div class="portfolio">
//     <div id="filters" class="sixteen columns">
//         <ul class="clearfix">
// 
// 
//         </ul>
//     </div>
//     <!--/Portfolio Filters -->
//     <!-- Portfolio Wrapper -->
//     <div class="isotope fadeInLeft animated wow grid" id="portfolio_wrapper">
//         <!-- Portfolio Item -->
// 
//     </div>
//     <!--/Portfolio Wrapper -->
// </div>
// <!--/Portfolio Filters -->
// 
// <div class="portfolio_btm"></div>
// 
// <div id="project_container">
//     <div class="clear"></div>
//     <div id="project_data"></div>
// </div>
//     <!-- Add script reference -->
// 
