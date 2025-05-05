/**
 * Core JavaScript file for banking university template
 * Handles common functionality and dynamic script loading
 */

// Function to determine which page-specific scripts to load
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Initialize AOS for all pages
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
    
    // Conditional loading based on current page
    switch(page) {
        case "index.html":
        case "":  // For root URL
            loadScript('js/index.js');
            break;
        case "contact.html":
            loadScript('js/contact.js');
            break;
        case "event-detail.html":
            loadScript('js/event-detail.js');
            break;
        case "events.html":
            loadScript('js/events.js');
            break;
        case "faq.html":
            loadScript('js/faq.js');
            break;
        case "forgot-password.html":
            loadScript('js/forgot-password.js');
            break;
        case "how-it-works.html":
            loadScript('js/how-it-works.js');
            break;
        case "login.html":
            loadScript('js/login.js');
            break;
        case "privacy-policy.html":
        case "terms-of-service.html":
            loadScript('js/policy-pages.js');
            break;
        case "profile.html":
            loadScript('js/profile.js');
            break;
        case "register.html":
            loadScript('js/register.js');
            break;
        case "reset-password.html":
            loadScript('js/reset-password.js');
            break;
            
        // Add other pages as needed
    }
});

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
} 