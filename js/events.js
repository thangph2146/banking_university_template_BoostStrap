// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
});

// Event Filtering and Display Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('event-search-input');
    const typeSelect = document.getElementById('event-type-select');
    const dateInput = document.getElementById('event-date-input');
    const eventCardContainer = document.getElementById('event-card-container');
    const eventCards = eventCardContainer.querySelectorAll('.col:not(#no-results-message)'); // Select only event card columns
    const noResultsMessage = document.getElementById('no-results-message');

    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedType = typeSelect.value;
        const selectedDate = dateInput.value;

        let visibleCount = 0; // Counter for visible cards

        eventCards.forEach(cardCol => {
            const card = cardCol.querySelector('.event-card-v2');
            if (!card) return; // Skip if card element not found

            const title = card.querySelector('.event-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.event-description')?.textContent.toLowerCase() || '';
            const category = cardCol.dataset.category || ''; // Get category from data-attribute on the column
            const eventDate = cardCol.dataset.date || ''; // Get date from data-attribute

            // Check search term match (in title or description)
            const searchMatch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);

            // Check type match
            const typeMatch = selectedType === '' || category === selectedType;

            // Check date match
            const dateMatch = selectedDate === '' || eventDate === selectedDate;

            // Show or hide the column based on matches
            if (searchMatch && typeMatch && dateMatch) {
                cardCol.style.display = ''; // Show
                visibleCount++; // Increment counter
            } else {
                cardCol.style.display = 'none'; // Hide
            }
        });

        // Show/hide the "no results" message
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('d-none');
        } else {
            noResultsMessage.classList.add('d-none');
        }
    }

    // Add event listeners to filters
    if (searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }
    if (typeSelect) {
        typeSelect.addEventListener('change', filterEvents);
    }
    if (dateInput) {
        dateInput.addEventListener('change', filterEvents);
    } 

    // Initialize Bootstrap Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Populate Carousel from Event List
    const eventListCards = eventCardContainer.querySelectorAll('.col:not(#no-results-message) .event-card-v2'); // Select the actual cards
    const carouselItems = document.querySelectorAll('#heroCarouselEvents .carousel-item');
    const numSlidesToPopulate = Math.min(eventListCards.length, carouselItems.length, 3); // Populate up to 3 slides

    for (let i = 0; i < numSlidesToPopulate; i++) {
        const card = eventListCards[i];
        const slide = carouselItems[i];

        // Extract data from the event card
        const imgSrc = card.querySelector('.event-image')?.src || '';
        const category = card.querySelector('.event-category')?.textContent || 'Sự kiện';
        const title = card.querySelector('.event-title')?.textContent || 'Tiêu đề sự kiện';
        const description = card.querySelector('.event-description')?.textContent || 'Mô tả sự kiện...';
        const detailLink = card.querySelector('.event-link')?.href || '#';

        // Update the carousel slide
        if (imgSrc) {
            slide.style.backgroundImage = `url('${imgSrc}')`;
        }
        
        const slideCategory = slide.querySelector('.hero-content-box .small');
        if (slideCategory) slideCategory.textContent = category;

        const slideTitle = slide.querySelector('.hero-content-box h1');
        if (slideTitle) slideTitle.textContent = title;

        const slideDescription = slide.querySelector('.hero-content-box p:not(.small)');
        if (slideDescription) slideDescription.textContent = description;

        // Update buttons (Example: update the primary button link)
        const slidePrimaryButton = slide.querySelector('.hero-content-box .btn-hub-primary');
        if (slidePrimaryButton) {
            slidePrimaryButton.href = detailLink;
            slidePrimaryButton.textContent = 'Xem chi tiết'; // Ensure consistent text
        }
        // Optionally hide or update the secondary button if it exists
        const slideSecondaryButton = slide.querySelector('.hero-content-box .btn-hub-secondary');
        if(slideSecondaryButton) {
            // Example: Hide secondary button if not needed for all slides
            slideSecondaryButton.style.display = 'none'; 
            // Or update its link/text
            // slideSecondaryButton.href = detailLink + '#register'; 
            // slideSecondaryButton.textContent = 'Đăng ký';
        }
    }
}); 