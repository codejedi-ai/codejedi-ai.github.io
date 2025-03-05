/**
 * Portfolio Component
 * 
 * This module handles the portfolio section of the website, including:
 * - Fetching project data from JSON
 * - Rendering projects to the DOM
 * - Handling filter functionality
 */

// DOM elements
let portfolioSection;
let filterContainer;
let projectsContainer;

// Data storage
let portfolioData = {
  projects: [],
  filters: []
};

/**
 * Initialize the portfolio component
 */
function initPortfolio() {
  // Get DOM elements
  portfolioSection = document.querySelector('#Portfolio');
  
  if (!portfolioSection) {
    console.error('Portfolio section not found in the DOM');
    return;
  }
  
  // Create initial structure
  createPortfolioStructure();
  
  // Fetch data and render
  fetchPortfolioData()
    .then(() => {
      renderFilters();
      renderProjects();
      initializeIsotope();
    })
    .catch(error => {
      console.error('Error initializing portfolio:', error);
      displayErrorMessage();
    });
}

/**
 * Create the basic portfolio structure
 */
function createPortfolioStructure() {
  portfolioSection.innerHTML = `
    <!-- Container -->
    <div class="container portfolio_title">
      <!-- Title -->
      <div class="section-title">
        <h2>Projects</h2>
        <h6>Necessity is the mother of invention</h6>
      </div>
    </div>
    <!-- Container -->

    <div class="portfolio-top"></div>

    <!-- Portfolio Filters -->
    <div class="portfolio">
      <div class="filter-container sixteen columns">
        <div id="filters">
          <ul class="clearfix"></ul>
        </div>
      </div>
      <!--/Portfolio Filters -->

      <!-- Portfolio Wrapper -->
      <div class="isotope fadeInLeft animated wow grid" id="portfolio_wrapper">
        <!-- Projects will be loaded here -->
        <div class="loading-indicator">Loading projects...</div>
      </div>
      <!--/Portfolio Wrapper -->
    </div>
    <!--/Portfolio Filters -->

    <div class="portfolio_btm"></div>

    <div id="project_container">
      <div class="clear"></div>
      <div id="project_data"></div>
    </div>
  `;
  
  // Update references to newly created elements
  filterContainer = portfolioSection.querySelector('#filters ul');
  projectsContainer = portfolioSection.querySelector('#portfolio_wrapper');
}

/**
 * Fetch portfolio data from JSON file
 */
async function fetchPortfolioData() {
  try {
    const response = await fetch('/src/data/portfolio-data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    portfolioData = await response.json();
    return portfolioData;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

/**
 * Render filter buttons based on data
 */
function renderFilters() {
  // Clear existing filters
  filterContainer.innerHTML = '';
  
  // Add filter title
  const filterTitle = document.createElement('div');
  filterTitle.className = 'filter-title';
  filterTitle.innerHTML = '<h4>Filter Projects:</h4>';
  filterContainer.parentNode.insertBefore(filterTitle, filterContainer);
  
  // Create filter elements
  portfolioData.filters.forEach(filter => {
    const filterItem = document.createElement('li');
    
    filterItem.innerHTML = `
      <a ${filter.id ? `id="${filter.id}"` : ''} 
         href="#" 
         data-filter="${filter.id === 'all' ? '*' : '.' + filter.cssClass}" 
         class="${filter.active ? 'active' : ''}">
          <h5>${filter.label}</h5>
      </a>
    `;
    
    // Add click event listener
    const filterLink = filterItem.querySelector('a');
    filterLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleFilterClick(filterLink, filter);
    });
    
    filterContainer.appendChild(filterItem);
  });
  
  // Add animation to filters
  setTimeout(() => {
    const filterItems = filterContainer.querySelectorAll('li');
    filterItems.forEach((item, index) => {
      item.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.05}s`;
      item.style.opacity = '0';
    });
  }, 100);
}

/**
 * Handle filter button clicks
 */
function handleFilterClick(filterElement, filter) {
  // Update active state in UI
  const allFilters = filterContainer.querySelectorAll('a');
  allFilters.forEach(el => el.classList.remove('active'));
  filterElement.classList.add('active');
  
  // Apply filter using Isotope
  const filterValue = filterElement.getAttribute('data-filter');
  if (window.isotope) {
    window.isotope.arrange({ filter: filterValue });
  }
}

/**
 * Render projects to the DOM
 */
function renderProjects() {
  // Clear loading indicator
  projectsContainer.innerHTML = '';
  
  // Create project elements
  portfolioData.projects.forEach(project => {
    const projectElement = document.createElement('figure');
    projectElement.className = `portfolio-item one-four ${project.category} isotope-item effect-oscar`;
    
    projectElement.innerHTML = `
      <a href="${project.href}" class="fancybox">
        <div class="portfolio_img">
          <img src="${project.imageUrl}" alt="${project.title}" />
        </div>
        <figcaption>
          <div>
            <h2><span>${project.title}</span></h2>
            <p>${project.description}</p>
          </div>
        </figcaption>
      </a>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
}

/**
 * Initialize Isotope for filtering and layout
 */
function initializeIsotope() {
  // Make sure jQuery and Isotope are available
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.isotope === 'undefined') {
    console.error('jQuery or Isotope not loaded');
    return;
  }
  
  // Initialize Isotope with options
  window.isotope = jQuery('#portfolio_wrapper').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    }
  });
}

/**
 * Display error message if data loading fails
 */
function displayErrorMessage() {
  projectsContainer.innerHTML = `
    <div class="error-message">
      <h3>Unable to load projects</h3>
      <p>Please try refreshing the page or check back later.</p>
    </div>
  `;
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export functions for potential reuse or testing
export {
  initPortfolio,
  fetchPortfolioData,
  renderProjects,
  renderFilters
};
