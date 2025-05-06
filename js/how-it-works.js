/**
 * how-it-works.js - JavaScript for the How It Works page
 * Adds interactivity and animations to the page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with responsive options
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: window.innerWidth < 576 ? true : false // Disable animations on mobile for better performance
    });

    // Re-initialize AOS on window resize for better responsive behavior
    window.addEventListener('resize', function() {
        AOS.refresh();
    });

    // Smooth scrolling for anchor links with offset for navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust offset based on screen size
                const offset = window.innerWidth < 992 ? 60 : 80;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // If mobile navbar is open, close it after navigation
                if (window.innerWidth < 992) {
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Add hover effects to step cards - Only apply on non-touch devices
    if (!('ontouchstart' in window)) {
        const stepCards = document.querySelectorAll('.how-it-works-col');
        stepCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const iconCircle = this.querySelector('.icon-circle');
                if (iconCircle) {
                    iconCircle.style.transform = 'scale(1.1)';
                    iconCircle.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const iconCircle = this.querySelector('.icon-circle');
                if (iconCircle) {
                    iconCircle.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Enhance accessibility - add titles to icons 
    document.querySelectorAll('.tip-icon').forEach(icon => {
        const parentText = icon.parentElement.textContent.trim();
        const firstSentence = parentText.split('.')[0];
        icon.setAttribute('title', firstSentence);
        icon.setAttribute('aria-hidden', 'true');
    });
    
    // Improve responsive behavior for nested lists
    if (window.innerWidth < 768) {
        document.querySelectorAll('.how-it-works-text ul.small').forEach(list => {
            list.style.fontSize = '0.85rem';
        });
    }
}); 