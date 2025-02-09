
const experienceItems = [
    {
        year: '2024',
        positions: [
            {
                title: 'Software Developer Intern - DevOps (Hybrid)',
                company: 'Open Text Corporation',
                location: 'Ottawa, ON, Canada',
                companyUrl: 'https://www.opentext.com/',
                period: 'Sep.3 ~ Dec.20, 2024 (4 months)',
            },
            {
                title: 'Cloud Engineer Intern (Remote)',
                company: 'Sun Life Financial',
                location: 'Toronto, ON, Canada',
                companyUrl: 'https://www.sunlife.ca/en/',
                period: 'May.6~ Aug.30, 2024 (4 months)',
            }
        ]
    },
    {
        year: '2023',
        positions: [
            {
                title: 'Site Reliability Engineer Intern (Remote)',
                company: 'OANDA (Canada) Corporation',
                location: 'Toronto, ON, Canada',
                companyUrl: 'https://oanda.com/ca-en/',
                period: 'Jan.9 ~ Apr.21, 2023 (4 Months)',
            }
        ]
    },
    {
        year: '2022',
        positions: [
            {
                title: 'Site Reliability Engineer Intern (Hybrid)',
                company: 'Carta Maple Technologies Inc.',
                location: 'Waterloo, ON, Canada',
                companyUrl: 'https://carta.com/',
                period: 'May.2 ~ Aug.26, 2022 (4 Months)',
            }
        ]
    },
    {
        year: '2021',
        positions: [
            {
                title: 'Software Development Co-op Student (Remote)',
                company: 'VirtaMove Corp.',
                location: 'Ottawa, ON, Canada',
                companyUrl: 'https://www.virtamove.com/about-us',
                period: 'May.6 ~ Aug.27, 2021 (4 Months)',
            }
        ]
    }
];

function generateTimelineHeader() {
    const quote = generateRandomQuote(quotes);
    const quoteElement = document.querySelector('#experience > div > div.heading.text-center > p');
    if (quoteElement) {
        quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
    }
}

// Update DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    generateTimelineHeader();
    // ...other timeline generation code
});
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

document.addEventListener('DOMContentLoaded', generateTimeline);

function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    const quote = generateRandomQuote();
    const quoteElement = document.querySelector('.portfolio h6');
    if (quoteElement) {
        quoteElement.textContent = `"${quote.text}" - ${quote.author}`;
    }
}

document.addEventListener('DOMContentLoaded', displayQuote);