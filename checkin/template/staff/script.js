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
        document.getElementById('date').textContent = formattedDate;
        
        // Format time from timestamp
        const checkinTimeObj = new Date(data.checkinTime);
        const hours = checkinTimeObj.getHours().toString().padStart(2, '0');
        const minutes = checkinTimeObj.getMinutes().toString().padStart(2, '0');
        document.getElementById('time').textContent = `${hours}:${minutes}`;
        
        // Set avatar
        const avatarUrl = data.avatar.startsWith('http') ? data.avatar : 'images/' + data.avatar;
        document.getElementById('avatar').src = avatarUrl;
        
        // Set title if available
        if (data.title) {
            document.getElementById('title').textContent = data.title;
        }
        
        // Set other data
        document.getElementById('personName').textContent = data.personName;
        document.getElementById('place').textContent = data.place;
        document.getElementById('placeID').textContent = data.placeID;
        document.getElementById('text1').textContent = data.Text1;
        document.getElementById('text2').textContent = data.Text2;
        
        // Animate entrance
        animateElements();
    }
    
    // Function to add animation effects
    function animateElements() {
        const elements = [
            {selector: '.university-logo', animation: 'fade-in', delay: 0},
            {selector: '.card-header', animation: 'slide-up', delay: 200},
            {selector: '.avatar-section', animation: 'scale-in', delay: 400},
            {selector: '.info-section', animation: 'slide-up', delay: 600},
            {selector: '.welcome-banner', animation: 'fade-in', delay: 800},
            {selector: '.footer', animation: 'slide-up', delay: 1000}
        ];
        
        elements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.style.opacity = '0';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    element.style.opacity = '1';
                    if (item.animation === 'slide-up') {
                        element.style.transform = 'translateY(0)';
                    } else if (item.animation === 'scale-in') {
                        element.style.transform = 'scale(1)';
                    }
                }, item.delay);
            }
        });
    }
    
    // Function to initialize particles.js
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 60,
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
                        "value": 0.25,
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
                        "opacity": 0.2,
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
                                "opacity": 0.6
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
        "title": "CÁN BỘ",
        "personName": "Nguyen Van A",       
        "avatar": "ee306752-0e1c-11f0-9690-2ec61c1388c6.jpg",
        "date": "2025-03-31",
        "placeID": "Hội trường A",
        "place": "HUB - 56 Hoàng Diệu 2",
        "checkinTime": 1743417783000,
        "Text1": "Chào mừng cán bộ đến với sự kiện",
        "Text2": "Welcome to the event"
    };
    
    displayCheckInData(sampleData);
});