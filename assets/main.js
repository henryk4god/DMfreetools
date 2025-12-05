// Tool data - Add your tools here
const tools = [
    
    {
    id: 'digital-products-ideas-finder',
    name: 'Digital Products Ideas Finder',
    description: 'Discover profitable digital product ideas across trending niches',
    type: 'Product Finder Tool',
    url: 'https://henryk4god.github.io/Digital-Product-Ideas-Generator/',
    icon: '💡'
},
{
    id: 'most-asked-questions',
    name: 'Most Asked Questions',
    description: 'Find trending questions with proven market demand and scalable product ideas',
    type: 'Problem Finder Tool',
    url: 'https://henryk4god.github.io/maq/',
    icon: '❓'
},
{
    id: 'unique-products-idea-finder',
    name: 'Unique Products Idea Finder',
    description: 'Mix your expertise with trending questions to generate innovative digital products',
    type: 'Product Maker Tool',
    url: 'https://henryk4god.github.io/mixniches/',
    icon: '✨'
},
{
    id: 'know-your-customer-avatar',
    name: 'Know Your Customer Avatar',
    description: 'Create detailed customer profiles to understand your target audience',
    type: 'Customer Research Tool',
    url: 'https://henryk4god.github.io/avatar/',
    icon: '👥'
},
{
    id: 'product-big-promise',
    name: 'The Product Big Promise',
    description: 'Craft compelling product promises that resonate with your audience',
    type: 'Value Proposition Tool',
    url: 'https://henryk4god.github.io/bigresult/',
    icon: '🎯'
},
{
    id: 'product-outline-pain-points',
    name: 'Develop Product Outline Using Pain Points',
    description: 'Structure your product content around customer pain points and solutions',
    type: 'Product Development Tool',
    url: 'https://henryk4god.github.io/avatarpoutline/',
    icon: '📝'
},
{
    id: 'product-outline-features',
    name: 'Develop Product Outline Using Features Product',
    description: 'Build comprehensive product outlines based on features and benefits',
    type: 'Product Development Tool',
    url: 'https://henryk4god.github.io/yourpo/',
    icon: '🏗️'
},
{
    id: 'build-product-content',
    name: 'Build Your Product Content',
    description: 'Generate complete product content including modules, lessons, and materials',
    type: 'Content Creation Tool',
    url: 'https://henryk4god.github.io/prodgenerator/',
    icon: '📚'
},
{
    id: 'generate-sales-copy',
    name: 'Generate Sales Copy',
    description: 'Create persuasive sales copy that converts visitors into customers',
    type: 'Copywriting Tool',
    url: 'https://henryk4god.github.io/salescopy/',
    icon: '💰'
},
{
    id: 'generate-ad-copy',
    name: 'Generate Ad-Copy',
    description: 'Craft high-converting ad copy for various advertising platforms',
    type: 'Advertising Tool',
    url: 'https://henryk4god.github.io/adcopy/',
    icon: '📢'
},
{
    id: 'generate-email-sequence',
    name: 'Generate Email Sequence',
    description: 'Build effective email sequences for onboarding, nurturing, and sales',
    type: 'Email Marketing Tool',
    url: 'https://henryk4god.github.io/emailseq/',
    icon: '📧'
},
{
    id: 'generate-lead-magnet',
    name: 'Generate Lead Magnet',
    description: 'Create valuable lead magnets to grow your email list',
    type: 'Lead Generation Tool',
    url: 'https://henryk4god.github.io/leadmagnet/',
    icon: '🧲'
},
{
    id: 'generate-prompt-for-mockups',
    name: 'Generate Prompt For Mockups',
    description: 'Create AI prompts for generating professional product mockups and images',
    type: 'Design Tool',
    url: 'https://henryk4god.github.io/imagegen/',
    icon: '🎨'
},
{
    id: 'know-your-competitor-customer',
    name: 'Know Your Competitor Customer',
    description: 'Analyze competitor websites to understand their customer profiles',
    type: 'Competitor Research Tool',
    url: 'https://henryk4god.github.io/kyic/',
    icon: '🔍'
},
{
    id: 'social-media-content-1',
    name: 'Generate Social Media Content 1',
    description: 'AI-powered social media post generator with content ideas and stories',
    type: 'Social Media Tool',
    url: 'https://henryk4god.github.io/aicg/',
    icon: '🤖'
},
{
    id: 'social-media-content-2',
    name: 'Generate Social Media Content 2',
    description: 'Get ready-to-use content for all social media platforms',
    type: 'Social Media Tool',
    url: 'https://henryk4god.github.io/atyq/',
    icon: '📱'
},
{
    id: 'social-media-content-3',
    name: 'Generate Social Media Content 3',
    description: 'Generate social media content with engaging stories and answers',
    type: 'Social Media Tool',
    url: 'https://henryk4god.github.io/answithstory/',
    icon: '📝'
},
{
    id: 'facebook-ad-campaign',
    name: 'Facebook Ad Campaign',
    description: 'Plan and structure complete Facebook advertising campaigns',
    type: 'Advertising Tool',
    url: 'https://henryk4god.github.io/fbadcamp/',
    icon: '📊'
},
{
    id: 'generate-product-bonus',
    name: 'Generate Product Bonus',
    description: 'Create valuable bonuses to increase product perceived value and conversions',
    type: 'Upsell Tool',
    url: 'https://henryk4god.github.io/bonus/',
    icon: '🎁'
}
    
];

// DOM Elements
const dashboard = document.getElementById('dashboard');
const appContainer = document.getElementById('app-container');
const toolsGrid = document.getElementById('tools-grid');
const globalBackButton = document.getElementById('global-back-button');

// State management
let currentToolId = null;

// Initialize the dashboard
function initDashboard() {
    renderToolCards();
    setupEventListeners();
    
    // Check for deep linking
    if (window.location.hash) {
        const toolId = window.location.hash.substring(1);
        const tool = tools.find(t => t.id === toolId);
        if (tool) {
            setTimeout(() => openTool(toolId), 500);
        }
    }
}

// Render tool cards in the dashboard
function renderToolCards() {
    toolsGrid.innerHTML = '';
    
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <div class="tool-content">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <div class="tool-type">${tool.type}</div>
                <button class="tool-button" data-tool-id="${tool.id}">Try Now</button>
            </div>
        `;
        toolsGrid.appendChild(card);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Tool card buttons and cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tool-button')) {
            const toolId = e.target.getAttribute('data-tool-id');
            openTool(toolId);
        }
        
        if (e.target.closest('.tool-card')) {
            const card = e.target.closest('.tool-card');
            const button = card.querySelector('.tool-button');
            if (button && !e.target.classList.contains('tool-button')) {
                const toolId = button.getAttribute('data-tool-id');
                openTool(toolId);
            }
        }
    });
    
    // Global back button
    globalBackButton.addEventListener('click', closeCurrentTool);
    
    // Handle browser back button
    window.addEventListener('popstate', function(event) {
        if (currentToolId) {
            closeCurrentTool();
        }
    });
}

// Open a tool in full-screen iframe
function openTool(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || tool.url === '#') return;
    
    currentToolId = toolId;
    
    // Update URL for deep linking
    window.history.pushState({ toolId }, '', `#${toolId}`);
    
    // Show loading state
    showLoadingState(tool);
    
    // Hide dashboard and show app container
    dashboard.classList.remove('active-view');
    dashboard.classList.add('hidden-view');
    appContainer.classList.add('active');
    globalBackButton.classList.remove('hidden');
    
    // Create and load iframe
    loadToolInIframe(tool);
}

// Show loading state
function showLoadingState(tool) {
    appContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading ${tool.name}...</div>
        </div>
    `;
}

// Load tool in iframe
function loadToolInIframe(tool) {
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'app-iframe';
    iframe.src = tool.url;
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    
    // Handle iframe load
    iframe.onload = function() {
        console.log(`${tool.name} loaded successfully`);
    };
    
    // Handle iframe errors
    iframe.onerror = function() {
        showErrorState(tool, new Error('Failed to load tool'));
    };
    
    // Replace loading with iframe after a short delay to show loading state
    setTimeout(() => {
        appContainer.innerHTML = '';
        appContainer.appendChild(iframe);
    }, 1000);
}

// Show error state
function showErrorState(tool, error) {
    appContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-title">Unable to Load ${tool.name}</div>
            <div class="error-text">
                There was a problem loading the tool.<br>
                <small>Error: ${error.message}</small>
            </div>
            <button class="retry-button" onclick="retryToolLoad('${tool.id}')">Try Again</button>
            <button class="retry-button" onclick="closeCurrentTool()" style="margin-top: 10px; background: var(--gray);">Back to Dashboard</button>
        </div>
    `;
}

// Retry loading a tool
function retryToolLoad(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
        openTool(toolId);
    }
}

// Close current tool and return to dashboard
function closeCurrentTool() {
    if (!currentToolId) return;
    
    // Clear app container
    appContainer.innerHTML = '';
    appContainer.classList.remove('active');
    
    // Show dashboard
    dashboard.classList.remove('hidden-view');
    dashboard.classList.add('active-view');
    globalBackButton.classList.add('hidden');
    
    // Update URL
    if (window.location.hash) {
        window.history.pushState({}, '', window.location.pathname);
    }
    
    currentToolId = null;
}

// Make functions globally available
window.retryToolLoad = retryToolLoad;
window.closeCurrentTool = closeCurrentTool;

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
