// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 600, 
    once: true, 
});

// Forgot Password Form Simulation
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetEmailInput = document.getElementById('resetEmail');
    const resetFeedback = document.getElementById('reset-feedback');

    if (forgotPasswordForm && resetEmailInput && resetFeedback) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            event.stopPropagation();
            
            resetFeedback.innerHTML = ''; // Clear previous feedback
            forgotPasswordForm.classList.remove('was-validated'); // Reset validation state

            // Trigger Bootstrap validation
            if (!forgotPasswordForm.checkValidity()) {
                forgotPasswordForm.classList.add('was-validated');
                resetFeedback.innerHTML = `<div class="alert alert-danger alert-sm p-2">Vui lòng nhập đúng định dạng email trường (@hub.edu.vn).</div>`;
                return;
            }

            // Simulate sending reset link
            const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';

            setTimeout(() => {
                // Display success message regardless of whether email exists (security practice)
                resetFeedback.innerHTML = `<div class="alert alert-success">Nếu địa chỉ email <strong>${resetEmailInput.value}</strong> tồn tại trong hệ thống, một liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn (bao gồm cả thư mục Spam/Rác).</div>`;
                
                // Optionally clear the input field after success
                // resetEmailInput.value = ''; 

                submitButton.disabled = false;
                submitButton.innerHTML = 'Gửi liên kết đặt lại';

            }, 1500); // Simulate 1.5 second delay
        });

        // Clear validation state when user types in the email input
        resetEmailInput.addEventListener('input', () => {
            forgotPasswordForm.classList.remove('was-validated');
            resetFeedback.innerHTML = ''; // Clear feedback on typing
        });
    }
}); 