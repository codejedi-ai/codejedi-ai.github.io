import { Filter } from '../classes/Filter.js';
import { PortfolioProject } from '../classes/PortfolioProject.js';

export const portfolioProjects = [
    new PortfolioProject(
        'CV',
        '/vids/K-means_V1.mp4',
        '/img/bunny.bmp',
        'K-Means Algorithm for Unsupervised Learning',
        'Enhancing image understanding through the extraction of meaningful patterns from data, improving visual comprehension.'
    ),
    new PortfolioProject(
        'CV',
        '/vids/Hurricane.mp4',
        '/img/damage_no_damage.png',
        'CNN for Hurricane Damage Classification',
        'Utilized Convolutional Neural Networks for classifying the existence of hurricane damage. This advanced model provides nuanced insights, aiding disaster response planning by allocating resources more precisely based on detected severity levels in the visual data.'
    ),
    new PortfolioProject(
        'CV',
        '/vids/PanoramicStich_1.mp4',
        '/img/ImageStitching.png',
        'Panoramic Image Stitching',
        'Implemented homographies with Scikit libraries for panoramic image stitching, seamlessly blending visual elements. This technique enhances the creation of panoramic images, ensuring a cohesive and visually pleasing result by aligning and combining multiple images through geometric transformations.'
    ),
    new PortfolioProject(
        'Nengo',
        '/vids/Real-Time Online Learning with PES Rule.mp4',
        '/img/nengo/RTRL.png',
        'Real-Time Online Learning with PES Rule',
        'Executed in the Neural Engineering Framework, the project enables adaptive connection weight adjustments, demonstrating effective online learning. It dynamically masters the square function, aligning output closely with input after initial seconds. Rigorous testing includes systematic variations of hyperparameters, such as functions, learning rates, and training times.'
    ),
    new PortfolioProject(
        'RL',
        '/vids/CartpoleRenforcementLearning_1.mp4',
        '/img/RL_CartPole.png',
        'Tackling CartPole with OpenAI Gym',
        'Designed a resilient reinforcement learning model for CartPole-v1 in OpenAI Gym. Implemented a Proximal Policy Optimization (PPO) algorithm to train the agent in maintaining optimal balance on the cart-mounted pole.'
    ),
    new PortfolioProject(
        'Nengo',
        '/vids/ParlovDog.mp4',
        '/img/nengo/classical_conditioning.png',
        'Pavlov\'s Dog Conditional Stimulus Simulation',
        'Utilized Nengo simulation, applying PBS learning rule for dynamic stimuli-response weight adjustments. Successfully replicated Pavlovian behavior, offering nuanced insights. Demonstrated "neurons that fire together wire together" principle, showcasing emergent neural connectivity patterns.'
    ),
    new PortfolioProject(
        'Nengo',
        '/vids/Accumulate-to-Threshold Decision Making Model.mp4',
        '/img/nengo/accumulator.png',
        'Decision Making Model with Nengo Neural Simulator',
        'Utilized Nengo 3.2.0 to simulate a neuro accumulator, integrating input functions. Implemented synaptic connections for binary decisions, assessing diverse ensembles to capture biological relevance in decision-making.'
    ),
    new PortfolioProject(
        'CV',
        '/vids/Django_Object_detection_1.mp4',
        '/img/DJ+TF-obj-det.png',
        'Django+TensorFL Hub:Object Detection',
        'Developed a robust Django web application and seamlessly integrated TensorFlow Hub\'s Inception ResNet V2 model, enhancing capabilities in image analysis and object detection.'
    ),
    new PortfolioProject(
        'AWS',
        '/pdfs/WildRydeReport.pdf',
        '/img/wildrydes-architecture.jpeg',
        'Wild Rydes',
        'SERVERLESS! Perform version control in the deployment code of static webpage, used AWS amplify to host the static webpage frontend and DynamoDB hold user data. Utilized tools: Codecommit, DynamoDB, Amplify, AWS CLI, AWS API gateway, Cognito'
    ),
    new PortfolioProject(
        'AWS',
        '/pdfs/DevSecOpsReport.pdf',
        '/img/TrendMicroControlPanel.png',
        'Trend Micro One',
        'Security + DevOps. Used Trend Micro to add security checks and block targeted attacks on the site. It can visualise attacks in the cloud infrastructure.'
    ),
    new PortfolioProject(
        'AWS',
        '/#',
        '/img/DevSecOps.JPG',
        'DevSecOps',
        ''
    ),
    new PortfolioProject(
        'AWS',
        'https://catalog.us-east-1.prod.workshops.aws/v2/workshops/44d3e2a0-ec6f-44df-9397-bcfdf129cadf/en-US/',
        'img/devmlops.png',
        'DEVMLOPS',
        'DevOps + Machine Learning'
    ),
    new PortfolioProject(
        'SWE',
        'https://github.com/codejedi-ai/Nationstate-LLM',
        'img/Nationstates-LLM.png',
        'Analyze progressive bias in the GPT-4 model: Nationstates-LLM',
        'Utilized the nationstates API to access data and make decisions in the game. Drafted a virtual nation constitution, enabling GPT-4 to read and select the most appropriate decision according to my constitution. Evaluation revealed minimal progressive bias, affirming GPT-4\'s alignment to constitutional values.'
    ),
    new PortfolioProject(
        'SWE',
        'https://github.com/codejedi-ai/GMM-Segmentation',
        'img/SegmanticPic.png',
        'GMM-Segmentation',
        'Implemented the Gaussian mixture model (GMM) for image segmentation, effectively distinguishing foreground and background. This segmentation facilitated the identification of prominent features, thereby enhancing overall image comprehension and visual understanding.'
    )
];
function generatePortfolioProject(project) {
    return `
        <figure class="portfolio-item one-four ${project.category} isotope-item effect-oscar">
            <a href="${project.videoUrl}" class="fancybox">
                <div class="portfolio_img">
                    <img src="${project.imageUrl}" alt="${project.title}" />
                </div>
                <figcaption>
                    <div>
                        <h2><span>${project.title}</span></h2>
                        <p>${project.description}</p>
                    </div>
                </figcaption>
            </a>
        </figure>
    `;
}



// Generate all portfolio items
function generateAllPortfolioItems(projects) {
    return projects
        .map(project => generatePortfolioProject(project))
        .join('\n');
}

// Create filter instances
const filters = [
    new Filter('all', 'All', '*', true),
    new Filter('Nengo', 'Neuroscience'),
    new Filter('RL', 'Reinforcement Learning'),
    new Filter('CV', 'Computer Vision'),
    new Filter('SWE', 'Software Developments'),
    new Filter('AWS', 'AWS')
];

// Generate filter HTML
const filterHTML = filters.map(filter => filter.toHTML()).join('\n');
console.log(filterHTML);

document.querySelector('#Portfolio').innerHTML = `
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

                    ${filterHTML}

                </ul>
            </div>
            <!--/Portfolio Filters -->

            <!-- Portfolio Wrapper -->
            <div class="isotope fadeInLeft animated wow grid" id="portfolio_wrapper">
            ${generateAllPortfolioItems(portfolioProjects)}


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
`