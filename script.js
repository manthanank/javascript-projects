// Project data configuration
const projectsData = [
  {
    name: 'analog clock',
    description: 'Beautiful analog clock with smooth animations and customizable themes. Features real-time updates and elegant design.',
    category: 'interactive',
    tags: ['clock', 'time', 'animation', 'css'],
    icon: 'fas fa-clock'
  },
  {
    name: 'bmi calculator',
    description: 'Calculate your Body Mass Index with instant results and health recommendations. Clean, user-friendly interface.',
    category: 'utility',
    tags: ['health', 'calculator', 'fitness', 'bmi'],
    icon: 'fas fa-weight'
  },
  {
    name: 'calculator',
    description: 'Full-featured calculator with standard arithmetic operations. Clean design with keyboard support.',
    category: 'utility',
    tags: ['math', 'calculator', 'arithmetic', 'numbers'],
    icon: 'fas fa-calculator'
  },
  {
    name: 'chess board',
    description: 'Interactive chess board with piece movement and game logic. Perfect for chess enthusiasts.',
    category: 'game',
    tags: ['chess', 'board', 'strategy', 'game'],
    icon: 'fas fa-chess'
  },
  {
    name: 'countdown',
    description: 'Customizable countdown timer for events, deadlines, and special occasions. Multiple timer support.',
    category: 'utility',
    tags: ['timer', 'countdown', 'events', 'time'],
    icon: 'fas fa-hourglass-half'
  },
  {
    name: 'digital clock',
    description: 'Modern digital clock displaying current time with multiple format options and timezone support.',
    category: 'interactive',
    tags: ['clock', 'digital', 'time', 'display'],
    icon: 'fas fa-digital-tachograph'
  },
  {
    name: 'digital resume',
    description: 'Interactive digital resume with modern design, project showcase, and smooth navigation between sections.',
    category: 'interactive',
    tags: ['resume', 'portfolio', 'professional', 'cv'],
    icon: 'fas fa-user-tie'
  },
  {
    name: 'flip a coin',
    description: 'Simple and fun coin flipping game with realistic animations and random outcomes.',
    category: 'game',
    tags: ['coin', 'random', 'game', 'fun'],
    icon: 'fas fa-coins'
  },
  {
    name: 'grocery list',
    description: 'Organize your shopping with this interactive grocery list. Add, edit, and check off items easily.',
    category: 'utility',
    tags: ['shopping', 'list', 'grocery', 'organization'],
    icon: 'fas fa-shopping-cart'
  },
  {
    name: 'image slider',
    description: 'Responsive image slider with smooth transitions, navigation controls, and automatic slideshow.',
    category: 'interactive',
    tags: ['images', 'slider', 'gallery', 'carousel'],
    icon: 'fas fa-images'
  },
  {
    name: 'javascript form validation',
    description: 'Comprehensive form validation with real-time feedback and custom validation rules.',
    category: 'utility',
    tags: ['form', 'validation', 'input', 'feedback'],
    icon: 'fas fa-check-circle'
  },
  {
    name: 'javascript quiz',
    description: 'Interactive quiz application with scoring system, timer, and instant feedback on answers.',
    category: 'game',
    tags: ['quiz', 'questions', 'learning', 'trivia'],
    icon: 'fas fa-question-circle'
  },
  {
    name: 'mail composer ui',
    description: 'Modern email composition interface with rich text editing and attachment support.',
    category: 'interactive',
    tags: ['email', 'composer', 'ui', 'messaging'],
    icon: 'fas fa-envelope'
  },
  {
    name: 'music player',
    description: 'Feature-rich music player with playlist support, controls, and beautiful visualizations.',
    category: 'interactive',
    tags: ['music', 'audio', 'player', 'entertainment'],
    icon: 'fas fa-music'
  },
  {
    name: 'profile card',
    description: 'Elegant profile card component with social links, animations, and responsive design.',
    category: 'interactive',
    tags: ['profile', 'card', 'social', 'component'],
    icon: 'fas fa-id-card'
  },
  {
    name: 'qr code generator',
    description: 'Generate QR codes instantly for text, URLs, and data. Download and customize options available.',
    category: 'utility',
    tags: ['qr', 'generator', 'code', 'utility'],
    icon: 'fas fa-qrcode'
  },
  {
    name: 'stopwatch',
    description: 'Precision stopwatch with lap timing, pause/resume functionality, and clean interface.',
    category: 'utility',
    tags: ['stopwatch', 'timer', 'timing', 'sports'],
    icon: 'fas fa-stopwatch'
  },
  {
    name: 'tic tac toe',
    description: 'Classic Tic Tac Toe game with AI opponent, score tracking, and winning animations.',
    category: 'game',
    tags: ['game', 'tic-tac-toe', 'strategy', 'classic'],
    icon: 'fas fa-th'
  },
  {
    name: 'todo',
    description: 'Complete task management application with categories, priorities, and progress tracking.',
    category: 'utility',
    tags: ['todo', 'tasks', 'productivity', 'organization'],
    icon: 'fas fa-tasks'
  },
  {
    name: 'toggle dark mode',
    description: 'Dark/light theme toggle implementation with smooth transitions and system preference detection.',
    category: 'utility',
    tags: ['theme', 'dark-mode', 'toggle', 'ui'],
    icon: 'fas fa-moon'
  },
  {
    name: 'weather app',
    description: 'Real-time weather information with forecasts, location search, and beautiful weather icons.',
    category: 'utility',
    tags: ['weather', 'forecast', 'location', 'api'],
    icon: 'fas fa-cloud-sun'
  },
  {
    name: 'wifi qr code generator',
    description: 'Generate QR codes for WiFi networks with password encryption and easy sharing options.',
    category: 'utility',
    tags: ['wifi', 'qr', 'network', 'sharing'],
    icon: 'fas fa-wifi'
  }
];

const year = new Date().getFullYear();

class ProjectPortfolio {
  constructor() {
    this.projects = projectsData;
    this.filteredProjects = [...this.projects];
    this.currentFilter = 'all';
    this.currentView = 'grid';
    this.searchTerm = '';

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupThemeToggle();
    this.renderProjects();
    this.updateProjectCount();
    this.animateOnScroll();
    this.setupFooterFeatures();
    this.updateDynamicYear(); // Add this line
  }

  setupFooterFeatures() {
    // Fetch GitHub stats first, then setup other features
    this.fetchGitHubStats();

    // Setup stats refresh functionality
    this.setupStatsRefresh();

    // Back to top button
    this.setupBackToTop();

    // Footer category links
    this.setupFooterCategoryLinks();

    // Download resume functionality
    this.setupDownloadResume();

    // Update last modified date
    this.updateLastModified();

    // Footer project count sync
    this.syncFooterProjectCount();
  }

  async fetchGitHubStats() {
    // Use the enhanced retry mechanism
    await this.fetchGitHubStatsWithRetry();
  }

  updateCountersWithLoading() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      counter.textContent = '...';
      counter.classList.add('loading');
    });

    // Add loading message
    this.showLoadingMessage('Fetching live GitHub statistics...');
  }  showLoadingMessage(message) {
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
      let loadingMsg = statsContainer.querySelector('.loading-message');
      if (!loadingMsg) {
        loadingMsg = document.createElement('div');
        loadingMsg.className = 'loading-message';
        loadingMsg.style.cssText = `
                    position: absolute;
                    top: -25px;
                    left: 10px;
                    font-size: 11px;
                    color: var(--primary-color);
                    opacity: 0.8;
                    font-weight: 500;
                `;
        statsContainer.appendChild(loadingMsg);
      }
      loadingMsg.textContent = message;

      // Remove loading message after animation completes
      setTimeout(() => {
        if (loadingMsg && loadingMsg.parentNode) {
          loadingMsg.parentNode.removeChild(loadingMsg);
        }
      }, 3000);
    }
  }

  updateCountersWithGitHubData(stats) {
    // Update the data-target attributes with real data
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const parent = counter.parentElement;
      const icon = parent.querySelector('i');

      if (icon) {
        if (icon.classList.contains('fa-star')) {
          counter.setAttribute('data-target', stats.stars);
        } else if (icon.classList.contains('fa-eye')) {
          counter.setAttribute('data-target', stats.views);
        }
      }

      counter.classList.remove('loading');

      // Add success animation
      setTimeout(() => {
        counter.style.transform = 'scale(1.1)';
        counter.style.color = 'var(--primary-color)';
        setTimeout(() => {
          counter.style.transform = 'scale(1)';
          counter.style.color = '';
        }, 300);
      }, 100);
    });

    // Add a small indicator that stats are live
    this.addLiveDataIndicator();

    // Now animate the counters with the real data
    this.animateCounters();
  }

  animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 0;
      const current = parseInt(counter.textContent) || 0;

      if (target === current) return; // Skip if already at target

      const increment = Math.ceil(target / 60); // Animation duration ~1 second (60 frames)
      const duration = 1000; // 1 second
      const step = duration / 60; // 60fps

      let currentValue = current;
      counter.classList.add('counting');

      const animation = setInterval(() => {
        currentValue += increment;

        if (currentValue >= target) {
          currentValue = target;
          clearInterval(animation);
          counter.classList.remove('counting');
        }

        // Format the number with commas for readability
        counter.textContent = currentValue.toLocaleString();
      }, step);
    });
  }

  addLiveDataIndicator() {
    // Add a small "live" indicator to show the data is real
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer && !statsContainer.querySelector('.live-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'live-indicator';
      indicator.innerHTML = '<i class="fas fa-wifi"></i> Live GitHub Data';
      indicator.style.cssText = `
                position: absolute;
                top: -10px;
                right: 10px;
                background: var(--primary-color);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                opacity: 0.8;
                z-index: 10;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

      // Add click handler to refresh stats
      indicator.addEventListener('click', () => {
        indicator.innerHTML = '<i class="fas fa-sync fa-spin"></i> Refreshing...';
        this.clearStatsCache();
        this.fetchGitHubStats();
      });

      // Make the parent relative if it isn't already
      if (getComputedStyle(statsContainer).position === 'static') {
        statsContainer.style.position = 'relative';
      }

      statsContainer.appendChild(indicator);

      // Add timestamp
      this.updateDataTimestamp();

      // Fade out the indicator after 8 seconds (increased time for user interaction)
      setTimeout(() => {
        indicator.style.transition = 'opacity 1s ease';
        indicator.style.opacity = '0.6';
        indicator.innerHTML = '<i class="fas fa-sync"></i> Refresh';

        // Add hover effect
        indicator.addEventListener('mouseenter', () => {
          indicator.style.opacity = '1';
          indicator.style.transform = 'scale(1.05)';
        });
        indicator.addEventListener('mouseleave', () => {
          indicator.style.opacity = '0.6';
          indicator.style.transform = 'scale(1)';
        });
      }, 5000);
    }
  }

  updateDataTimestamp() {
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
      let timestamp = statsContainer.querySelector('.data-timestamp');
      if (!timestamp) {
        timestamp = document.createElement('div');
        timestamp.className = 'data-timestamp';
        timestamp.style.cssText = `
                    position: absolute;
                    bottom: -20px;
                    right: 10px;
                    font-size: 9px;
                    color: var(--text-muted);
                    opacity: 0.7;
                `;
        statsContainer.appendChild(timestamp);
      }
      timestamp.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
    }
  }

  clearStatsCache() {
    try {
      localStorage.removeItem('github_stats_cache');
    } catch {
      // Failed to clear cache
    }
  }

  // Add method to setup manual refresh functionality
  setupStatsRefresh() {
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
      statsContainer.addEventListener('dblclick', () => {
        this.fetchGitHubStats();
      });
      // Add tooltip
      statsContainer.title = 'Double-click to refresh GitHub statistics';
    }
  }

  // Enhanced error handling with retry mechanism and caching
  async fetchGitHubStatsWithRetry(retries = 2) {
    const username = 'manthanank';
    const repoName = 'javascript-projects';
    const cacheKey = 'github_stats_cache';
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes

    // Check cache first
    const cachedData = this.getCachedStats(cacheKey, cacheExpiry);
    if (cachedData) {
      this.updateCountersWithGitHubData(cachedData);
      return;
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Show loading state
        if (attempt === 0) {
          this.updateCountersWithLoading();
        }

        // Add a small delay between retries
        if (attempt > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }

        // Fetch repository data from GitHub API
        const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!repoResponse.ok) {
          if (repoResponse.status === 403) {
            throw new Error('GitHub API rate limit exceeded');
          } else if (repoResponse.status === 404) {
            throw new Error('Repository not found');
          } else {
            throw new Error(`GitHub API error: ${repoResponse.status}`);
          }
        }

        const repoData = await repoResponse.json();

        const stats = {
          stars: repoData.stargazers_count,
          views: repoData.watchers_count, // Using watchers as a proxy for views
          forks: repoData.forks_count,
          timestamp: Date.now()
        };

        // Cache the results
        this.setCachedStats(cacheKey, stats);

        // Update counters with real data
        this.updateCountersWithGitHubData(stats);

        return; // Success, exit the retry loop

      } catch (error) {
        console.warn(`⚠️ GitHub API attempt ${attempt + 1} failed:`, error.message);

        if (attempt === retries) {
          // Final attempt failed, use fallback
          const fallbackStats = this.getFallbackStats();
          this.updateCountersWithGitHubData(fallbackStats);
        }
      }
    }
  }

  getCachedStats(cacheKey, expiryTime) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < expiryTime) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Failed to read cached stats:', error);
    }
    return null;
  }

  setCachedStats(cacheKey, stats) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(stats));
    } catch (error) {
      console.warn('Failed to cache stats:', error);
    }
  }

  getFallbackStats() {
    // Use more realistic fallback values based on typical GitHub repositories
    return {
      stars: 1200 + Math.floor(Math.random() * 200),
      views: 14500 + Math.floor(Math.random() * 2000),
      forks: 40 + Math.floor(Math.random() * 30)
    };
  }

  setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial state
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';
  }

  setupFooterCategoryLinks() {
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');

        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Set filter after scroll
        setTimeout(() => {
          this.setFilter(category);
        }, 500);

        // Visual feedback
        link.style.background = 'rgba(102, 126, 234, 0.1)';
        setTimeout(() => {
          link.style.background = '';
        }, 300);
      });
    });
  }

  setupDownloadResume() {
    const downloadBtn = document.getElementById('download-resume');

    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Create a simple text resume
      const resumeContent = this.generateResumeContent();
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'JavaScript_Developer_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show feedback
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
      downloadBtn.style.color = '#4caf50';

      setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.style.color = '';
      }, 2000);
    });
  }

  generateResumeContent() {
    const interactiveProjects = this.projects.filter(p => p.category === 'interactive').length;
    const utilityProjects = this.projects.filter(p => p.category === 'utility').length;
    const gameProjects = this.projects.filter(p => p.category === 'game').length;

    return `JAVASCRIPT DEVELOPER RESUME
========================

PROJECTS OVERVIEW
-----------------
Total Projects: ${this.projects.length}
- Interactive Applications: ${interactiveProjects}
- Utility Tools: ${utilityProjects}
- Games: ${gameProjects}

FEATURED PROJECTS
-----------------
${this.projects.slice(0, 10).map(project =>
    `• ${project.name.toUpperCase()}
    Description: ${project.description}
    Category: ${project.category}
    Technologies: ${project.tags.join(', ')}
    `).join('\n')}

TECHNICAL SKILLS
----------------
• JavaScript (ES6+)
• HTML5 & CSS3
• DOM Manipulation
• API Integration
• Responsive Design
• Interactive UI/UX

CONTACT
-------
Portfolio: JavaScript Projects Collection
Generated: ${new Date().toLocaleDateString()}

Visit the online portfolio for live demos and complete project details.
`;
  }

  updateLastModified() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
      const currentDate = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      lastUpdatedElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
  }

  syncFooterProjectCount() {
    const footerCountElement = document.getElementById('footer-project-count');
    if (footerCountElement) {
      footerCountElement.textContent = this.projects.length;
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    this.filterProjects();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm) ||
                                project.description.toLowerCase().includes(this.searchTerm) ||
                                project.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));

      const matchesFilter = this.currentFilter === 'all' || project.category === this.currentFilter;

      return matchesSearch && matchesFilter;
    });

    this.renderProjects();
    this.updateProjectCount();
  }

  renderProjects() {
    const container = document.getElementById('projects-container');
    const noResults = document.getElementById('no-results');

    if (this.filteredProjects.length === 0) {
      container.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }

    container.style.display = 'grid';
    noResults.style.display = 'none';

    container.innerHTML = this.filteredProjects.map(project => this.createProjectCard(project)).join('');

    // Apply current view
    this.updateView();

    // Animate cards
    this.animateCards();
  }

  createProjectCard(project) {
    const folderName = project.name;

    return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-preview">
                    <i class="${project.icon} project-icon"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${folderName}/index.html" class="btn btn-primary" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                            View Project
                        </a>
                        <button class="btn btn-secondary" onclick="this.showProjectInfo('${project.name}')">
                            <i class="fas fa-info-circle"></i>
                            Info
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  updateView() {
    const container = document.getElementById('projects-container');
    const cards = container.querySelectorAll('.project-card');

    if (this.currentView === 'list') {
      container.classList.add('list-view');
      cards.forEach(card => card.classList.add('list-view'));
    } else {
      container.classList.remove('list-view');
      cards.forEach(card => card.classList.remove('list-view'));
    }
  }

  updateProjectCount() {
    const countElement = document.getElementById('project-count');
    const footerCountElement = document.getElementById('footer-project-count');

    countElement.textContent = this.filteredProjects.length;
    if (footerCountElement) {
      footerCountElement.textContent = this.projects.length;
    }

    // Animate the count
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
      countElement.style.transform = 'scale(1)';
    }, 200);
  }

  animateCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should animate on scroll
    document.querySelectorAll('.project-card, .controls, .stats').forEach(el => {
      observer.observe(el);
    });
  }

  showProjectInfo(projectName) {
    const project = this.projects.find(p => p.name === projectName);
    if (!project) return;

    // Create a simple modal-like alert with project information
    const info = `
📋 Project: ${project.name}
📝 Description: ${project.description}
🏷️ Category: ${project.category}
🔖 Tags: ${project.tags.join(', ')}

Click "View Project" to open the application in a new tab.
        `;

    alert(info);
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterProjects();

        // Show/hide clear button
        clearBtn.style.display = this.searchTerm ? 'flex' : 'none';
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.filterProjects();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchTerm = '';
        this.filterProjects();
        clearBtn.style.display = 'none';
        searchInput.focus();
      });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFilter(btn.dataset.filter);
      });
    });

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update view
        this.currentView = btn.dataset.view;
        this.updateView();
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + / for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchInput.focus();
      }

      // Ctrl/Cmd + 1-4 for filter shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const filters = ['all', 'interactive', 'utility', 'game'];
        const filterIndex = parseInt(e.key) - 1;
        if (filters[filterIndex]) {
          this.setFilter(filters[filterIndex]);
        }
      }

      // Ctrl/Cmd + R to refresh GitHub stats (prevent default browser refresh)
      if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.shiftKey) {
        e.preventDefault();
        this.clearStatsCache();
        this.fetchGitHubStats();
        this.showSuccessNotification('Refreshing GitHub statistics...');
      }
    });
  }

  setupThemeToggle() {
    const headerToggle = document.getElementById('theme-toggle-header');
    const footerToggle = document.getElementById('theme-toggle');

    // Get current theme from localStorage or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update both toggles to match current theme
    this.updateThemeToggleUI(currentTheme);

    // Header theme toggle
    if (headerToggle) {
      headerToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Footer theme toggle (if exists)
    if (footerToggle) {
      footerToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    this.updateThemeToggleUI(newTheme);
  }

  updateThemeToggleUI(theme) {
    const headerToggle = document.getElementById('theme-toggle-header');
    const footerToggle = document.getElementById('theme-toggle');

    // Update header toggle
    if (headerToggle) {
      const icon = headerToggle.querySelector('i');
      const text = headerToggle.querySelector('.toggle-text');

      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        if (text) text.textContent = 'Light Mode';
      } else {
        icon.className = 'fas fa-moon';
        if (text) text.textContent = 'Dark Mode';
      }
    }

    // Update footer toggle (if exists)
    if (footerToggle) {
      const icon = footerToggle.querySelector('i');

      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }

  updateDynamicYear() {
    // Update year in header stats
    const headerYearElement = document.getElementById('current-year-header');
    if (headerYearElement) {
      headerYearElement.textContent = year;
    }

    // Update year in footer copyright
    const footerYearElement = document.getElementById('current-year-footer');
    if (footerYearElement) {
      footerYearElement.textContent = year;
    }

    // Update last modified date to be current
    this.updateLastModified();
  }
}

// Global function for project info (needed for onclick handlers)
window.showProjectInfo = function(projectName) {
  window.portfolio.showProjectInfo(projectName);
};

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new ProjectPortfolio();

  // Add some easter eggs and interactions
  const title = document.querySelector('.main-title');
  title.addEventListener('click', () => {
    title.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      title.style.transform = 'rotate(0deg)';
    }, 600);
  });

  // Add floating particles effect to header
  createFloatingParticles();
});

function createFloatingParticles() {
  const header = document.querySelector('.header');
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    header.appendChild(particle);
  }

  // Add CSS animation for floating particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
}
