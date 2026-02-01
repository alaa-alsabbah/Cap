// Complaints-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.complaints-filter-btn');
    const complaintCards = document.querySelectorAll('.complaint-card');

    // Initialize filter counts
    function updateFilterCounts() {
        const counts = {
            all: complaintCards.length,
            new: document.querySelectorAll('.complaint-card[data-status="new"]').length,
            processing: document.querySelectorAll('.complaint-card[data-status="processing"]').length
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
        
        complaintCards.forEach((card) => {
            const status = card.dataset.status;
            
            if (filter === 'all' || status === filter) {
                card.classList.remove('hidden');
                card.style.animationDelay = `${visibleIndex * 0.05}s`;
                card.style.animation = 'fadeInUp 0.4s ease';
                visibleIndex++;
            } else {
                card.classList.add('hidden');
            }
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

    // Initialize filter counts on load
    updateFilterCounts();

    // Set default filter to 'all'
    const defaultFilter = document.querySelector('.complaints-filter-btn[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
        filterCards('all');
    }
});
