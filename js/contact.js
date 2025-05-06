/**
 * contact.js - JavaScript for the Contact page
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with responsive settings
    AOS.init({
        duration: 800, 
        once: true,
        offset: 50,
        disable: window.innerWidth < 576 ? true : false // Disable animations on very small screens
    });
    
    // Refresh AOS on window resize for better responsive behavior
    window.addEventListener('resize', function() {
        AOS.refresh();
    });

    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        // Handle form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            
            // Reset previous feedback
            formFeedback.innerHTML = '';
            
            // Enhanced validation
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const subjectInput = document.getElementById('contactSubject');
            const messageInput = document.getElementById('contactMessage');
            
            let isValid = true;
            
            // Check required fields
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }
            
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('is-invalid');
                isValid = false;
            } else {
                subjectInput.classList.remove('is-invalid');
                subjectInput.classList.add('is-valid');
            }
            
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }
            
            if (!isValid) {
                formFeedback.innerHTML = `<div class="alert alert-danger">Vui lòng điền đầy đủ thông tin bắt buộc.</div>`;
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';

            setTimeout(() => {
                // Simulate success
                formFeedback.innerHTML = `
                    <div class="alert alert-success">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </div>`;
                contactForm.reset(); // Clear the form
                
                // Reset validation classes
                document.querySelectorAll('.form-control').forEach(el => {
                    el.classList.remove('is-valid');
                    el.classList.remove('is-invalid');
                });
                
                submitButton.disabled = false;
                submitButton.innerHTML = 'Gửi tin nhắn';

                // Hide feedback after a few seconds
                setTimeout(() => { 
                    formFeedback.innerHTML = ''; 
                }, 5000);

            }, 1500); // Simulate 1.5 second delay
        });
        
        // Reset validation state when user starts typing
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 