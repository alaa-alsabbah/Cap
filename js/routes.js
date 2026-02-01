// Routes-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize progress bars
    const initProgressBars = () => {
        document.querySelectorAll('.route-progress-fill[data-value]').forEach(progressBar => {
            const value = parseInt(progressBar.dataset.value, 10);
            if (!isNaN(value) && value >= 0 && value <= 100) {
                progressBar.style.width = `${value}%`;
            } else {
                console.warn('Invalid data-value for progress bar:', progressBar);
            }
        });
    };

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initProgressBars();
        });
    } else {
        initProgressBars();
    }

    window.addEventListener('load', () => {
        initProgressBars();
    });
});
