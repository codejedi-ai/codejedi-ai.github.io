export const portfolioItems = [
    {
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: '/img/bunny.bmp',
        link: '/vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    }
];

export const portfolioFilters = [
    {id: 'all', label: 'All', filter: '*'},
    {id: 'nengo', label: 'Neuroscience', filter: '.Nengo'},
    {id: 'rl', label: 'Reinforcement Learning', filter: '.RL'},
    {id: 'cv', label: 'Computer Vision', filter: '.CV'}, 
    {id: 'swe', label: 'Software Developments', filter: '.SWE'},
    {id: 'aws', label: 'AWS', filter: '.AWS'}
];

export const portfolioQuotes = [
    {
        text: "Necessity is the mother of invention",
        author: "Plato"
    },
    {
        text: "Knowledge = Experience x Sensitivity",
        author: "Yuval Noah Harari"
    }
];

function generateTitleSection() {
    return `
        <div class="container portfolio_title">
            <div class="section-title">
                <h2>Projects</h2>
                <h6></h6>
            </div>
        </div>
    `;
}

function generateFiltersSection() {
    return `
        <div class="portfolio">
            <div id="filters" class="sixteen columns">
                <ul class="clearfix"></ul>
            </div>
        </div>
    `;
}

function generatePortfolioWrapper() {
    return `
        <div class="isotope fadeInLeft animated wow grid" id="portfolio_wrapper">
        </div>
    `;
}

function generateProjectContainer() {
    return `
        <div id="project_container">
            <div class="clear"></div>
            <div id="project_data"></div>
        </div>
    `;
}

export function generatePortfolioSection() {
    let section = document.getElementById('Portfolio');
    
    if (!section) {
        section = document.createElement('section');
        section.id = 'Portfolio';
        section.className = 'content';
        document.body.appendChild(section);
    }

    section.innerHTML = `
        ${generateTitleSection()}
        <div class="portfolio-top"></div>
        ${generateFiltersSection()}
        ${generatePortfolioWrapper()}
        <div class="portfolio_btm"></div>
        ${generateProjectContainer()}
    `;
}

export function initializePortfolio() {
    generatePortfolioSection();
    populateFilters();
    populatePortfolioItems();
    displayQuote();
    initializeIsotope();
}

function populateFilters() {
    const filterList = document.querySelector('#filters ul.clearfix');
    if (!filterList) return;
    
    portfolioFilters.forEach(filter => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a class="${filter.id === 'all' ? 'active' : ''}" 
               href="#" 
               data-filter="${filter.filter}">
                <h5>${filter.label}</h5>
            </a>
        `;
        filterList.appendChild(li);
    });
}

function populatePortfolioItems() {
    const wrapper = document.getElementById('portfolio_wrapper');
    if (!wrapper) return;
    
    portfolioItems.forEach(item => {
        const figure = document.createElement('figure');
        figure.className = `portfolio-item one-four ${item.category} isotope-item effect-oscar`;
        
        figure.innerHTML = `
            <a href="${item.link}" class="fancybox">
                <div class="portfolio_img">
                    <img src="${item.image}" alt="Portfolio" />
                </div>
                <figcaption>
                    <div>
                        <h2><span>${item.title}</span></h2>
                        <p>${item.description}</p>
                    </div>
                </figcaption>
            </a>
        `;
        
        wrapper.appendChild(figure);
    });
}

function displayQuote() {
    const quote = portfolioQuotes[Math.floor(Math.random() * portfolioQuotes.length)];
    const quoteElement = document.querySelector('#Portfolio .section-title h6');
    if (quoteElement) {
        quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
    }
}

function initializeIsotope() {
    const container = document.querySelector('#portfolio_wrapper');
    if (!container) return;

    const filterButtons = document.querySelectorAll('#filters a');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            $(container).isotope({ filter: filterValue });
        });
    });

    // Initialize Isotope
    $(container).isotope({
        layoutMode: 'fitRows',
        animationEngine: 'best-available'
    });
}