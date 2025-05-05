// Initialize AOS
AOS.init({
    duration: 600,
    once: true,
});

// Toggle password visibility 
document.addEventListener('DOMContentLoaded', function() {
    const passwordToggle = document.getElementById('toggleRegisterPassword');
    const passwordField = document.getElementById('registerPassword');
    const confirmPasswordToggle = document.getElementById('toggleConfirmPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');

    if (passwordToggle && passwordField) {
        passwordToggle.addEventListener('click', function() {
            togglePasswordVisibility(passwordField, this);
        });
    }
    
    if (confirmPasswordToggle && confirmPasswordField) {
        confirmPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(confirmPasswordField, this);
        });
    }
    
    function togglePasswordVisibility(inputField, toggleElement) {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        const icon = toggleElement.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    }

    // Registration Form Simulation
    const registerForm = document.getElementById('registerForm');
    const registerFeedback = document.getElementById('register-feedback');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');


    if (registerForm && registerFeedback && passwordInput && confirmPasswordInput && confirmPasswordFeedback) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            let isValid = true;
             registerFeedback.innerHTML = ''; // Clear previous feedback
             confirmPasswordInput.setCustomValidity(""); // Clear custom validity

            // Check if passwords match
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity("Mật khẩu không khớp.");
                 confirmPasswordFeedback.textContent = "Mật khẩu không khớp.";
                isValid = false;
            } else {
                confirmPasswordInput.setCustomValidity("");
                confirmPasswordFeedback.textContent = "Vui lòng nhập lại mật khẩu."; // Reset feedback text
            }
            
            // Trigger Bootstrap validation
            if (!registerForm.checkValidity() || !isValid) {
                registerForm.classList.add('was-validated');
                 if(!isValid && registerForm.checkValidity()) { // Only show general message if other fields are valid but passwords don't match
                    // Optionally show a general feedback message if only password mismatch
                 } else if (!registerForm.checkValidity()) {
                    // Optionally show a general message for other invalid fields
                     registerFeedback.innerHTML = `<div class="alert alert-danger alert-sm p-2">Vui lòng kiểm tra lại các thông tin đã nhập.</div>`;
                 }
                return;
            }
            
             registerForm.classList.remove('was-validated'); // Remove validation classes if all is good before simulation

            // Simulate registration process
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...';

            setTimeout(() => {
                // Simulate success
                registerFeedback.innerHTML = `<div class="alert alert-success">Đăng ký thành công! Chào mừng bạn đến với hệ thống sự kiện HUB. Bạn có thể đăng nhập ngay bây giờ.</div>`;
                registerForm.reset(); 
                submitButton.disabled = false;
                submitButton.innerHTML = 'Đăng ký';

                // Optional: Redirect to login after a delay
                // setTimeout(() => { window.location.href = 'login.html'; }, 3000);

            }, 1500); // Simulate 1.5 second delay
        });
        
        // Reset custom validity message when user types in confirm password
        confirmPasswordInput.addEventListener('input', () => {
             confirmPasswordInput.setCustomValidity("");
             registerForm.classList.remove('was-validated'); // Remove validation state on type
        });
         passwordInput.addEventListener('input', () => {
             registerForm.classList.remove('was-validated'); // Remove validation state on type
        });
    }
}); 