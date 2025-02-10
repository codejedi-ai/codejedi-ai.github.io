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