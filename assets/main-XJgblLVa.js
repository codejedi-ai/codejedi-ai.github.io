(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const p=[{img:"/img/aws-practitioner.png",alt:"AWS-CloudPractitioner-2021",title:"AWS Certified Practitioner",date:"2 January 2021"},{img:"/img/aws-developer.png",alt:"AWS-Developer",title:"AWS Certified Developer",date:"29 August 2021"},{img:"/img/aws-devops-prof.png",alt:"AWS-SysOps",title:"AWS Certified DevOps Engineer - Professional",date:"23 August 2024"}],c={text:"The greatest scientific discovery was the discovery of ignorance.",author:"Yuval Noah Harari, Homo Deus: A History of Tomorrow"};function g(){let e=document.getElementById("skills");e||(e=document.createElement("section"),e.id="skills",document.body.appendChild(e));let i=e.querySelector(".container");i||(i=document.createElement("div"),i.className="container",e.appendChild(i)),i.innerHTML=`
        <div class="text-center mb-4">
            <h2>Skills</h2>
            <h6>"${c.text}"-- ${c.author}</h6>
        </div>
        <div class="skills_wrapper">
            <div class="row justify-content-center">
                ${u(p)}
            </div>
        </div>
    `}function u(e){const i=e.length,o=[];for(let n=0;n<i;n+=4){const t=e.slice(n,n+4);o.push(f(t))}return o.join("")}function f(e){const i=e.length,o=i===1?12:i===2?6:i===3?4:3;return`
        <div class="row justify-content-center mb-4">
            ${e.map(n=>`
                <div class="col-md-${o} text-center">
                    <div class="skills_icon delay-03s animated wow zoomIn">
                        ${n.img?`<img src="${n.img}" alt="${n.alt}" class="mx-auto d-block"/>`:"<span></span>"}
                    </div>
                    <div class="skills_block">
                        <h3 class="animated fadeInUp wow">${n.title}</h3>
                        <p class="animated fadeInDown wow">${n.date}</p>
                    </div>
                </div>
            `).join("")}
        </div>
    `}function h(){const e=document.getElementById("skills");e&&(e.style.cssText=`
            padding: 20px 0px;
            background: url("/img/spacexRocket.jpeg") no-repeat center;
            background-size: cover;
            height: auto;
            display: block;
            margin-left: auto;
            margin-right: auto;
            position: center;
        `)}function v(){g(),h()}document.addEventListener("DOMContentLoaded",v);const y=[{title:"Software Developer Intern - DevOps (Hybrid)",company:"Open Text Corporation",location:"Ottawa, ON, Canada",companyUrl:"https://www.opentext.com/",period:"Sep.3 ~ Dec.20, 2024 (4 months)",year:"2024"},{title:"Cloud Engineer Intern (Remote)",company:"Sun Life Financial",location:"Toronto, ON, Canada",companyUrl:"https://www.sunlife.ca/en/",period:"May.6~ Aug.30, 2024 (4 months)",year:"2024"},{title:"Site Reliability Engineer Intern (Remote)",company:"OANDA (Canada) Corporation",location:"Toronto, ON, Canada",companyUrl:"https://oanda.com/ca-en/",period:"Jan.9 ~ Apr.21, 2023 (4 Months)",year:"2023"},{title:"Site Reliability Engineer Intern (Hybrid)",company:"Carta Maple Technologies Inc.",location:"Waterloo, ON, Canada",companyUrl:"https://carta.com/",period:"May.2 ~ Aug.26, 2022 (4 Months)",year:"2022"},{title:"Software Development Co-op Student (Remote)",company:"VirtaMove Corp.",location:"Ottawa, ON, Canada",companyUrl:"https://www.virtamove.com/about-us",period:"May.6 ~ Aug.27, 2021 (4 Months)",year:"2021"}],w=[{text:"Knowledge = Experience x Sensitivity",author:"Yuval Noah Harari"}];function S(e){return e[0]}function b(e,i){const o=document.createElement("div");return o.className=`${i==="right"?"col-sm-offset-6":""} col-sm-6 timeline-item`,o.innerHTML=`
            <div class="row">
                <div class="${i==="right"?"col-sm-offset-1":""} col-sm-11">
                    <div class="timeline-panel ${i==="right"?"debits":"credits"}">
                        <ul class="timeline-panel-ul">
                            <li><span class="importo">${e.title}</span></li>
                            <li><span class="causale">
                                <img src="/img/diamond.gif">
                                <a href="${e.companyUrl}">${e.company}| ${e.location}</a>
                                </span>
                            </li>
                            <li><p><small class="text-muted">${e.period}</small></p></li>
                        </ul>
                    </div>
                </div>
            </div>
    `,o}function d(e){const i=document.createElement("div");return i.className="row timeline-movement",i.innerHTML=`
        <div class="timeline-badge">
            <span class="timeline-balloon-date-day"></span>
            <span class="timeline-balloon-date-month">${e}</span>
        </div>
    `,i}function C(){const e=document.createElement("div");e.id="timeline";const i=document.createElement("div");i.className="row timeline-movement timeline-movement-top",i.innerHTML=`
        <div class="timeline-badge timeline-filter-movement">
            <img src="/img/year.png" style="margin: 0 0 80px; position: relative" alt="timeline">
        </div>
    `,e.appendChild(i);let o="left";const n=y;let t=d(n[0].year);o="left";for(let a=0;a<n.length;a++){const r=n[a];a>0&&r.year!==n[a-1].year&&(e.appendChild(t),t=d(r.year));const m=b(r,o);t.appendChild(m),o=o==="left"?"right":"left"}return e.appendChild(t),e}function P(){let e=document.getElementById("experience");e||(e=document.createElement("section"),e.id="experience",e.className="experience",e.style.cssText="background: #f2f2f2; padding: 30px 0;",document.body.appendChild(e));const i=S(w);e.innerHTML=`
        <div class="container">
            <div class="heading text-center" style="margin: 0 0 20px">
                <h2>Work Experience</h2>
                <p>"${i.text}" — ${i.author}</p>
            </div>
        </div>
    `;const o=C();e.appendChild(o)}document.addEventListener("DOMContentLoaded",P);class l{constructor(i,o,n=null,t=!1){this.id=i,this.label=o,this.cssClass=n||`.${i}`,this.active=t}toHTML(){return`
            <li>
                <a ${this.id?`id="${this.id}"`:""} 
                   href="#" 
                   data-filter="${this.id==="all"?"*":this.cssClass}" 
                   class="${this.active?"active":""}">
                    <h5>${this.label}</h5>
                </a>
            </li>`}}class s{constructor(i,o,n,t,a){this.category=i,this.href=o,this.imageUrl=n,this.title=t,this.description=a}toHTML(){return`
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
        `}static fromObject(i){return new s(i.category,i.href,i.imageUrl,i.title,i.description)}}const L=[new s("CV","/vids/K-means_V1.mp4","/img/bunny.bmp","K-Means Algorithm for Unsupervised Learning","Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension."),new s("CV","/vids/Hurricane.mp4","/img/damage_no_damage.png","CNN for Hurricane Damage Classification","Utilized Convolutional Neural Networks for classifying the existence of hurricane damage. This advanced model provides nuanced insights, aiding disaster response planning by allocating resources more precisely based on detected severity levels in the visual data."),new s("CV","/vids/PanoramicStich_1.mp4","/img/ImageStitching.png","Panoramic Image Stitching","Implemented homographies with Scikit libraries for panoramic image stitching, seamlessly blending visual elements. This technique enhances the creation of panoramic images, ensuring a cohesive and visually pleasing result by aligning and combining multiple images through geometric transformations."),new s("Nengo","/vids/Real-Time Online Learning with PES Rule.mp4","/img/nengo/RTRL.png","Real-Time Online Learning with PES Rule","Executed in the Neural Engineering Framework, the project enables adaptive connection weight adjustments, demonstrating effective online learning. It dynamically masters the square function, aligning output closely with input after initial seconds. Rigorous testing includes systematic variations of hyperparameters, such as functions, learning rates, and training times."),new s("RL","/vids/CartpoleRenforcementLearning_1.mp4","/img/RL_CartPole.png","Tackling CartPole with OpenAI Gym","Designed a resilient reinforcement learning model for CartPole-v1 in OpenAI Gym. Implemented a Proximal Policy Optimization (PPO) algorithm to train the agent in maintaining optimal balance on the cart-mounted pole."),new s("Nengo","/vids/ParlovDog.mp4","/img/nengo/classical_conditioning.png","Pavlov's Dog Conditional Stimulus Simulation",'Utilized Nengo simulation, applying PBS learning rule for dynamic stimuli-response weight adjustments. Successfully replicated Pavlovian behavior, offering nuanced insights. Demonstrated "neurons that fire together wire together" principle, showcasing emergent neural connectivity patterns.'),new s("Nengo","/vids/Accumulate-to-Threshold Decision Making Model.mp4","/img/nengo/accumulator.png","Decision Making Model with Nengo Neural Simulator","Utilized Nengo 3.2.0 to simulate a neuro accumulator, integrating input functions. Implemented synaptic connections for binary decisions, assessing diverse ensembles to capture biological relevance in decision-making."),new s("CV","/vids/Django_Object_detection_1.mp4","/img/DJ+TF-obj-det.png","Django+TensorFL Hub:Object Detection","Developed a robust Django web application and seamlessly integrated TensorFlow Hub's Inception ResNet V2 model, enhancing capabilities in image analysis and object detection."),new s("AWS","/pdfs/WildRydeReport.pdf","/img/wildrydes-architecture.jpeg","Wild Rydes","SERVERLESS! Perform version control in the deployment code of static webpage, used AWS amplify to host the static webpage frontend and DynamoDB hold user data. Utilized tools: Codecommit, DynamoDB, Amplify, AWS CLI, AWS API gateway, Cognito"),new s("AWS","/pdfs/DevSecOpsReport.pdf","/img/TrendMicroControlPanel.png","Trend Micro One","Security + DevOps. Used Trend Micro to add security checks and block targeted attacks on the site. It can visualise attacks in the cloud infrastructure."),new s("AWS","/#","/img/DevSecOps.JPG","DevSecOps",""),new s("AWS","https://catalog.us-east-1.prod.workshops.aws/v2/workshops/44d3e2a0-ec6f-44df-9397-bcfdf129cadf/en-US/","img/devmlops.png","DEVMLOPS","DevOps + Machine Learning"),new s("SWE","https://github.com/codejedi-ai/Nationstate-LLM","img/Nationstates-LLM.png","Analyze progressive bias in the GPT-4 model: Nationstates-LLM","Utilized the nationstates API to access data and make decisions in the game. Drafted a virtual nation constitution, enabling GPT-4 to read and select the most appropriate decision according to my constitution. Evaluation revealed minimal progressive bias, affirming GPT-4's alignment to constitutional values."),new s("SWE","https://github.com/codejedi-ai/GMM-Segmentation","img/SegmanticPic.png","GMM-Segmentation","Implemented the Gaussian mixture model (GMM) for image segmentation, effectively distinguishing foreground and background. This segmentation facilitated the identification of prominent features, thereby enhancing overall image comprehension and visual understanding.")];function $(e){return`
        <figure class="portfolio-item one-four ${e.category} isotope-item effect-oscar">
            <a href="${e.videoUrl}" class="fancybox">
                <div class="portfolio_img">
                    <img src="${e.imageUrl}" alt="${e.title}" />
                </div>
                <figcaption>
                    <div>
                        <h2><span>${e.title}</span></h2>
                        <p>${e.description}</p>
                    </div>
                </figcaption>
            </a>
        </figure>
    `}function M(e){return e.map(i=>$(i)).join(`
`)}const x=[new l("all","All","*",!0),new l("Nengo","Neuroscience"),new l("RL","Reinforcement Learning"),new l("CV","Computer Vision"),new l("SWE","Software Developments"),new l("AWS","AWS")],T=x.map(e=>e.toHTML()).join(`
`);document.querySelector("#Portfolio").innerHTML=`
        <!-- Container -->
        <div class="container portfolio_title">
            <!-- Title -->
            <div class="section-title">
                <h2>Projects</h2>
                <h6>Necessity is the mother of invention</h6>
            </div>
        </div>
        <!-- Container -->

        <div class="portfolio-top"></div>

        <!-- Portfolio Filters -->
        <div class="portfolio">
            <div id="filters" class="sixteen columns">
                <ul class="clearfix">

                    ${T}

                </ul>
            </div>
            <!--/Portfolio Filters -->

            <!-- Portfolio Wrapper -->
            <div class="isotope fadeInLeft animated wow grid" id="portfolio_wrapper">
            ${M(L)}


                <!--/Portfolio Item -->

            </div>
            <!--/Portfolio Wrapper -->
        </div>
        <!--/Portfolio Filters -->

        <div class="portfolio_btm"></div>

        <div id="project_container">
            <div class="clear"></div>
            <div id="project_data"></div>
        </div>
`;
