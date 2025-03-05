/**
 * Portfolio Component
 * 
 * This module handles the portfolio section of the website, including:
 * - Fetching project data from JSON
 * - Rendering projects to the DOM
 * - Handling filter functionality
 */

// Import the portfolio selection component
import { initPortfolioSelection } from './portfolio-selection.js';
import { PortfolioViewModel, ViewTypes } from '../models/portfolio-view-model.js';

// DOM elements
let portfolioSection;
let filterContainer;
let projectsContainer;
let viewSelector;

// Data storage
let portfolioData = {
  projects: [],
  filters: []
};

// View model
let viewModel;

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
      // Render the portfolio section
      renderFilters();
      renderProjects();
      
      // Initialize the portfolio selection component with the data
      // This needs to happen after filters are rendered
      initPortfolioSelection(portfolioData);
      
      // Set up view selector
      setupViewSelector();
      
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
    
    <!-- View Selector -->
    <div class="container">
      <div class="view-selector-container">
        <div class="dropdown-view-selector">
          <select id="view-dropdown" class="view-dropdown">
            <option value="full-stack" selected>Full Stack</option>
            <option value="cloud-devops">Cloud Eng / DevOps</option>
            <option value="ai-ml">AI/ML</option>
          </select>
        </div>
      </div>
    </div>

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
    
    // Add featured flag to some projects for demo purposes
    portfolioData.projects.forEach((project, index) => {
      // Mark every third project as featured for demonstration
      project.featured = index % 3 === 0;
    });
    
    // Initialize the view model with the projects
    viewModel = new PortfolioViewModel(portfolioData.projects);
    
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
  
  // Use the filters from the JSON data if available, otherwise generate from project categories
  const filtersToUse = portfolioData.filters && portfolioData.filters.length > 0 
    ? portfolioData.filters 
    : [
        { id: 'all', label: 'All', active: true },
        ...[...new Set(portfolioData.projects.map(project => project.category))]
          .filter(category => category) // Remove empty categories
          .map(category => ({ 
            id: category, 
            label: category, 
            active: false 
          }))
      ];
  
  // Create filter elements
  filtersToUse.forEach(filter => {
    const filterItem = document.createElement('li');
    
    filterItem.innerHTML = `
      <a id="${filter.id}" 
         href="#" 
         data-filter="${filter.id === 'all' ? '*' : '.' + filter.id}"
         class="${filter.active ? 'active' : ''}"
         role="button"
         aria-pressed="${filter.active ? 'true' : 'false'}">
        <h5>${filter.label}</h5>
      </a>
    `;
    
    // Add click event listener
    const filterLink = filterItem.querySelector('a');
    filterLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleFilterClick(filterLink, filter);
      
      // Update aria-pressed state
      document.querySelectorAll('#filters a').forEach(a => {
        a.setAttribute('aria-pressed', 'false');
      });
      filterLink.setAttribute('aria-pressed', 'true');
    });
    
    filterContainer.appendChild(filterItem);
    // Recompute and display projects based on the selected category
    renderProjects();
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
  
  // Update the view model to category view with the selected category
  viewModel.setView(ViewTypes.CATEGORY, filter.id);
  
  // Re-render the projects
  renderProjects();
  
  // Add a class to the portfolio section to indicate filtering is active
  if (filter.id === 'all') {
    portfolioSection.classList.remove('filtering-active');
  } else {
    portfolioSection.classList.add('filtering-active');
  }
  
  // Selection component has been removed
  
  // Announce filter change for accessibility
  const filterAnnouncement = document.getElementById('filter-announcement') || 
    (() => {
      const el = document.createElement('div');
      el.id = 'filter-announcement';
      el.className = 'sr-only';
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
      return el;
    })();
  
  filterAnnouncement.textContent = `Showing ${filter.id === 'all' ? 'all' : filter.id} projects`;
}

// Selection component update function removed

/**
 * Render projects to the DOM
 */
function renderProjects() {
  // Clear loading indicator
  projectsContainer.innerHTML = '';
  
  // Get projects from the view model
  const projectsToShow = viewModel.getProjects();
  
  console.log("Projects to be displayed:", projectsToShow);

  // Create project elements
  projectsToShow.forEach(project => {
    const projectElement = document.createElement('figure');
    // Use the exact class requested for all items
    projectElement.className = `portfolio-item CV`;
    
    // Add data-category attribute for filtering
    projectElement.setAttribute('data-category', project.category);
    
    // Add additional attributes for accessibility and filtering
    projectElement.setAttribute('aria-labelledby', `project-title-${project.id}`);
    projectElement.setAttribute('role', 'article');
    
    // Add featured badge if applicable
    const featuredBadge = project.featured ? 
      '<span class="featured-badge">Featured</span>' : '';
    
    projectElement.innerHTML = `
      <a href="${project.href}" class="fancybox">
        <div class="portfolio_img">
          <img src="${project.imageUrl}" alt="${project.title}" />
          ${featuredBadge}
        </div>
        <figcaption>
          <div>
            <h2 id="project-title-${project.id}"><span>${project.title}</span></h2>
            <p>${project.description}</p>
            <span class="category-tag">${project.tags.join(', ')}</span>
          </div>
        </figcaption>
      </a>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
  
  // Add a message for when no projects match the filter
  if (projectsToShow.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.innerHTML = '<h3>No projects match the selected filter</h3><p>Try selecting a different view or category.</p>';
    projectsContainer.appendChild(noResultsMessage);
  }
  
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
        item.classList.add('filtered-in');
      });
      
      // Check if there's a hash in the URL for direct filtering
      const hash = window.location.hash;
      if (hash && hash.startsWith('#filter-')) {
        const filterValue = hash.replace('#filter-', '');
        const filterLink = document.querySelector(`#filters a[id="${filterValue}"]`);
        
        if (filterLink) {
          // Find the corresponding filter object
          const filter = portfolioData.filters.find(f => f.id === filterValue) || 
                        { id: filterValue, label: filterValue };
          
          // Trigger the filter
          handleFilterClick(filterLink, filter);
        }
      }
      
      console.log('Portfolio grid initialized successfully');
      
      // Trigger a resize event to force layout recalculation
      window.dispatchEvent(new Event('resize'));
      
      // Add event listener for filter changes via URL hash
      window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#filter-')) {
          const filterValue = hash.replace('#filter-', '');
          const filterLink = document.querySelector(`#filters a[id="${filterValue}"]`);
          
          if (filterLink) {
            const filter = portfolioData.filters.find(f => f.id === filterValue) || 
                          { id: filterValue, label: filterValue };
            handleFilterClick(filterLink, filter);
          }
        }
      });
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
 * Set up the view selector dropdown
 */
function setupViewSelector() {
  viewSelector = document.querySelector('#view-dropdown');
  if (!viewSelector) return;
  
  viewSelector.addEventListener('change', () => {
    // Get the selected category
    const categoryId = viewSelector.value;

    // Update the view model
    viewModel.setView(categoryId);

    // Log the selected category
    console.log("Selected Category:", categoryId);
  });
  
  // Initially hide filters if not in category view
  document.querySelector('.filter-container').style.display = 
    viewModel.getCurrentView() === ViewTypes.CATEGORY ? 'block' : 'none';
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
  
  // Log view model state
  console.log('View Model:', {
    currentView: viewModel.getCurrentView(),
    currentCategory: viewModel.getCurrentCategory(),
    projectCount: viewModel.getProjects().length
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
