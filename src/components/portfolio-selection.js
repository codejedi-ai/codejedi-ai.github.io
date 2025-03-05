/**
 * Portfolio Selection Component
 * 
 * This module handles the category selection section of the portfolio,
 * providing a more prominent way to filter projects by category.
 */

// DOM elements
let selectionSection;
let categoryButtons;
let portfolioData;

/**
 * Initialize the portfolio selection component
 * @param {Object} data - The portfolio data with projects and filters
 */
function initPortfolioSelection(data) {
  portfolioData = data;
  
  // Create the selection section if it doesn't exist
  if (!document.getElementById('portfolio-selection')) {
    createSelectionSection();
  }
  
  // Render the category buttons
  renderCategoryButtons();
  
  // Add event listeners
  addEventListeners();
}

/**
 * Create the selection section structure
 */
function createSelectionSection() {
  // Create the section element
  selectionSection = document.createElement('section');
  selectionSection.id = 'portfolio-selection';
  selectionSection.className = 'portfolio-selection-section';
  
  // Create the inner HTML structure
  selectionSection.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3 class="selection-title">Explore My Work By Category</h3>
          <div class="category-buttons-container">
            <!-- Category buttons will be inserted here -->
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Insert the section before the portfolio section
  const portfolioSection = document.getElementById('Portfolio');
  if (portfolioSection) {
    portfolioSection.parentNode.insertBefore(selectionSection, portfolioSection);
  } else {
    // Fallback - append to body
    document.body.appendChild(selectionSection);
  }
  
  // Update the reference to the buttons container
  categoryButtons = selectionSection.querySelector('.category-buttons-container');
}

/**
 * Render the category buttons based on portfolio filters
 */
function renderCategoryButtons() {
  if (!categoryButtons || !portfolioData || !portfolioData.filters) return;
  
  // Clear existing buttons
  categoryButtons.innerHTML = '';
  
  // Create a button for each filter
  portfolioData.filters.forEach(filter => {
    const button = document.createElement('div');
    button.className = `category-button ${filter.active ? 'active' : ''}`;
    button.setAttribute('data-category', filter.id);
    
    // Create icon based on category
    const iconClass = getCategoryIcon(filter.id);
    
    button.innerHTML = `
      <div class="category-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="category-label">${filter.label}</div>
    `;
    
    categoryButtons.appendChild(button);
  });
}

/**
 * Get an appropriate icon class for a category
 * @param {string} category - The category ID
 * @returns {string} - Font Awesome icon class
 */
function getCategoryIcon(category) {
  const iconMap = {
    'all': 'fa fa-th',
    'CV': 'fa fa-eye',
    'Nengo': 'fa fa-brain',
    'RL': 'fa fa-robot',
    'SWE': 'fa fa-code',
    'AWS': 'fa fa-cloud'
  };
  
  return iconMap[category] || 'fa fa-folder';
}

/**
 * Add event listeners to the category buttons
 */
function addEventListeners() {
  if (!categoryButtons) return;
  
  // Get all buttons
  const buttons = categoryButtons.querySelectorAll('.category-button');
  
  // Add click event to each button
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active state in UI
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Find the corresponding filter in the portfolio section
      const portfolioFilter = document.querySelector(`#filters a[id="${category}"]`);
      if (portfolioFilter) {
        // Trigger a click on the portfolio filter
        portfolioFilter.click();
      }
      
      // Scroll to portfolio section
      const portfolioSection = document.getElementById('Portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Export the initialization function
export { initPortfolioSelection };
