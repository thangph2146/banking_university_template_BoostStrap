// Initialize AOS
AOS.init({
    duration: 600, 
    once: true, 
});

// Profile Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const pills = document.querySelectorAll('.profile-nav .nav-link[data-bs-toggle="pill"]');
    const contentSections = document.querySelectorAll('.profile-content-section');
    const defaultActivePill = document.querySelector('.profile-nav .nav-link.active');
    const defaultTargetId = defaultActivePill?.getAttribute('data-bs-target');

    // Function to show the target section and hide others
    function showTargetSection(targetId) {
        contentSections.forEach(section => {
            if ('#' + section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        AOS.refresh(); // Refresh AOS for newly shown content
    }

    // Function to activate a pill based on hash fragment
    function activatePillFromHash() {
        let hash = window.location.hash;
        if (hash) {
            // Support both #tab-name and #tab-name-content formats
            // Remove '-content' suffix if present in the URL but not in the tab IDs
            if (hash.endsWith('-content')) {
                hash = hash.replace('-content', '');
            }
            
            // Find the pill that matches the hash or targets the content with this hash
            const matchingPill = Array.from(pills).find(pill => {
                const href = pill.getAttribute('href');
                const target = pill.getAttribute('data-bs-target');
                return href === hash || target === hash + '-content' || target === hash;
            });

            if (matchingPill) {
                // Manually trigger the pill
                const bsTab = new bootstrap.Tab(matchingPill);
                bsTab.show();
                
                // Also manually update classes because sometimes the Bootstrap Tab doesn't trigger shown.bs.tab event
                pills.forEach(p => p.classList.remove('active'));
                matchingPill.classList.add('active');
                
                const targetId = matchingPill.getAttribute('data-bs-target');
                if (targetId) {
                    showTargetSection(targetId);
                }

                // Scroll to the section after a short delay to ensure DOM is updated
                setTimeout(() => {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 100; // Adjust based on your fixed header height
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        } else if (defaultTargetId) {
            // No hash, show default section
            showTargetSection(defaultTargetId);
        }
    }

    // Show initial section based on URL hash or default
    activatePillFromHash();

    // Listen for hash changes
    window.addEventListener('hashchange', activatePillFromHash);

    // Handle tab clicks
    pills.forEach(pill => {
        pill.addEventListener('shown.bs.tab', function (event) {
            const targetId = event.target.getAttribute("data-bs-target");
            if (targetId) {
                showTargetSection(targetId);
            }
        });
        
        // Update URL hash when tab is clicked (without page reload)
        pill.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                history.pushState(null, null, hash);
            }
        });
    });
});

// Function to toggle password visibility
function setupPasswordToggle(toggleId, inputId) {
    const toggleElement = document.getElementById(toggleId);
    const inputElement = document.getElementById(inputId);
    if (toggleElement && inputElement) {
        toggleElement.addEventListener('click', function () {
            const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
            inputElement.setAttribute('type', type);
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }
}

setupPasswordToggle('toggleCurrentPassword', 'currentPassword');
setupPasswordToggle('toggleNewPassword', 'newPassword');
setupPasswordToggle('toggleConfirmNewPassword', 'confirmNewPassword');

// Personal Info Edit Toggle
const editInfoBtn = document.getElementById('edit-personal-info-btn');
const cancelEditBtn = document.getElementById('cancel-edit-info-btn');
const infoDisplayDiv = document.querySelector('.info-display');
const infoEditForm = document.getElementById('personal-info-edit-form');
const editFeedbackSuccessDiv = document.getElementById('edit-feedback-success');
const editFeedbackErrorDiv = document.getElementById('edit-feedback-error');

// Input fields in edit form
const editNameInput = document.getElementById('editName');
const editEmailInput = document.getElementById('editEmail');
const editMssvInput = document.getElementById('editMssv');
const editKhoaInput = document.getElementById('editKhoa');
const editPhoneInput = document.getElementById('editPhone');

// Display fields
const displayName = document.getElementById('display-name');
const displayEmail = document.getElementById('display-email');
const displayMssv = document.getElementById('display-mssv');
const displayKhoa = document.getElementById('display-khoa');
const displayPhone = document.getElementById('display-phone');
const sidebarName = document.getElementById('sidebar-name');

if (editInfoBtn && cancelEditBtn && infoDisplayDiv && infoEditForm) {
    editInfoBtn.addEventListener('click', () => {
        // Populate form with current display values
        editNameInput.value = displayName.textContent;
        editEmailInput.value = displayEmail.textContent;
        editMssvInput.value = displayMssv.textContent;
        editKhoaInput.value = displayKhoa.textContent.includes('(Placeholder)') || displayKhoa.textContent.includes('không xác định') ? '' : displayKhoa.textContent; // Clear placeholder/default
        editPhoneInput.value = displayPhone.textContent.includes('Chưa cập nhật') ? '' : displayPhone.textContent;

        // Hide display, show form
        infoDisplayDiv.classList.add('d-none');
        infoEditForm.classList.remove('d-none');
        editInfoBtn.classList.add('d-none'); // Hide edit button
        editFeedbackSuccessDiv.classList.add('d-none'); // Hide feedback
        editFeedbackErrorDiv.classList.add('d-none');
    });

    cancelEditBtn.addEventListener('click', () => {
        // Hide form, show display
        infoEditForm.classList.add('d-none');
        infoDisplayDiv.classList.remove('d-none');
        editInfoBtn.classList.remove('d-none'); // Show edit button again
        editFeedbackSuccessDiv.classList.add('d-none'); // Hide feedback on cancel
        editFeedbackErrorDiv.classList.add('d-none');
    });

    infoEditForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual submission

        // Hide previous feedback first
        editFeedbackSuccessDiv.classList.add('d-none');
        editFeedbackErrorDiv.classList.add('d-none');
        editFeedbackSuccessDiv.textContent = '';
        editFeedbackErrorDiv.textContent = '';

        // Get new values 
        const newKhoa = editKhoaInput.value.trim();
        const newPhone = editPhoneInput.value.trim();
        
        // Simulate save attempt (e.g., 70% success chance)
        const isSuccess = Math.random() > 0.3; 

        if (isSuccess) {
            // Update display values
            displayKhoa.textContent = newKhoa || 'Khoa không xác định'; // Provide default if empty
            displayPhone.textContent = newPhone || 'Chưa cập nhật'; 
            if (!newPhone) {
                 displayPhone.classList.add('fst-italic', 'text-muted');
            } else {
                displayPhone.classList.remove('fst-italic', 'text-muted');
            }
            // displayName.textContent = newName; // If name could change
            // sidebarName.textContent = newName; 

            // Show SUCCESS feedback message
            editFeedbackSuccessDiv.textContent = 'Thông tin đã được cập nhật thành công.';
            editFeedbackSuccessDiv.classList.remove('d-none');

            // Hide form, show display again
            infoEditForm.classList.add('d-none');
            infoDisplayDiv.classList.remove('d-none');
            editInfoBtn.classList.remove('d-none');

            // Optional: Hide success feedback after a few seconds
            setTimeout(() => { 
                editFeedbackSuccessDiv.classList.add('d-none');
                editFeedbackSuccessDiv.textContent = '';
            }, 3000);
        } else {
             // Show ERROR feedback message
             editFeedbackErrorDiv.textContent = 'Lỗi! Không thể cập nhật thông tin. Vui lòng thử lại.';
             editFeedbackErrorDiv.classList.remove('d-none');
        }
    });
}

// Change Password Form Handling (Client-side validation only)
const changePasswordForm = document.getElementById('changePasswordForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
const feedbackSuccessDiv = document.getElementById('change-password-feedback-success');
const feedbackErrorDiv = document.getElementById('change-password-feedback-error');

if(changePasswordForm && newPasswordInput && confirmNewPasswordInput && feedbackSuccessDiv && feedbackErrorDiv) {
    changePasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Hide previous feedback
        feedbackSuccessDiv.classList.add('d-none');
        feedbackErrorDiv.classList.add('d-none');
        feedbackSuccessDiv.textContent = '';
        feedbackErrorDiv.textContent = '';
        
        // Reset custom validity & validation state
        confirmNewPasswordInput.setCustomValidity(''); 
        changePasswordForm.classList.remove('was-validated'); 

        let isValid = true;
        let errorMessage = 'Vui lòng kiểm tra lại các trường bắt buộc.'; // Default error

        // Check if new passwords match
         if (newPasswordInput.value !== confirmNewPasswordInput.value) {
            confirmNewPasswordInput.setCustomValidity("Mật khẩu mới không khớp.");
            errorMessage = "Mật khẩu xác nhận không khớp.";
            isValid = false;
        }
        
        // Trigger Bootstrap's native validation + custom check
         if (!changePasswordForm.checkValidity() || !isValid) {
             changePasswordForm.classList.add('was-validated');
             feedbackErrorDiv.textContent = errorMessage; 
             feedbackErrorDiv.classList.remove('d-none');
         } else {
            // --- Form is valid, ONLY show success message (no actual submit) ---
             feedbackSuccessDiv.textContent = 'Yêu cầu đổi mật khẩu đã được gửi (chỉ là demo).';
             feedbackSuccessDiv.classList.remove('d-none');
             changePasswordForm.reset(); 
             changePasswordForm.classList.remove('was-validated'); 
             
             // Optional: Hide success feedback after a few seconds
             setTimeout(() => { 
                 feedbackSuccessDiv.classList.add('d-none');
                 feedbackSuccessDiv.textContent = '';
             }, 5000);
         }
    });

    // Optional: Clear validation styles when user types
     [newPasswordInput, confirmNewPasswordInput, document.getElementById('currentPassword')].forEach(input => {
         input.addEventListener('input', () => {
             changePasswordForm.classList.remove('was-validated');
             confirmNewPasswordInput.setCustomValidity(''); 
             feedbackErrorDiv.classList.add('d-none'); 
             feedbackSuccessDiv.classList.add('d-none');
         });
     });
}

// Logout Link (Placeholder Action)
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Bạn sẽ được chuyển hướng đến trang đăng nhập (chức năng thực tế sẽ đăng xuất).');
         window.location.href = 'login.html'; // Simulate redirect
    });
} 