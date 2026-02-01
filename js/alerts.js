// Alerts-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.alerts-filter-btn');
    const alertCards = document.querySelectorAll('.alert-card');

    // Initialize filter counts
    function updateFilterCounts() {
        const counts = {
            all: alertCards.length,
            new: document.querySelectorAll('.alert-card[data-status="new"]').length,
            processing: document.querySelectorAll('.alert-card[data-status="processing"]').length,
            resolved: document.querySelectorAll('.alert-card[data-status="resolved"]').length
        };

        filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            const countSpan = btn.querySelector('.filter-count');
            if (countSpan && counts[filter] !== undefined) {
                countSpan.textContent = `(${counts[filter]})`;
            }
        });
    }

    // Filter cards based on selected filter
    function filterCards(filter) {
        let visibleIndex = 0;
        
        alertCards.forEach((card) => {
            const status = card.dataset.status;
            
            // Reset animation to ensure repositioning
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            // Add animation delay for staggered effect
            setTimeout(() => {
                if (filter === 'all' || status === filter) {
                    card.classList.remove('hidden');
                    card.style.animationDelay = `${visibleIndex * 0.05}s`;
                    card.style.animation = 'fadeInUp 0.4s ease';
                    visibleIndex++;
                } else {
                    card.classList.add('hidden');
                }
            }, visibleIndex * 30);
        });
    }

    // Handle filter button clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter cards with animation
            filterCards(filter);
        });
    });

    // Confirm All button functionality
    const confirmAllBtn = document.querySelector('.alerts-confirm-all-btn');
    if (confirmAllBtn) {
        confirmAllBtn.addEventListener('click', function() {
            const visibleCards = document.querySelectorAll('.alert-card:not(.hidden)');
            if (visibleCards.length > 0) {
                // Add animation/confirmation logic here
                console.log(`Confirming ${visibleCards.length} alerts`);
                // You can add confirmation logic or API call here
            }
        });
    }

    // Individual confirm button functionality
    const confirmButtons = document.querySelectorAll('.alert-confirm-btn');
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.alert-card');
            if (card) {
                // Add animation/confirmation logic here
                console.log('Confirming alert:', card.dataset.status);
                // You can add confirmation logic or API call here
            }
        });
    });

    // Initialize filter counts on load
    updateFilterCounts();

    // Set default filter to 'all'
    const defaultFilter = document.querySelector('.alerts-filter-btn[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
        filterCards('all');
    }
});
