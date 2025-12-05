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
