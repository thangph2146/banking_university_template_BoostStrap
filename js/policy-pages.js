// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, 
    once: true, 
});

// Set the current date for "last updated" sections
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdatedElements = document.querySelectorAll('#last-updated');
    if (lastUpdatedElements.length > 0) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
        
        lastUpdatedElements.forEach(element => {
            element.textContent = element.textContent.replace('[Ngày Tháng Năm Hiện Tại - Placeholder]', formattedDate);
        });
    }
}); 