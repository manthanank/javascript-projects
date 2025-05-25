/**
 * JavaScript Projects Collection
 * A collection of small, interactive JavaScript projects for learning and practice
 *
 * @author Manthan Ankolekar
 * @version 1.0.0
 * @license MIT
 */

// Project data configuration
const projectsData = [
    {
        name: "analog clock",
        description: "Beautiful analog clock with smooth animations and customizable themes. Features real-time updates and elegant design.",
        category: "interactive",
        tags: ["clock", "time", "animation", "css"],
        icon: "fas fa-clock",
        path: "./analog clock/index.html"
    },
    {
        name: "bmi calculator",
        description: "Calculate your Body Mass Index with instant results and health recommendations. Clean, user-friendly interface.",
        category: "utility",
        tags: ["health", "calculator", "fitness", "bmi"],
        icon: "fas fa-weight",
        path: "./bmi calculator/index.html"
    },
    {
        name: "calculator",
        description: "Full-featured calculator with standard arithmetic operations. Clean design with keyboard support.",
        category: "utility",
        tags: ["math", "calculator", "arithmetic", "numbers"],
        icon: "fas fa-calculator",
        path: "./calculator/index.html"
    },
    {
        name: "chess board",
        description: "Interactive chess board with piece movement and game logic. Perfect for chess enthusiasts.",
        category: "game",
        tags: ["chess", "board", "strategy", "game"],
        icon: "fas fa-chess",
        path: "./chess board/index.html"
    },
    {
        name: "countdown",
        description: "Customizable countdown timer for events, deadlines, and special occasions. Multiple timer support.",
        category: "utility",
        tags: ["timer", "countdown", "events", "time"],
        icon: "fas fa-hourglass-half",
        path: "./countdown/index.html"
    },
    {
        name: "digital clock",
        description: "Modern digital clock displaying current time with multiple format options and timezone support.",
        category: "interactive",
        tags: ["clock", "digital", "time", "display"],
        icon: "fas fa-digital-tachograph",
        path: "./digital clock/index.html"
    },
    {
        name: "digital resume",
        description: "Interactive digital resume with modern design, project showcase, and smooth navigation between sections.",
        category: "interactive",
        tags: ["resume", "portfolio", "professional", "cv"],
        icon: "fas fa-user-tie",
        path: "./digital resume/index.html"
    },
    {
        name: "flip a coin",
        description: "Simple and fun coin flipping game with realistic animations and random outcomes.",
        category: "game",
        tags: ["coin", "random", "game", "fun"],
        icon: "fas fa-coins",
        path: "./flip a coin/index.html"
    },
    {
        name: "grocery list",
        description: "Organize your shopping with this interactive grocery list. Add, edit, and check off items easily.",
        category: "utility",
        tags: ["shopping", "list", "grocery", "organization"],
        icon: "fas fa-shopping-cart",
        path: "./grocery list/index.html"
    },
    {
        name: "image slider",
        description: "Responsive image slider with smooth transitions, navigation controls, and automatic slideshow.",
        category: "interactive",
        tags: ["images", "slider", "gallery", "carousel"],
        icon: "fas fa-images",
        path: "./image slider/index.html"
    },
    {
        name: "javascript form validation",
        description: "Comprehensive form validation with real-time feedback and custom validation rules.",
        category: "utility",
        tags: ["form", "validation", "input", "feedback"],
        icon: "fas fa-check-circle",
        path: "./javascript form validation/index.html"
    },
    {
        name: "javascript quiz",
        description: "Interactive quiz application with scoring system, timer, and instant feedback on answers.",
        category: "game",
        tags: ["quiz", "questions", "learning", "trivia"],
        icon: "fas fa-question-circle",
        path: "./javascript quiz/index.html"
    },
    {
        name: "mail composer ui",
        description: "Modern email composition interface with rich text editing and attachment support.",
        category: "interactive",
        tags: ["email", "composer", "ui", "messaging"],
        icon: "fas fa-envelope",
        path: "./mail composer ui/index.html"
    },
    {
        name: "music player",
        description: "Feature-rich music player with playlist support, controls, and beautiful visualizations.",
        category: "interactive",
        tags: ["music", "audio", "player", "entertainment"],
        icon: "fas fa-music",
        path: "./music player/index.html"
    },
    {
        name: "profile card",
        description: "Elegant profile card component with social links, animations, and responsive design.",
        category: "interactive",
        tags: ["profile", "card", "social", "component"],
        icon: "fas fa-id-card",
        path: "./profile card/index.html"
    },
    {
        name: "qr code generator",
        description: "Generate QR codes instantly for text, URLs, and data. Download and customize options available.",
        category: "utility",
        tags: ["qr", "generator", "code", "utility"],
        icon: "fas fa-qrcode",
        path: "./qr code generator/index.html"
    },
    {
        name: "stopwatch",
        description: "Precision stopwatch with lap timing, pause/resume functionality, and clean interface.",
        category: "utility",
        tags: ["stopwatch", "timer", "timing", "sports"],
        icon: "fas fa-stopwatch",
        path: "./stopwatch/index.html"
    },
    {
        name: "tic tac toe",
        description: "Classic Tic Tac Toe game with AI opponent, score tracking, and winning animations.",
        category: "game",
        tags: ["game", "tic-tac-toe", "strategy", "classic"],
        icon: "fas fa-th",
        path: "./tic tac toe/index.html"
    },
    {
        name: "todo",
        description: "Complete task management application with categories, priorities, and progress tracking.",
        category: "utility",
        tags: ["todo", "tasks", "productivity", "organization"],
        icon: "fas fa-tasks",
        path: "./todo/index.html"
    },
    {
        name: "toggle dark mode",
        description: "Dark/light theme toggle implementation with smooth transitions and system preference detection.",
        category: "utility",
        tags: ["theme", "dark-mode", "toggle", "ui"],
        icon: "fas fa-moon",
        path: "./toggle dark mode/index.html"
    },
    {
        name: "weather app",
        description: "Real-time weather information with forecasts, location search, and beautiful weather icons.",
        category: "utility",
        tags: ["weather", "forecast", "location", "api"],
        icon: "fas fa-cloud-sun",
        path: "./weather app/index.html"
    },
    {
        name: "wifi qr code generator",
        description: "Generate QR codes for WiFi networks with password encryption and easy sharing options.",
        category: "utility",
        tags: ["wifi", "qr", "network", "sharing"],
        icon: "fas fa-wifi",
        path: "./wifi qr code generator/index.html"
    }
];

/**
 * Package information
 */
const packageInfo = {
    name: "javascript-projects",
    version: "1.0.0",
    description: "A collection of small JavaScript projects for learning and practice",
    author: "Manthan Ankolekar",
    license: "MIT",
    repository: "https://github.com/manthanank/javascript-projects",
    homepage: "https://github.com/manthanank/javascript-projects#readme"
};

/**
 * Get all projects
 * @returns {Array} Array of all project objects
 */
function getAllProjects() {
    return projectsData;
}

/**
 * Get projects by category
 * @param {string} category - Category to filter by ('interactive', 'utility', 'game')
 * @returns {Array} Array of filtered project objects
 */
function getProjectsByCategory(category) {
    if (!category || category === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.category === category);
}

/**
 * Get projects by tag
 * @param {string} tag - Tag to filter by
 * @returns {Array} Array of filtered project objects
 */
function getProjectsByTag(tag) {
    if (!tag) {
        return [];
    }
    return projectsData.filter(project =>
        project.tags.some(projectTag =>
            projectTag.toLowerCase().includes(tag.toLowerCase())
        )
    );
}

/**
 * Search projects by name or description
 * @param {string} searchTerm - Search term
 * @returns {Array} Array of matching project objects
 */
function searchProjects(searchTerm) {
    if (!searchTerm) {
        return projectsData;
    }

    const term = searchTerm.toLowerCase();
    return projectsData.filter(project =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
    );
}

/**
 * Get project by name
 * @param {string} name - Project name
 * @returns {Object|null} Project object or null if not found
 */
function getProjectByName(name) {
    if (!name) {
        return null;
    }
    return projectsData.find(project =>
        project.name.toLowerCase() === name.toLowerCase()
    ) || null;
}

/**
 * Get available categories
 * @returns {Array} Array of unique categories
 */
function getCategories() {
    return [...new Set(projectsData.map(project => project.category))];
}

/**
 * Get all tags
 * @returns {Array} Array of unique tags
 */
function getAllTags() {
    const allTags = projectsData.flatMap(project => project.tags);
    return [...new Set(allTags)];
}

/**
 * Get project statistics
 * @returns {Object} Statistics object
 */
function getProjectStats() {
    const categories = getCategories();
    const stats = {
        total: projectsData.length,
        categories: {}
    };

    categories.forEach(category => {
        stats.categories[category] = getProjectsByCategory(category).length;
    });

    return stats;
}

/**
 * Generate project URLs
 * @param {string} baseUrl - Base URL for the projects (optional)
 * @returns {Array} Array of projects with full URLs
 */
function generateProjectUrls(baseUrl = '') {
    return projectsData.map(project => ({
        ...project,
        url: baseUrl ? `${baseUrl}/${project.path}` : project.path
    }));
}

// Export for CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projects: projectsData,
        packageInfo,
        getAllProjects,
        getProjectsByCategory,
        getProjectsByTag,
        searchProjects,
        getProjectByName,
        getCategories,
        getAllTags,
        getProjectStats,
        generateProjectUrls
    };
}

// Export for ES6 modules
if (typeof window === 'undefined') {
    // Node.js environment
    global.JavaScriptProjects = {
        projects: projectsData,
        packageInfo,
        getAllProjects,
        getProjectsByCategory,
        getProjectsByTag,
        searchProjects,
        getProjectByName,
        getCategories,
        getAllTags,
        getProjectStats,
        generateProjectUrls
    };
} else {
    // Browser environment
    window.JavaScriptProjects = {
        projects: projectsData,
        packageInfo,
        getAllProjects,
        getProjectsByCategory,
        getProjectsByTag,
        searchProjects,
        getProjectByName,
        getCategories,
        getAllTags,
        getProjectStats,
        generateProjectUrls
    };
}
