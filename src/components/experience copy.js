export const experienceItems = [
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
export const quotes = [
    {
        text: "Knowledge = Experience x Sensitivity",
        author: "Yuval Noah Harari"
    }
];

function generateRandomQuote(quotes) {
    return quotes[0]; // Using first quote for consistency
}

export function generateTimelineHeader() {
    const quote = generateRandomQuote(quotes);
    const header = document.querySelector('#experience .heading');
    if (header) {
        header.innerHTML = `
            <h2>Work Experience</h2>
            <p>"${quote.text}" — ${quote.author}</p>
        `;
    }
}

function generateTimelineItem(item, side) {
    return `
        <div class="${side === 'right' ? 'col-sm-offset-6' : ''} col-sm-6 timeline-item">
            <div class="row">
                <div class="${side === 'right' ? 'col-sm-offset-1' : ''} col-sm-11">
                    <div class="timeline-panel ${side === 'right' ? 'debits' : 'credits'}">
                        <ul class="timeline-panel-ul">
                            <li><span class="importo">${item.title}</span></li>
                            <li><span class="causale">
                                <img src="/img/diamond.gif">
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
}

export function generateTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) {
        console.error('Timeline element not found');
        return;
    }
    
    // Add timeline year image at top
    const yearImageSection = document.createElement('div'); 
    yearImageSection.className = 'row timeline-movement timeline-movement-top';
    yearImageSection.innerHTML = `
        <div class="timeline-badge timeline-filter-movement">
            <img src="/img/year.png" style="margin: 0 0 80px; position: relative">
        </div>
    `;
    timeline.appendChild(yearImageSection);

    let side = 'left';
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

export function initExperience() {
    let section = document.getElementById('experience');
    
    // Create section if it doesn't exist
    if (!section) {
        section = document.createElement('section');
        section.id = 'experience';
        section.className = 'experience';
        section.style.cssText = 'background: #f2f2f2; padding: 30px 0;';
        document.body.appendChild(section);
    }

    // Create container structure
    section.innerHTML = `
        <div class="container">
            <div class="heading text-center" style="margin: 0 0 20px">
                <h2>Work Experience</h2>
                <p>placeholder</p>
            </div>
            <div id="timeline">
                <!-- Timeline items will be generated here -->
            </div>
        </div>
    `;

    // Generate content
    generateTimelineHeader();
    generateTimeline();
}

document.addEventListener('DOMContentLoaded', initExperience);