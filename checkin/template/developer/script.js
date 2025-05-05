document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng particles.js
    initParticles();
    
    // Hiển thị thời gian thực
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Function to display check-in data
    function displayCheckInData(data) {
        // Format date
        const dateObj = new Date(data.date);
        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`;
        
        // Set date in all locations
        const dateElements = document.querySelectorAll('#date, #dateBlock');
        dateElements.forEach(el => {
            el.textContent = formattedDate;
        });
        
        // Format time from timestamp
        const checkinTimeObj = new Date(data.checkinTime);
        const hours = checkinTimeObj.getHours().toString().padStart(2, '0');
        const minutes = checkinTimeObj.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        
        // Set time in all locations
        const timeElements = document.querySelectorAll('#time, #timeBlock');
        timeElements.forEach(el => {
            el.textContent = formattedTime;
        });
        
        // Set avatar
        const avatarUrl = data.avatar.startsWith('http') ? data.avatar : 'images/' + data.avatar;
        document.getElementById('avatar').src = avatarUrl;
        
        // Set title if available
        if (data.title) {
            const titleElements = document.querySelectorAll('#title, #titleBadge');
            titleElements.forEach(el => {
                el.textContent = data.title.toUpperCase();
            });
        }
        
        // Set person name in all locations
        const nameElements = document.querySelectorAll('#personName, #personNameDisplay');
        nameElements.forEach(el => {
            el.textContent = data.personName;
        });
        
        // Set place in all locations
        const placeElements = document.querySelectorAll('#place, #placeBlock');
        placeElements.forEach(el => {
            el.textContent = data.place;
        });
        
        document.getElementById('placeID').textContent = data.placeID;
        document.getElementById('text1').textContent = data.Text1;
        document.getElementById('text1Output').textContent = data.Text1;
        document.getElementById('text2').textContent = data.Text2;
        
        // Animate elements
        animateElements();
        
        // Simulate typing effect on code
        setTimeout(() => {
            simulateTyping();
        }, 1000);
    }
    
    // Function to add animation effects
    function animateElements() {
        const elements = [
            {selector: '.university-header', animation: 'fadeIn', delay: 0},
            {selector: '.ide-header', animation: 'fadeIn', delay: 200},
            {selector: '.code-section', animation: 'fadeIn', delay: 400},
            {selector: '.developer-profile', animation: 'slideUp', delay: 600},
            {selector: '.event-data', animation: 'fadeIn', delay: 800},
            {selector: '.event-footer', animation: 'fadeIn', delay: 1000}
        ];
        
        elements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.style.opacity = '0';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    element.style.opacity = '1';
                    if (item.animation === 'slideUp') {
                        element.style.transform = 'translateY(0)';
                    }
                }, item.delay);
            }
        });
    }
    
    // Function to simulate typing effect
    function simulateTyping() {
        const codeLines = document.querySelectorAll('.code-content .string');
        
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('typing');
                setTimeout(() => {
                    line.classList.remove('typing');
                }, 800);
            }, index * 300);
        });
    }
    
    // Function to initialize particles.js
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.2,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.15,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // Function to update current time
    function updateCurrentTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeString = now.toLocaleDateString('vi-VN', options);
        document.getElementById('current-time').textContent = timeString;
    }
    
    // Sample data - in a real app, this would come from an API
    const sampleData = {
        "title": "Developer",
        "personName": "Nguyen Van A",       
        "avatar": "ee306752-0e1c-11f0-9690-2ec61c1388c6.jpg",
        "date": "2025-03-31",
        "placeID": "Hội trường A",
        "place": "HUB - 56 Hoàng Diệu 2",
        "checkinTime": 1743417783000,
        "Text1": "Hello Developer! Welcome to the event",
        "Text2": "console.log('Happy coding!');"
    };
    
    displayCheckInData(sampleData);
});