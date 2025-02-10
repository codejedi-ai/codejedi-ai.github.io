import { generateSkillsSection, setSkillsBackground } from './components/skills.js';
import { initExperience } from './components/experience.js';

function initializeAll() {
    generateSkillsSection();
    setSkillsBackground();
    initExperience();
}

document.addEventListener('DOMContentLoaded', initializeAll);