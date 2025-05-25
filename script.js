// Project data with descriptions and categorization
const projects = [
    {
        name: "Analog Clock",
        folder: "analog clock",
        description: "A beautiful analog clock with smooth hand movements and customizable themes.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Canvas"]
    },
    {
        name: "BMI Calculator",
        folder: "bmi calculator",
        description: "Calculate your Body Mass Index with instant results and health recommendations.",
        category: "calculator",
        tech: ["HTML5", "CSS3", "JavaScript", "Form Validation"]
    },
    {
        name: "Calculator",
        folder: "calculator",
        description: "A fully functional calculator with standard mathematical operations.",
        category: "calculator",
        tech: ["HTML5", "CSS3", "JavaScript", "Math Operations"]
    },
    {
        name: "Chess Board",
        folder: "chess board",
        description: "Interactive chess board with piece movement and game logic.",
        category: "game",
        tech: ["HTML5", "CSS3", "JavaScript", "Game Logic"]
    },
    {
        name: "Countdown Timer",
        folder: "countdown",
        description: "Customizable countdown timer with alerts and visual effects.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Date API"]
    },
    {
        name: "Digital Clock",
        folder: "digital clock",
        description: "Real-time digital clock with multiple format options and themes.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Date API"]
    },
    {
        name: "Digital Resume",
        folder: "digital resume",
        description: "Professional digital resume with interactive sections and modern design.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
        name: "Flip a Coin",
        folder: "flip a coin",
        description: "Random coin flip simulator with smooth animations and statistics.",
        category: "game",
        tech: ["HTML5", "CSS3", "JavaScript", "Animations"]
    },
    {
        name: "Grocery List",
        folder: "grocery list",
        description: "Interactive grocery list manager with add, edit, and delete functionality.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Local Storage"]
    },
    {
        name: "Image Slider",
        folder: "image slider",
        description: "Responsive image carousel with navigation controls and auto-play.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Image Gallery"]
    },
    {
        name: "Form Validation",
        folder: "javascript form validation",
        description: "Comprehensive form validation with real-time feedback and error handling.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Validation"]
    },
    {
        name: "JavaScript Quiz",
        folder: "javascript quiz",
        description: "Interactive quiz application with scoring system and progress tracking.",
        category: "game",
        tech: ["HTML5", "CSS3", "JavaScript", "Quiz Logic"]
    },
    {
        name: "Mail Composer UI",
        folder: "mail composer ui",
        description: "Gmail-like email composer interface with rich text formatting.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "UI Components"]
    },
    {
        name: "Music Player",
        folder: "music player",
        description: "Feature-rich music player with playlist management and audio controls.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Audio API"]
    },
    {
        name: "Profile Card",
        folder: "profile card",
        description: "Animated profile card component with hover effects and social links.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Animations"]
    },
    {
        name: "QR Code Generator",
        folder: "qr code generator",
        description: "Generate QR codes for text, URLs, and other data with download option.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "QR Library"]
    },
    {
        name: "Stopwatch",
        folder: "stopwatch",
        description: "Precision stopwatch with lap timing and split time recording.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Timer API"]
    },
    {
        name: "Tic Tac Toe",
        folder: "tic tac toe",
        description: "Classic tic-tac-toe game with AI opponent and score tracking.",
        category: "game",
        tech: ["HTML5", "CSS3", "JavaScript", "Game AI"]
    },
    {
        name: "Todo List",
        folder: "todo",
        description: "Task management application with categories, priorities, and persistence.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Local Storage"]
    },
    {
        name: "Dark Mode Toggle",
        folder: "toggle dark mode",
        description: "Theme switcher component with smooth transitions and persistence.",
        category: "ui",
        tech: ["HTML5", "CSS3", "JavaScript", "Theme Toggle"]
    },
    {
        name: "Weather App",
        folder: "weather app",
        description: "Real-time weather information with location detection and forecasts.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "Weather API"]
    },
    {
        name: "WiFi QR Generator",
        folder: "wifi qr code generator",
        description: "Generate QR codes for WiFi networks with encryption support.",
        category: "utility",
        tech: ["HTML5", "CSS3", "JavaScript", "QR Library"]
    }
];

// DOM elements
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalProjectsElement = document.getElementById('totalProjects');
const visibleProjectsElement = document.getElementById('visibleProjects');
const themeToggle = document.getElementById('themeToggle');

// State
let currentFilter = 'all';
let currentSearch = '';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderProjects();
    setupEventListeners();
    updateStats();
    
    // Add staggered animation for initial load
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
});

// Initialize theme from local storage
function initializeTheme() {
    // Apply saved theme or default to light
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Toggle between light and dark themes
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Add transition animation
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterAndRenderProjects();
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            currentFilter = e.target.dataset.filter;
            filterAndRenderProjects();
        });
    });

    // Theme Toggle Button
    themeToggle.addEventListener('click', toggleTheme);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    searchInput.focus();
                    searchInput.select();
                    break;
                case '1':
                    e.preventDefault();
                    setFilter('all');
                    break;
                case '2':
                    e.preventDefault();
                    setFilter('utility');
                    break;
                case '3':
                    e.preventDefault();
                    setFilter('game');
                    break;
                case '4':
                    e.preventDefault();
                    setFilter('ui');
                    break;
                case '5':
                    e.preventDefault();
                    setFilter('calculator');
                    break;
                case 'd':
                    e.preventDefault();
                    toggleTheme();
                    break;
            }
        }
    });
}

// Set filter programmatically
function setFilter(filter) {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    currentFilter = filter;
    filterAndRenderProjects();
}

// Filter and render projects
function filterAndRenderProjects() {
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(currentSearch) ||
                            project.description.toLowerCase().includes(currentSearch) ||
                            project.tech.some(tech => tech.toLowerCase().includes(currentSearch));
        
        const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
        
        return matchesSearch && matchesFilter;
    });

    renderProjects(filteredProjects);
    updateStats(filteredProjects.length);
}

// Render projects to the grid
function renderProjects(projectsToRender = projects) {
    projectsGrid.innerHTML = '';
    
    projectsToRender.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const techTags = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.name}</h3>
            <span class="project-category">${getCategoryLabel(project.category)}</span>
        </div>
        <div class="project-body">
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
            <div class="project-actions">
                <a href="${project.folder}/index.html" class="action-btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    View Project
                </a>
                <button class="action-btn btn-secondary" onclick="viewSource('${project.folder}')">
                    <i class="fas fa-code"></i>
                    View Code
                </button>
            </div>
        </div>
    `;
    
    // Add click handler for card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
            window.open(`${project.folder}/index.html`, '_blank');
        }
    });
    
    return card;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'utility': 'Utility Tool',
        'game': 'Game',
        'ui': 'UI Component',
        'calculator': 'Calculator'
    };
    return labels[category] || category;
}

// View source code (opens in new tab)
function viewSource(folder) {
    // Create a simple source viewer page
    const sourceWindow = window.open('', '_blank');
    sourceWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Source Code - ${folder}</title>
            <style>
                body { 
                    font-family: 'Courier New', monospace; 
                    background: #1e1e1e; 
                    color: #d4d4d4; 
                    padding: 20px;
                    margin: 0;
                }
                h1 { color: #569cd6; }
                .file-list { 
                    background: #252526; 
                    padding: 20px; 
                    border-radius: 8px; 
                    margin: 20px 0;
                }
                .file-link { 
                    display: block; 
                    color: #9cdcfe; 
                    text-decoration: none; 
                    padding: 8px 0;
                    border-bottom: 1px solid #404040;
                }
                .file-link:hover { 
                    background: #2d2d30; 
                    padding-left: 10px;
                    transition: all 0.3s ease;
                }
            </style>
        </head>
        <body>
            <h1>Source Code: ${folder}</h1>
            <div class="file-list">
                <a href="${folder}/index.html" class="file-link" target="_blank">📄 index.html</a>
                <a href="${folder}/style.css" class="file-link" target="_blank">🎨 style.css</a>
                <a href="${folder}/script.js" class="file-link" target="_blank">⚡ script.js</a>
            </div>
            <p>Click on the files above to view the source code.</p>
        </body>
        </html>
    `);
}

// Update statistics
function updateStats(visibleCount = projects.length) {
    totalProjectsElement.textContent = projects.length;
    visibleProjectsElement.textContent = visibleCount;
}

// Search suggestions and autocomplete
searchInput.addEventListener('focus', function() {
    this.placeholder = 'Try searching for "calculator", "game", "clock", etc...';
});

searchInput.addEventListener('blur', function() {
    this.placeholder = 'Search projects...';
});

// Add some keyboard shortcuts info
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard shortcuts tooltip
    const searchBox = document.querySelector('.search-box');
    searchBox.title = 'Keyboard shortcuts:\nCtrl/Cmd + K: Focus search\nCtrl/Cmd + 1-5: Quick filter';
});

// Performance optimization: Debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to search
const debouncedSearch = debounce(() => {
    filterAndRenderProjects();
}, 300);

// Replace the original search event listener
searchInput.removeEventListener('input', filterAndRenderProjects);
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    debouncedSearch();
});

// Add loading animation
function showLoading() {
    projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
}

// Add smooth scroll to top when filtering
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced filter functionality with smooth transitions
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        scrollToTop();
    });
});
