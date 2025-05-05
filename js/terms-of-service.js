// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Smooth scroll for in-page links from table of contents
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight current section in TOC based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.terms-section h3[id]');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < 150) { // Adjust threshold as needed
                currentSectionId = '#' + section.id;
            }
        });
        
        tocLinks.forEach(link => {
            if (link.getAttribute('href') === currentSectionId) {
                link.style.fontWeight = 'bold';
                link.style.color = 'var(--hub-red)';
            } else {
                link.style.fontWeight = 'normal';
                link.style.color = 'var(--hub-text-secondary)';
            }
        });
    });

    // Scroll to element if hash present
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const headerOffset = 85; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
}); 