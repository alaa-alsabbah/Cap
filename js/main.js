// Common/Shared JavaScript for all pages
document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle Logic
    const darkBtn = document.getElementById('dark-theme');
    const lightBtn = document.getElementById('light-theme');
    const body = document.body;

    if (!darkBtn || !lightBtn) return; // Exit if theme buttons don't exist

    // Helper to get CSS variables
    window.getStyle = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);

    // Theme toggle functions
    const switchToDarkTheme = () => {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
        // Trigger custom event for chart theme updates
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'dark' } }));
    };

    const switchToLightTheme = () => {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
        // Trigger custom event for chart theme updates
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'light' } }));
    };

    // Initialize active button based on saved theme
    if (savedTheme === 'light') {
        switchToLightTheme();
    } else {
        switchToDarkTheme();
    }

    darkBtn.addEventListener('click', switchToDarkTheme);
    darkBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchToDarkTheme();
        }
    });

    lightBtn.addEventListener('click', switchToLightTheme);
    lightBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchToLightTheme();
        }
    });

    // Page Transition Animation
    const navLinks = document.querySelectorAll('.nav-link[href]');
    const mainContent = document.querySelector('.main-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a hash link or empty
            if (!href || href === '#' || href.startsWith('#')) {
                return;
            }
            
            // Skip if it's the same page
            if (href === window.location.pathname.split('/').pop() || 
                (href === 'index.html' && window.location.pathname.endsWith('/'))) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            // Add fade-out animation to main content
            if (mainContent) {
                mainContent.classList.add('page-fade-out');
            }
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});
