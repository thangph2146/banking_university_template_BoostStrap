// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 600, // Slightly faster for form elements
    once: true, 
});

// Password Toggle Visibility
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the icon
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }

    // Basic Login Form Simulation
    const loginForm = document.getElementById('loginForm');
    const loginFeedback = document.getElementById('login-feedback');
    if (loginForm && loginFeedback) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const submitButton = loginForm.querySelector('button[type="submit"]');

            // Simple validation example
            if (!email || !password) {
                loginFeedback.innerHTML = `<div class="alert alert-danger">Vui lòng nhập đầy đủ email/MSSV và mật khẩu.</div>`;
                return;
            }

            // Simulate login attempt
            loginFeedback.innerHTML = ''; // Clear previous feedback
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang đăng nhập...';

            setTimeout(() => {
                // Simulate a login failure for demonstration
                loginFeedback.innerHTML = `<div class="alert alert-danger">Email/MSSV hoặc mật khẩu không đúng.</div>`;
                submitButton.disabled = false;
                submitButton.innerHTML = 'Đăng nhập';

                // On successful login, you would typically redirect:
                // window.location.href = 'dashboard.html'; 

            }, 1500);
        });
    }
}); 