// Application page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const cardsSection = document.getElementById('applicationCardsSection');
    const detailSection = document.getElementById('applicationDetailSection');
    const backBtn = document.getElementById('applicationBackBtn');
    const viewButtons = document.querySelectorAll('.application-view-btn');
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailPhoneImage = document.getElementById('detailPhoneImage');

    // Application data
    const applicationData = {
        operations: {
            title: 'موظف التشغيل',
            description: 'نظام متكامل لإدارة عمليات التشغيل اليومية والمهام المطلوبة من الموظفين',
            image: 'assets/images/iphone-APP01.svg'
        },
        driver: {
            title: 'السائق',
            description: 'تطبيق شامل لإدارة المسارات ومراقبة الرحلات وتسجيل البيانات',
            image: 'assets/images/iphone-APP02.svg'
        },
        manager: {
            title: 'مدير العمليات',
            description: 'لوحة تحكم متقدمة لمراقبة وإدارة جميع العمليات والأنشطة',
            image: 'assets/images/iphone-APP03.svg'
        },
        product: {
            title: 'المنتج',
            description: 'نظام متكامل يغطي جميع جوانب عمليات إعادة التدوير من البداية إلى النهاية',
            image: 'assets/images/iphone-APP04.svg'
        }
    };

    // Show detail section
    function showDetail(role) {
        const data = applicationData[role];
        if (!data) return;

        // Update detail content
        detailTitle.textContent = data.title;
        detailDescription.textContent = data.description;
        detailPhoneImage.src = data.image;
        detailPhoneImage.alt = data.title;

        // Hide cards section and show detail section
        cardsSection.classList.add('hidden');
        detailSection.classList.remove('hidden');
    }

    // Show cards section
    function showCards() {
        detailSection.classList.add('hidden');
        cardsSection.classList.remove('hidden');
    }

    // Event listeners for view buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            showDetail(role);
        });
    });

    // Event listener for back button
    backBtn.addEventListener('click', function() {
        showCards();
    });
});
