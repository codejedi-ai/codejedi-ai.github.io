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
  // We're not creating the selection section anymore
  // Just set up references to null
  selectionSection = null;
  categoryButtons = null;
}

/**
 * Render the category buttons based on portfolio filters
 */
function renderCategoryButtons() {
  // No-op since we're not showing category buttons anymore
  return;
}

/**
 * Get an appropriate icon class for a category
 * @param {string} category - The category ID
 * @returns {string} - Font Awesome icon class
 */
function getCategoryIcon(category) {
  const iconMap = {
    'all': 'fas fa-th',
    'CV': 'fas fa-eye',
    'Nengo': 'fas fa-brain',
    'RL': 'fas fa-robot',
    'SWE': 'fas fa-code',
    'AWS': 'fab fa-aws'
  };
  
  return iconMap[category] || 'fas fa-folder';
}

/**
 * Add event listeners to the category buttons
 */
function addEventListeners() {
  // No-op since we don't have category buttons anymore
  return;
}

// Export the initialization function
export { initPortfolioSelection };
