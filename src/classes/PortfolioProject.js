/**
 * Represents a single portfolio filter item
 */
export class Filter {
    /**
     * Creates a new filter
     * @param {string} id - Filter identifier
     * @param {string} label - Display text
     * @param {string} [cssClass] - CSS class to filter by (defaults to id)
     * @param {boolean} [active=false] - Whether this filter is active
     */
    constructor(id, label, cssClass = null, active = false) {
        this.id = id;
        this.label = label;
        this.cssClass = cssClass || `.${id}`;
        this.active = active;
    }

    /**
     * Generates HTML for this filter item
     * @returns {string} HTML string for the filter
     */
    toHTML() {
        return `
            <li>
                <a ${this.id ? `id="${this.id}"` : ''} 
                   href="#" 
                   data-filter="${this.id === 'all' ? '*' : this.cssClass}" 
                   class="${this.active ? 'active' : ''}">
                    <h5>${this.label}</h5>
                </a>
            </li>`;
    }
}
/**
 * Represents a portfolio project item
 */
export class PortfolioProject {
    /**
     * Creates a new portfolio project
     * @param {string} category - Project category (CV, RL, AWS, etc.)
     * @param {string} href - URL to the video demonstration
     * @param {string} imageUrl - URL to the project thumbnail
     * @param {string} title - Project title
     * @param {string} description - Project description
     */
    constructor(category, href, imageUrl, title, description) {
        this.category = category;
        this.href = href;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
    }

    /**
     * Generates HTML for this project
     * @returns {string} HTML string for the portfolio item
     */
    toHTML() {
        return `
            <figure class="portfolio-item one-four ${this.category} isotope-item effect-oscar">
                <a href="${this.href}" class="fancybox">
                    <div class="portfolio_img">
                        <img src="${this.imageUrl}" alt="${this.title}" />
                    </div>
                    <figcaption>
                        <div>
                            <h2><span>${this.title}</span></h2>
                            <p>${this.description}</p>
                        </div>
                    </figcaption>
                </a>
            </figure>
        `;
    }

    /**
     * Creates a PortfolioProject from a plain object
     * @param {Object} data - Plain object containing project data
     * @returns {PortfolioProject} New PortfolioProject instance
     */
    static fromObject(data) {
        return new PortfolioProject(
            data.category,
            data.href,
            data.imageUrl,
            data.title,
            data.description
        );
    }
}