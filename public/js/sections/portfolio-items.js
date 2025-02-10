const portfolioItems = [
    {
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },{
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },{
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },{
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },{
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },{
        category: 'CV',
        title: 'K-Means Algorithm for Unsupervised Learning',
        image: 'img/bunny.bmp',
        link: 'vids/K-means_V1.mp4',
        description: 'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    },
    // ... more items
];
const portfolioFilters = [
    {id: 'all', label: 'All', filter: '*'},
    {id: 'nengo', label: 'Neuroscience', filter: '.Nengo'},
    {id: 'rl', label: 'Reinforcement Learning', filter: '.RL'},
    {id: 'cv', label: 'Computer Vision', filter: '.CV'}, 
    {id: 'swe', label: 'Software Developments', filter: '.SWE'},
    {id: 'aws', label: 'AWS', filter: '.AWS'}
];
const portfolio_quotes = [
    {
        text: "Necessity is the mother of invention",
        author: "Plato"
    },
    {
        text: "Knowledge = Experience x Sensitivity",
        author: "Yuval Noah Harari"
    }
];

function generateFilters() {
    const filterList = document.querySelector('#filters ul.clearfix');
    
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
            const container = document.querySelector('#portfolio_wrapper');
            container.isotope({ filter: filterValue });
        });
    });
}


function generatePortfolioItems() {
    const wrapper = document.getElementById('portfolio_wrapper');
    
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
document.addEventListener('DOMContentLoaded', generateFilters);
// Call after DOM loads
document.addEventListener('DOMContentLoaded', generatePortfolioItems);
document.addEventListener('DOMContentLoaded', displayQuote);
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