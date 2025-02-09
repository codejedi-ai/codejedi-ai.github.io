import { generateSkillsSection, setSkillsBackground } from './components/skills.js';
import { initExperience } from './components/experience.js';
import { initializePortfolio } from './components/portfolio.js';

function initializeAll() {
    generateSkillsSection();
    setSkillsBackground();
    initExperience();
    initializePortfolio();
}

document.addEventListener('DOMContentLoaded', initializeAll);