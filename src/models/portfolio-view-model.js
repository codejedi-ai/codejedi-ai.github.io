/**
 * Portfolio View Model
 * 
 * This module provides a view model for the portfolio projects,
 * allowing different views/filters to be applied based on user selection.
 */

// View types
const ViewTypes = {
  ALL: 'all',
  CATEGORY: 'category',
  FEATURED: 'featured',
  RECENT: 'recent'
};

class PortfolioViewModel {
  constructor(projects = []) {
    this.allProjects = projects;
    this.currentView = ViewTypes.ALL;
    this.featuredProjects = projects.filter(p => p.featured);
    this.recentProjects = [...projects].sort((a, b) => b.id - a.id).slice(0, 6);
  }

  /**
   * Get projects based on the current view
   * @returns {Array} Filtered projects
   */
  getProjects() {
    switch (this.currentView) {
      case ViewTypes.CATEGORY:
        return this.allProjects.filter(p => p.category === this.currentCategory);
      case ViewTypes.FEATURED:
        return this.featuredProjects;
      case ViewTypes.RECENT:
        return this.recentProjects;
      default:
        return [];
    }
  }

  /**
   * Set the current view
   * @param {string} viewType - The view type to set
   * @param {string} [category] - Optional category for category view
   */
  setView(category) {
    this.currentCategory = category;
    return this;
  }

  /**
   * Get available categories from projects
   * @returns {Array} Unique categories
   */
  getCategories() {
    const categories = new Set(this.allProjects.map(p => p.category));
    return Array.from(categories);
  }

  /**
   * Get the current view type
   * @returns {string} Current view type
   */
  getCurrentView() {
    return this.currentView;
  }

  /**
   * Get the current category (if in category view)
   * @returns {string|null} Current category
   */
  getCurrentCategory() {
    return this.currentCategory;
  }
}

// Export the view model and view types
export { PortfolioViewModel, ViewTypes };
