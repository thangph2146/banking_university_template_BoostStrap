// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, 
    once: true, 
});

// Contact Form Submission Simulation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            
            // Basic validation check (can be more sophisticated)
            if (!contactForm.checkValidity()) {
                formFeedback.innerHTML = `<div class="alert alert-danger">Vui lòng điền đầy đủ thông tin bắt buộc.</div>`;
                contactForm.classList.add('was-validated'); // Show Bootstrap validation styles
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';

            setTimeout(() => {
                // Simulate success
                formFeedback.innerHTML = `<div class="alert alert-success">Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.</div>`;
                contactForm.reset(); // Clear the form
                contactForm.classList.remove('was-validated'); // Reset validation state
                submitButton.disabled = false;
                submitButton.innerHTML = 'Gửi tin nhắn';

                // Optional: Hide feedback after a few seconds
                setTimeout(() => { formFeedback.innerHTML = ''; }, 5000);

            }, 1500); // Simulate 1.5 second delay
        });
    }
}); 