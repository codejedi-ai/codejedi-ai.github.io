
let experienceItems = [];
let quotes = [];

// Fetch experience data from JSON file
async function fetchExperienceData() {
    try {
        const response = await fetch('/data/experience.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        experienceItems = await response.json();
        
        // After data is loaded, generate the timeline
        generateTimeline();
    } catch (error) {
        console.error('Error loading experience data:', error);
    }
}

// Fetch quotes data from JSON file
async function fetchQuotesData() {
    try {
        const response = await fetch('/data/quotes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        quotes = data.experience;
        
        // After quotes are loaded, generate the header
        generateTimelineHeader();
    } catch (error) {
        console.error('Error loading quotes data:', error);
    }
}

function generateTimelineHeader() {
    if (quotes.length > 0) {
        const quote = generateRandomQuote(quotes);
        const quoteElement = document.querySelector('#experience > div > div.heading.text-center > p');
        if (quoteElement) {
            quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
        }
    }
}
function generateTimelineItem(item, side) {
    const template = `
        <div class="${side === 'right' ? 'col-sm-offset-6' : ''} col-sm-6 timeline-item">
            <div class="row">
                <div class="${side === 'right' ? 'col-sm-offset-1' : ''} col-sm-11">
                    <div class="timeline-panel ${side === 'right' ? 'debits' : 'credits'}">
                        <ul class="timeline-panel-ul">
                            <li><span class="importo">${item.title}</span></li>
                            <li><span class="causale">
                                <img src="img/diamond.gif">
                                <a href="${item.companyUrl}">${item.company}| ${item.location}</a>
                                </span>
                            </li>
                            <li><p><small class="text-muted">${item.period}</small></p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    return template;
}

function generateTimeline() {
    const timeline = document.getElementById('timeline');
    
    // Add timeline year image at top
    const yearImageSection = document.createElement('div'); 
    yearImageSection.className = 'row timeline-movement timeline-movement-top';
    yearImageSection.innerHTML = `
        <div class="timeline-badge timeline-filter-movement">
            <img src="img/year.png" style="margin: 0 0 80px; position: relative">
        </div>
    `;
    timeline.appendChild(yearImageSection);
    let side = 'left';
    // Generate timeline items
    experienceItems.forEach(yearGroup => {
        const yearSection = document.createElement('div');
        yearSection.className = 'row timeline-movement';
        
        yearSection.innerHTML = `
            <div class="timeline-badge">
                <span class="timeline-balloon-date-day"></span>
                <span class="timeline-balloon-date-month">${yearGroup.year}</span>
            </div>
        `;
        yearGroup.positions.forEach(position => {
            
            yearSection.innerHTML += generateTimelineItem(position, side);
            side = side === 'left' ? 'right' : 'left';
        });
        
        timeline.appendChild(yearSection);
    });
}

function generateRandomQuote(quotesArray) {
    if (!quotesArray || quotesArray.length === 0) {
        return { text: "Loading...", author: "" };
    }
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchQuotesData();
    fetchExperienceData();
});
