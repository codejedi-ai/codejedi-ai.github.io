import {notion_client, WORK_EXPERIANE} from '../notionIterators/notionVariables.js';
export const experienceItems = [
    {
        title: 'Software Developer Intern - DevOps (Hybrid)',
        company: 'Open Text Corporation',
        location: 'Ottawa, ON, Canada',
        companyUrl: 'https://www.opentext.com/',
        period: 'Sep.3 ~ Dec.20, 2024 (4 months)',
        year: '2024'
    },
    {
        title: 'Cloud Engineer Intern (Remote)',
        company: 'Sun Life Financial',
        location: 'Toronto, ON, Canada',
        companyUrl: 'https://www.sunlife.ca/en/',
        period: 'May.6~ Aug.30, 2024 (4 months)',
        year: '2024'
    },
    {
        title: 'Site Reliability Engineer Intern (Remote)',
        company: 'OANDA (Canada) Corporation',
        location: 'Toronto, ON, Canada',
        companyUrl: 'https://oanda.com/ca-en/',
        period: 'Jan.9 ~ Apr.21, 2023 (4 Months)',
        year: '2023'
    },
    {
        title: 'Site Reliability Engineer Intern (Hybrid)',
        company: 'Carta Maple Technologies Inc.',
        location: 'Waterloo, ON, Canada',
        companyUrl: 'https://carta.com/',
        period: 'May.2 ~ Aug.26, 2022 (4 Months)',
        year: '2022'
    },
    {
        title: 'Software Development Co-op Student (Remote)',
        company: 'VirtaMove Corp.',
        location: 'Ottawa, ON, Canada',
        companyUrl: 'https://www.virtamove.com/about-us',
        period: 'May.6 ~ Aug.27, 2021 (4 Months)',
        year: '2021'
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



function generateTimelineItem(item, side) {
    const timeLineItem = document.createElement('div');
    timeLineItem.className = `${side === 'right' ? 'col-sm-offset-6' : ''} col-sm-6 timeline-item`;
    timeLineItem.innerHTML = `
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
    `;
    return timeLineItem;
}

function new_year_section(year) {
    const yearSection = document.createElement('div');
    yearSection.className = 'row timeline-movement';
    
    yearSection.innerHTML = `
        <div class="timeline-badge">
            <span class="timeline-balloon-date-day"></span>
            <span class="timeline-balloon-date-month">${year}</span>
        </div>
    `;
    
    
    return yearSection;
}
export function generateTimeline() {
    const timeline = document.createElement('div');
    timeline.id = 'timeline';

    // Add timeline year image at top
    const yearImageSection = document.createElement('div'); 
    yearImageSection.className = 'row timeline-movement timeline-movement-top';
    yearImageSection.innerHTML = `
        <div class="timeline-badge timeline-filter-movement">
            <img src="/img/year.png" style="margin: 0 0 80px; position: relative" alt="timeline">
        </div>
    `;
    timeline.appendChild(yearImageSection);

    let side = 'left';
    
    // Sort experiences by date in descending order
    const sortedExperiences = experienceItems

    // Create first year section
    let currentYearSection = new_year_section(sortedExperiences[0].year);
    side = 'left'; // Reset side for new year
    // Process each experience
    //sortedExperiences.forEach((experience, index) => {
    for( let index = 0; index < sortedExperiences.length; index++){
        const experience = sortedExperiences[index];
        // If year changes, append current section and create new one
        if (index > 0 && experience.year !== sortedExperiences[index - 1].year) {
            timeline.appendChild(currentYearSection);
            currentYearSection = new_year_section(experience.year);
           
        }

        // Add experience to current year section
        const timelineItem = generateTimelineItem(experience, side);
        currentYearSection.appendChild(timelineItem);
        side = side === 'left' ? 'right' : 'left';
    }//);

    // Append the last year section
    timeline.appendChild(currentYearSection);

    return timeline;
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
    const quote = generateRandomQuote(quotes);

    // Create container structure
    section.innerHTML = `
        <div class="container">
            <div class="heading text-center" style="margin: 0 0 20px">
                <h2>Work Experience</h2>
                <p>"${quote.text}" — ${quote.author}</p>
            </div>
        </div>
    `;

    // add the vvalue of generateTimeline(); to the constainer
    const timeline = generateTimeline();
    section.appendChild(timeline);
}

document.addEventListener('DOMContentLoaded', initExperience);