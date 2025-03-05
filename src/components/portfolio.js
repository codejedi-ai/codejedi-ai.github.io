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
      <div class="isotope grid" id="portfolio_wrapper">
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
  
  // Create "All" filter first
  const allFilterItem = document.createElement('li');
  allFilterItem.innerHTML = `
    <a id="all" href="#" data-filter="*" class="active">
      <h5>All</h5>
    </a>
  `;
  
  // Add click event listener for All filter
  const allFilterLink = allFilterItem.querySelector('a');
  allFilterLink.addEventListener('click', (e) => {
    e.preventDefault();
    handleFilterClick(allFilterLink, { id: 'all', label: 'All' });
  });
  
  filterContainer.appendChild(allFilterItem);
  
  // Get unique categories from projects
  const categories = [...new Set(portfolioData.projects.map(project => project.category))];
  
  // Create filter elements for each category
  categories.forEach(category => {
    const filterItem = document.createElement('li');
    
    filterItem.innerHTML = `
      <a id="${category}" href="#" data-filter=".${category}">
        <h5>${category}</h5>
      </a>
    `;
    
    // Add click event listener
    const filterLink = filterItem.querySelector('a');
    filterLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleFilterClick(filterLink, { id: category, label: category });
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
  
  // Get filter value
  const filterValue = filterElement.getAttribute('data-filter');
  console.log('Applying filter:', filterValue);
  
  // Get all portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Show/hide items based on filter
  if (filter.id === 'all') {
    // Show all items
    portfolioItems.forEach(item => {
      item.style.display = 'block';
    });
  } else {
    // Show only items with matching category
    portfolioItems.forEach(item => {
      // Check if the item has a data-category attribute matching the filter
      if (item.getAttribute('data-category') === filter.id) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
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
    // Use the exact class requested for all items
    projectElement.className = `portfolio-item CV`;
    
    // Add data-category attribute for filtering
    projectElement.setAttribute('data-category', project.category);
    
    projectElement.innerHTML = `
      <a href="${project.href}" class="fancybox">
        <div class="portfolio_img">
          <img src="${project.imageUrl}" alt="${project.title}" />
        </div>
        <figcaption>
          <div>
            <h2><span>${project.title}</span></h2>
            <p>${project.description}</p>
            <span class="category-tag">${project.category}</span>
          </div>
        </figcaption>
      </a>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
}

/**
 * Initialize portfolio layout
 */
function initializeIsotope() {
  // Wait a bit to ensure all images are loaded
  setTimeout(() => {
    try {
      // Apply simple grid layout
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      
      // Make all items visible initially
      portfolioItems.forEach(item => {
        item.style.display = 'block';
      });
      
      console.log('Portfolio grid initialized successfully');
      
      // Trigger a resize event to force layout recalculation
      window.dispatchEvent(new Event('resize'));
    } catch (error) {
      console.error('Error initializing portfolio grid:', error);
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
 * Debug function to help troubleshoot portfolio issues
 */
function debugPortfolio() {
  console.log('Debugging Portfolio:');
  
  // Check portfolio wrapper
  const wrapper = document.getElementById('portfolio_wrapper');
  console.log('Portfolio wrapper exists:', !!wrapper);
  
  // Check portfolio items
  const items = document.querySelectorAll('.portfolio-item');
  console.log('Number of portfolio items:', items.length);
  
  // Log categories of all items
  console.log('Item categories:');
  items.forEach(item => {
    const title = item.querySelector('h2 span')?.textContent || 'No title';
    const category = item.getAttribute('data-category') || 'No category';
    console.log(`- ${title}: ${category}`);
  });
  
  // Check filters
  const filters = document.querySelectorAll('#filters a');
  console.log('Number of filters:', filters.length);
  
  // Log filter values
  console.log('Filter values:');
  filters.forEach(filter => {
    console.log(`- ${filter.textContent.trim()}: ${filter.getAttribute('data-filter')}, Active: ${filter.classList.contains('active')}`);
  });
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  
  // Add debug button in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug Portfolio';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.padding = '5px 10px';
    debugBtn.style.background = '#f8f8f8';
    debugBtn.style.border = '1px solid #ddd';
    debugBtn.style.borderRadius = '4px';
    debugBtn.style.cursor = 'pointer';
    debugBtn.addEventListener('click', debugPortfolio);
    document.body.appendChild(debugBtn);
  }
});

// Export functions for potential reuse or testing
export {
  initPortfolio,
  fetchPortfolioData,
  renderProjects,
  renderFilters,
  debugPortfolio
};
