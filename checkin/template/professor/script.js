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
        
        // Add animation
        animateElements();
        
        // Add interactions
        addInteractions();
    }
    
    // Animation function
    function animateElements() {
        const elements = [
            {selector: '.university-header', animation: 'fade-in', delay: 0},
            {selector: '.professor-ribbon', animation: 'slide-down', delay: 200},
            {selector: '.avatar-container', animation: 'scale-in', delay: 400},
            {selector: '.professor-info', animation: 'slide-up', delay: 600},
            {selector: '.welcome-section', animation: 'fade-in', delay: 800},
            {selector: '.event-data', animation: 'slide-up', delay: 1000},
            {selector: '.event-footer', animation: 'fade-in', delay: 1200}
        ];
        
        elements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = item.animation === 'slide-up' ? 'translateY(20px)' : 
                                        item.animation === 'slide-down' ? 'translateY(-20px)' : 
                                        item.animation === 'scale-in' ? 'scale(0.8)' : 'translateY(0)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, item.delay);
            }
        });
    }
    
    // Function to add interactive effects
    function addInteractions() {
        // Add hover effect to profile section
        const professorAvatar = document.querySelector('.professor-avatar');
        if (professorAvatar) {
            professorAvatar.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                this.style.transition = 'all 0.3s ease';
            });
            
            professorAvatar.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
        }
        
        // Add effect to welcome message
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 2px 4px rgba(139, 0, 0, 0.3)';
                this.style.transition = 'all 0.3s ease';
            });
            
            welcomeMessage.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
            });
        }
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
                        "value": "#8B0000"
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
                        "color": "#B30000",
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
        "title": "PGS.TS",
        "personName": "Nguyen Van A",       
        "avatar": "ee306752-0e1c-11f0-9690-2ec61c1388c6.jpg",
        "date": "2025-03-31",
        "placeID": "Hoi truong A",
        "place": "HUB - 56 Hoàng Diệu 2",
        "checkinTime": 1743417783000,
        "Text1": "Kính chào Phó Giáo sư đến với sự kiện",
        "Text2": "We welcome you to our event"
    };
    
    displayCheckInData(sampleData);
});