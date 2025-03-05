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
  console.log('Applying filter:', filterValue);
  
  if (window.jQuery && window.jQuery('#portfolio_wrapper').data('isotope')) {
    window.jQuery('#portfolio_wrapper').isotope({ filter: filterValue });
  } else {
    console.error('Isotope not properly initialized');
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
    // Make sure the category class matches what we're filtering on
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
  
  // Wait a bit to ensure all images are loaded
  setTimeout(() => {
    try {
      // Initialize Isotope with options
      const $grid = jQuery('#portfolio_wrapper');
      $grid.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      
      console.log('Isotope initialized successfully');
      
      // Store reference for later use
      window.isotope = $grid.data('isotope');
      
      // Trigger a resize event to force Isotope to recalculate layout
      window.dispatchEvent(new Event('resize'));
      
      // Set initial filter if needed
      const activeFilter = document.querySelector('#filters a.active');
      if (activeFilter) {
        const filterValue = activeFilter.getAttribute('data-filter');
        $grid.isotope({ filter: filterValue });
      }
    } catch (error) {
      console.error('Error initializing Isotope:', error);
    }
  }, 500);
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

/**
 * Debug function to help troubleshoot Isotope issues
 */
function debugIsotope() {
  console.log('Debugging Isotope:');
  
  // Check if jQuery is loaded
  console.log('jQuery loaded:', typeof jQuery !== 'undefined');
  
  // Check if Isotope plugin is available
  console.log('Isotope plugin available:', typeof jQuery !== 'undefined' && typeof jQuery.fn.isotope !== 'undefined');
  
  // Check portfolio wrapper
  const $wrapper = jQuery('#portfolio_wrapper');
  console.log('Portfolio wrapper exists:', $wrapper.length > 0);
  
  // Check if Isotope is initialized on the wrapper
  console.log('Isotope initialized on wrapper:', $wrapper.data('isotope') !== undefined);
  
  // Check portfolio items
  const $items = $wrapper.find('.portfolio-item');
  console.log('Number of portfolio items:', $items.length);
  
  // Log categories of all items
  console.log('Item categories:');
  $items.each(function() {
    const classes = this.className.split(' ');
    const category = classes.find(cls => ['CV', 'Nengo', 'RL', 'SWE', 'AWS'].includes(cls));
    console.log(`- ${this.querySelector('h2 span').textContent}: ${category || 'No category'}`);
  });
  
  // Check filters
  const $filters = jQuery('#filters a');
  console.log('Number of filters:', $filters.length);
  
  // Log filter values
  console.log('Filter values:');
  $filters.each(function() {
    console.log(`- ${this.textContent.trim()}: ${this.getAttribute('data-filter')}`);
  });
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  
  // Add debug button in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug Isotope';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.padding = '5px 10px';
    debugBtn.style.background = '#f8f8f8';
    debugBtn.style.border = '1px solid #ddd';
    debugBtn.style.borderRadius = '4px';
    debugBtn.style.cursor = 'pointer';
    debugBtn.addEventListener('click', debugIsotope);
    document.body.appendChild(debugBtn);
  }
});

// Export functions for potential reuse or testing
export {
  initPortfolio,
  fetchPortfolioData,
  renderProjects,
  renderFilters,
  debugIsotope
};
