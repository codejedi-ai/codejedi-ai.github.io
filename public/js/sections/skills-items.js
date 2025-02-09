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
    {
        img: '',
        alt: '',
        title: '?',
        date: ''
    }
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
            <div class="row">
                ${generateSkillItems()}
            </div>
        </div>
    `;
  }
  
  function generateSkillItems() {
    return skillsData.map(skill => `
        <div class="col-md-3">
            <div class="skills_icon delay-03s animated wow zoomIn">
                ${skill.img ? `<img src="${skill.img}" alt="${skill.alt}" />` : '<span></span>'}
            </div>
            <div class="skills_block">
                <h3 class="animated fadeInUp wow">${skill.title}</h3>
                <p class="animated fadeInDown wow">${skill.date}</p>
            </div>
        </div>
    `).join('');
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