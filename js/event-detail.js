// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
});

// Event Registration Simulation
document.addEventListener('DOMContentLoaded', () => {
    const registrationSection = document.getElementById('event-registration-section');
    if (!registrationSection) return;

    const registerButton = document.getElementById('register-button');
    const msgUpcoming = document.getElementById('registration-message-upcoming');
    const msgClosed = document.getElementById('registration-message-closed');
    const msgRegistered = document.getElementById('registration-message-registered');
    const msgNotAllowed = document.getElementById('registration-message-not-allowed');
    const msgSuccess = document.getElementById('registration-message-success');
    const msgFailure = document.getElementById('registration-message-failure');
    const registrationNote = document.getElementById('registration-note');

    // Hide button initially, will be shown if state is 'open'
    if(registerButton) registerButton.classList.add('d-none');
    if(registrationNote) registrationNote.classList.add('d-none');

    // Possible states
    const states = ['upcoming', 'open', 'closed', 'registered', 'not_allowed'];
    // Select a random state for demonstration
    const currentState = states[Math.floor(Math.random() * states.length)];

    // Show elements based on the current state
    switch (currentState) {
        case 'upcoming':
            if(msgUpcoming) msgUpcoming.classList.remove('d-none');
            break;
        case 'open':
            if(registerButton) registerButton.classList.remove('d-none');
            if(registrationNote) registrationNote.classList.remove('d-none');
            break;
        case 'closed':
            if(msgClosed) msgClosed.classList.remove('d-none');
            break;
        case 'registered':
            if(msgRegistered) msgRegistered.classList.remove('d-none');
            break;
        case 'not_allowed':
            if(msgNotAllowed) msgNotAllowed.classList.remove('d-none');
            break;
    }

    // Add click listener if the button is visible (state is 'open')
    if (currentState === 'open' && registerButton) {
        registerButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Simulate loading state (optional: disable button)
            registerButton.disabled = true;
            registerButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...';

            // Simulate network request
            setTimeout(() => {
                // Randomly determine success or failure
                const isSuccess = Math.random() > 0.3; // 70% chance of success

                // Hide button and note
                registerButton.classList.add('d-none');
                if(registrationNote) registrationNote.classList.add('d-none');

                // Show success or failure message
                if (isSuccess) {
                    if(msgSuccess) msgSuccess.classList.remove('d-none');
                } else {
                    if(msgFailure) msgFailure.classList.remove('d-none');
                }
            }, 1500); // Simulate 1.5 second delay
        });
    }
}); 