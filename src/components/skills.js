import { skillsQuote, skillsData } from '../data/certsData.js';
export function generateSkillsSection(skillsQuote, skillsData) {
    let section = document.getElementById('skills');
    
    // Create section if it doesn't exist
    if (!section) {
        section = document.createElement('section');
        section.id = 'skills';
        document.body.appendChild(section);
    }

    // Create or get container
    let container = section.querySelector('.container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'container';
        section.appendChild(container);
    }

    container.innerHTML = `
        <div class="text-center mb-4">
            <h2>Skills</h2>
            <h6>"${skillsQuote.text}"-- ${skillsQuote.author}</h6>
        </div>
        <div class="skills_wrapper">
            <div class="row justify-content-center">
                ${generateSkillItems(skillsData)}
            </div>
        </div>
    `;
}

function generateSkillItems(skillsData) {
    const total = skillsData.length;
    const rows = [];
    
    for (let i = 0; i < total; i += 4) {
        const rowItems = skillsData.slice(i, i + 4);
        rows.push(generateSkillRow(rowItems));
    }

    return rows.join('');
}

function generateSkillRow(rowItems) {
    const itemCount = rowItems.length;
    const colWidth = itemCount === 1 ? 12 : 
                     itemCount === 2 ? 6 : 
                     itemCount === 3 ? 4 : 3;

    return `
        <div class="row justify-content-center mb-4">
            ${rowItems.map(skill => `
                <div class="col-md-${colWidth} text-center">
                    <div class="skills_icon delay-03s animated wow zoomIn">
                        ${skill.img ? `<img src="${skill.img}" alt="${skill.alt}" class="mx-auto d-block"/>` : '<span></span>'}
                    </div>
                    <div class="skills_block">
                        <h3 class="animated fadeInUp wow">${skill.title}</h3>
                        <p class="animated fadeInDown wow">${skill.date}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

export function setSkillsBackground() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.style.cssText = `
            padding: 20px 0px;
            background: url("/img/spacexRocket.jpeg") no-repeat center;
            background-size: cover;
            height: auto;
            display: block;
            margin-left: auto;
            margin-right: auto;
            position: center;
        `;
    }
}

function initializeAll() {
    generateSkillsSection(skillsQuote, skillsData);
    setSkillsBackground();
}

document.addEventListener('DOMContentLoaded', initializeAll);