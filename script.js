document.addEventListener('DOMContentLoaded', () => {
    const contentPanel = document.querySelector('.content-panel');
    const dots = document.querySelectorAll('.dot');
    const taskbarButtons = document.querySelectorAll('.taskbar button');
    let currentIndex = 0;
    const categories = {
        'ai-tech': 'AI & Tech',
        'movies-culture': 'Movies & Culture',
        'politics-economy': 'Politics & Economy',
        'games': 'Games'
    };
    const newsData = {
        'ai-tech': ['New AI model released...', 'Open-source project launched...'],
        'movies-culture': ['New movie trailer dropped...', 'Cultural event update...'],
        'politics-economy': ['Economic policy change...', 'Political summit news...'],
        'games': ['Game update released...', 'New game announced...']
    };

    // Update date dynamically
    const dateElement = document.querySelector('.date');
    const today = new Date().toLocaleDateString('en-GB');
    dateElement.textContent = today;

    // Simulate AI-generated news (run at 6:30 AM daily)
    function generateNews() {
        const now = new Date();
        if (now.getHours() === 6 && now.getMinutes() === 30) {
            // Placeholder for AI generation logic
            console.log('Generating news for', Object.keys(categories));
        }
    }
    setInterval(generateNews, 60000); // Check every minute

    // Carousel swipe functionality
    let touchStartX = 0;
    contentPanel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    contentPanel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50 && currentIndex < newsData[Object.keys(categories)[0]].length - 1) {
            currentIndex++;
        } else if (diff < -50 && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    });

    // Update carousel and dots
    function updateCarousel() {
        const category = Object.keys(categories)[Object.keys(categories).findIndex(c => categories[c] === contentPanel.querySelector('.theme').textContent)];
        contentPanel.querySelector('.news-content').textContent = newsData[category][currentIndex] || 'No more news...';
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
    }

    // Taskbar navigation
    taskbarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            contentPanel.querySelector('.theme').textContent = categories[category];
            currentIndex = 0;
            updateCarousel();
        });
    });

    updateCarousel(); // Initial load
});
