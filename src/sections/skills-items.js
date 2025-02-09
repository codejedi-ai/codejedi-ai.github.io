const skillsData = [
  {
      img: 'img/aws-practitioner.png',
      alt: 'AWS-CloudPractitioner-2021',
      title: 'AWS Certified Practitioner',
      date: '2 January 2021'
  },
  {
      img: 'img/aws-developer.png',
      alt: 'AWS-Developer', 
      title: 'AWS Certified Developer',
      date: '29 August 2021'
  },
  {
      img: 'img/aws-devops-prof.png',
      alt: 'AWS-SysOps',
      title: 'AWS Certified DevOps Engineer - Professional',
      date: '23 August 2024'
  },
  
];

const skillsQuote = {
  text: "The greatest scientific discovery was the discovery of ignorance.",
  author: "Yuval Noah Harari, Homo Deus: A History of Tomorrow"
};

function generateSkillsSection() {
  const section = document.getElementById('skills');
  if (!section) return;

  const container = section.querySelector('.container');
  container.innerHTML = `
      <h2>Skills</h2>
      <h6>"${skillsQuote.text}"-- ${skillsQuote.author}</h6>
      <div class="skills_wrapper">
          <div class="row d-flex justify-content-around align-items-center">
              ${generateSkillItems()}
          </div>
      </div>
  `;
}

function generateRow(rowItems) {
  const itemCount = rowItems.length;
  const colWidth = itemCount === 1 ? 12 : 
                   itemCount === 2 ? 6 : 
                   itemCount === 3 ? 4 : 3;

  return `
    <div class="row d-flex justify-content-around align-items-center mb-4">
      ${rowItems.map(skill => `
        <div class="col-md-${colWidth} d-flex justify-content-center">
          <div class="text-center w-100">
            <div class="skills_icon delay-03s animated wow zoomIn">
              ${skill.img ? `<img src="${skill.img}" alt="${skill.alt}" class="mx-auto"/>` : '<span></span>'}
            </div>
            <div class="skills_block">
              <h3 class="animated fadeInUp wow">${skill.title}</h3>
              <p class="animated fadeInDown wow">${skill.date}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
function generateSkillItems() {
    const total = skillsData.length;
    const rows = [];
    
    // Split into rows of 4
    for (let i = 0; i < total; i += 4) {
      const rowItems = skillsData.slice(i, i + 4);
      const rowHtml = generateRow(rowItems);
      rows.push(rowHtml);
    }
  
    return rows.join('');
  }
  
  function generateRow(rowItems) {
    const itemCount = rowItems.length;
    const colWidth = itemCount === 1 ? 12 : 
                     itemCount === 2 ? 6 : 
                     itemCount === 3 ? 4 : 3;
  
    return `
      <div class="row d-flex justify-content-around align-items-center mb-4">
        ${rowItems.map(skill => `
          <div class="col-md-${colWidth} d-flex justify-content-center">
            <div class="text-center w-100">
              <div class="skills_icon delay-03s animated wow zoomIn">
                ${skill.img ? `<img src="${skill.img}" alt="${skill.alt}" class="mx-auto"/>` : '<span></span>'}
              </div>
              <div class="skills_block">
                <h3 class="animated fadeInUp wow">${skill.title}</h3>
                <p class="animated fadeInDown wow">${skill.date}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
function setSkillsBackground() {
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
      skillsSection.style.cssText = `
          padding: 20px 0px;
          background: url("../img/spacexRocket.jpeg") no-repeat center;
          background-size: cover;
          height: auto;
          display: block;
          margin-left: auto;
          margin-right: auto;
          position: center;
      `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generateSkillsSection();
  setSkillsBackground();
});