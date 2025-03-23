// Register Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

// Debounce function to limit expensive operations
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Music Metadata Management - Enhance SEO for audio content
function initMusicMetadata() {
    console.log('Initializing music metadata');
    
    // Create structured data for music content if not already present
    if (!document.querySelector('script[type="application/ld+json"]#music-data')) {
        // Sample music data - replace with your actual music information
        const musicData = {
            "@context": "https://schema.org",
            "@type": "MusicPlaylist",
            "name": "VGTBLS DJ Mix Collection",
            "numTracks": 12,
            "track": [
                {
                    "@type": "MusicRecording",
                    "name": "Midnight Garden Mix",
                    "byArtist": "VGTBLS DJ Collective",
                    "duration": "PT1H12M",
                    "genre": "Electronic",
                    "isrcCode": "USRC17607839",
                    "datePublished": "2023-12-01"
                },
                {
                    "@type": "MusicRecording",
                    "name": "Techno Vegetable Session",
                    "byArtist": "VGTBLS DJ Collective",
                    "duration": "PT58M",
                    "genre": "Techno",
                    "isrcCode": "USRC17608123",
                    "datePublished": "2023-12-15"
                },
                {
                    "@type": "MusicRecording",
                    "name": "Deep House Harvest",
                    "byArtist": "VGTBLS DJ Collective",
                    "duration": "PT1H25M",
                    "genre": "House",
                    "isrcCode": "USRC17609345",
                    "datePublished": "2023-12-22"
                }
            ]
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'music-data';
        script.textContent = JSON.stringify(musicData);
        document.head.appendChild(script);
    }
    
    // Add music-specific meta tags dynamically
    const metaTags = [
        { name: 'music:creator', content: 'VGTBLS DJ Collective' },
        { name: 'music:album', content: 'VGTBLS Podcast Mixes Vol. 1' },
        { name: 'music:musician', content: 'VGTBLS DJ Collective' }
    ];
    
    metaTags.forEach(tag => {
        if (!document.querySelector(`meta[name="${tag.name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = tag.name;
            meta.content = tag.content;
            document.head.appendChild(meta);
        }
    });
    
    // Create HTML Audio tag in night mode for background ambient sounds
    if (document.body.classList.contains('night-mode') && !document.getElementById('ambient-sound')) {
        const ambientAudio = document.createElement('audio');
        ambientAudio.id = 'ambient-sound';
        ambientAudio.loop = true;
        ambientAudio.volume = 0.1;
        ambientAudio.preload = 'auto';
        
        const source = document.createElement('source');
        source.src = 'audio/ambient-loop.mp3';
        source.type = 'audio/mpeg';
        
        ambientAudio.appendChild(source);
        document.body.appendChild(ambientAudio);
        
        // Only play if user has interacted with the page (to comply with autoplay policies)
        document.addEventListener('click', function audioPlayHandler() {
            ambientAudio.play().catch(e => console.log('Ambient audio play error:', e));
            document.removeEventListener('click', audioPlayHandler);
        }, { once: true });
    }
}

// Enhance audio preloading to improve performance for music-related sounds
function enhanceAudioPreloading() {
    // Create audio context for better performance when available
    let audioContext;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        
        // Resume audioContext on user interaction (needed for newer browser policies)
        document.addEventListener('click', function resumeAudio() {
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('AudioContext resumed successfully');
                });
            }
            document.removeEventListener('click', resumeAudio);
        }, { once: true });
        
    } catch (e) {
        console.log('Web Audio API not supported:', e);
    }
}

// Create and animate dancing Pepe
function createDancingPepe() {
    console.log('Creating dancing Pepe');
    
    // Create Pepe element if it doesn't exist
    if (!document.querySelector('.dancing-pepe')) {
        // Create a link element instead of a div
        const pepeLink = document.createElement('a');
        pepeLink.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        pepeLink.target = '_blank'; // Open in new tab
        pepeLink.rel = 'noopener'; // Security best practice
        pepeLink.className = 'pepe-link'; // Add class for styling
        
        // Create the pepe div inside the link
        const pepe = document.createElement('div');
        pepe.className = 'dancing-pepe active'; // Add active class immediately
        pepeLink.appendChild(pepe);
        document.body.appendChild(pepeLink);
        
        // Randomize starting position - start off-screen to ease in
        const randomizePosition = (offScreen = false) => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            if (offScreen) {
                // Start just off the right edge of the screen
                pepeLink.style.left = `${windowWidth + 20}px`;
                pepeLink.style.top = `${windowHeight * 0.3 + (Math.random() * windowHeight * 0.4)}px`;
            } else {
                // Keep Pepe in a more contained area (middle 70% of screen) to avoid edge bouncing
                const marginX = windowWidth * 0.15;
                const marginY = windowHeight * 0.15;
                pepeLink.style.left = `${marginX + Math.random() * (windowWidth - marginX * 2)}px`;
                pepeLink.style.top = `${marginY + Math.random() * (windowHeight - marginY * 2)}px`;
            }
        };
        
        // Initially start off-screen
        randomizePosition(true);
        
        // Add smoother movement physics
        let isTeasing = false;
        let isTouchingEdge = false;
        let targetX = null;
        let targetY = null;
        let currentX = parseInt(pepeLink.style.left);
        let currentY = parseInt(pepeLink.style.top);
        let velocityX = 1;
        let velocityY = 0;
        
        // No delay for making Pepe active - already active when created
        
        // Handle mouse interaction
        pepe.addEventListener('mouseenter', () => {
            if (!isTeasing) {
                isTeasing = true;
                pepe.classList.add('teasing');
                
                // After teasing animation completes, move to a new location smoothly
                setTimeout(() => {
                    randomizePosition();
                    pepe.classList.remove('teasing');
                    isTeasing = false;
                    // Set new target rather than teleporting
                    targetX = parseInt(pepeLink.style.left);
                    targetY = parseInt(pepeLink.style.top);
                }, 3000);
            }
        });
        
        // Occasionally make Pepe appear and disappear, but less frequently
        setInterval(() => {
            if (Math.random() > 0.85) { // Reduced frequency (was 0.7)
                // Fade out/in smoothly rather than abrupt changes
                pepe.style.transition = 'opacity 0.8s ease-in-out';
                pepe.style.opacity = pepe.style.opacity === '0' ? '0.9' : '0';
                
                setTimeout(() => {
                    if (pepe.style.opacity === '0') {
                        // If we faded out, change position before fading back in
                        pepe.style.transition = 'none';
                        randomizePosition();
                        // Slightly adjust size occasionally
                        if (Math.random() > 0.5) {
                            const size = 70 + Math.random() * 20; // Less dramatic size changes (was 60-100)
                            pepe.style.width = `${size}px`;
                            pepe.style.height = `${size}px`;
                        }
                        setTimeout(() => {
                            pepe.style.transition = 'opacity 0.8s ease-in-out';
                            pepe.style.opacity = '0.9';
                        }, 50);
                    }
                    // Reset transition after fade completes
                    setTimeout(() => {
                        pepe.style.transition = 'none';
                    }, 850);
                }, 800);
            }
        }, 10000); // Less frequent checks (was 5000)
        
        // Advanced smoother movement (override CSS animation)
        pepe.style.animation = 'none';
        
        // Pick a new random target every few seconds
        setInterval(() => {
            if (!isTeasing && Math.random() > 0.3) {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const rect = pepeLink.getBoundingClientRect();
                
                // Keep Pepe in a more contained area
                const marginX = windowWidth * 0.15;
                const marginY = windowHeight * 0.15;
                
                // Set a new target point to move towards
                targetX = marginX + Math.random() * (windowWidth - marginX * 2);
                targetY = marginY + Math.random() * (windowHeight - marginY * 2);
            }
        }, 5000);
        
        const movePepe = () => {
            if (isTeasing) {
                requestAnimationFrame(movePepe);
                return;
            }
            
            const rect = pepeLink.getBoundingClientRect();
            currentX = rect.left;
            currentY = rect.top;
            
            // If we don't have a target yet, set one
            if (targetX === null || targetY === null) {
                targetX = currentX;
                targetY = currentY;
            }
            
            // Calculate direction to target
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If we're close to target, slow down
            const maxSpeed = distance > 100 ? 3 : Math.max(0.5, distance / 30);
            
            // Smoothly adjust velocity towards target
            velocityX = velocityX * 0.95 + (dx / distance) * 0.05 * maxSpeed;
            velocityY = velocityY * 0.95 + (dy / distance) * 0.05 * maxSpeed;
            
            // Limit max speed
            const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            if (currentSpeed > maxSpeed) {
                velocityX = (velocityX / currentSpeed) * maxSpeed;
                velocityY = (velocityY / currentSpeed) * maxSpeed;
            }
            
            // Smooth bounce off edges with less aggressive behavior
            if (currentX <= 0 || currentX >= window.innerWidth - rect.width) {
                velocityX *= -0.8; // Gentler bounce (was -1.2)
                
                // Push away from the edge
                if (currentX <= 0) currentX = 1;
                if (currentX >= window.innerWidth - rect.width) currentX = window.innerWidth - rect.width - 1;
                
                isTouchingEdge = true;
                setTimeout(() => { isTouchingEdge = false; }, 500);
            }
            
            if (currentY <= 0 || currentY >= window.innerHeight - rect.height) {
                velocityY *= -0.8; // Gentler bounce (was -1.2)
                
                // Push away from the edge
                if (currentY <= 0) currentY = 1;
                if (currentY >= window.innerHeight - rect.height) currentY = window.innerHeight - rect.height - 1;
                
                isTouchingEdge = true;
                setTimeout(() => { isTouchingEdge = false; }, 500);
            }
            
            // Add very subtle gravity-like effect
            velocityY += 0.03; // Reduced (was 0.1)
            
            // Add friction to prevent excessive speed
            velocityX *= 0.99;
            velocityY *= 0.99;
            
            // Edge-touching behavior: pick a new target rather than teleporting
            if (isTouchingEdge && Math.random() > 0.9) { // Less frequent (was 0.7)
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                
                // Keep away from edges
                const marginX = windowWidth * 0.2;
                const marginY = windowHeight * 0.2;
                
                targetX = marginX + Math.random() * (windowWidth - marginX * 2);
                targetY = marginY + Math.random() * (windowHeight - marginY * 2);
            } else {
                // Apply movement
                currentX += velocityX;
                currentY += velocityY;
                
                pepeLink.style.left = `${currentX}px`;
                pepeLink.style.top = `${currentY}px`;
            }
            
            // Add subtle rotation based on direction - smoother and less dramatic
            const rotation = Math.atan2(velocityY, velocityX) * (180 / Math.PI) * 0.3; // Reduced rotation factor (added *0.3)
            pepe.style.transform = `rotate(${rotation}deg)`;
            
            requestAnimationFrame(movePepe);
        };
        
        movePepe();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize functionality
    initModeToggle();
    initLanguageSelector();
    initMusicMetadata();
    enhanceAudioPreloading();
    
    // Create mode-specific elements
    if (document.body.classList.contains('night-mode')) {
        createStars();
        createMosquitos();
    } else {
        createClouds(); // Create clouds only in day mode
    }
    
    // Add dancing Pepe
    createDancingPepe();
    
    // Set default language
    document.documentElement.lang = 'en';
    
    // Get all vegetable links
    const vegLinks = document.querySelectorAll('.veg-link');
    
    // Add random slight rotation to vegetables to make them look hand-placed
    vegLinks.forEach(link => {
        const randomRotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
        link.style.transform = `rotate(${randomRotation}deg)`;
        
        // Add bounce effect on click
        link.addEventListener('click', function(e) {
            // Only for placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                this.classList.add('bounce');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 1000);
                
                // Show "Coming Soon" message
                const message = document.createElement('div');
                message.classList.add('message');
                
                // Set message text based on current language
                const lang = document.documentElement.lang;
                if (lang === 'es') {
                    message.textContent = '¡Próximamente!';
                } else if (lang === 'ru') {
                    message.textContent = 'Скоро будет!';
                    message.style.fontFamily = "'Neucha', cursive"; // Apply Russian font to popup
                } else {
                    message.textContent = 'Coming Soon!';
                }
                
                document.body.appendChild(message);
                
                // Position the message near the clicked vegetable
                const rect = this.getBoundingClientRect();
                message.style.top = `${rect.top - 30}px`;
                message.style.left = `${rect.left + rect.width / 2}px`;
                
                // Remove the message after a delay
                setTimeout(() => {
                    message.classList.add('fade-out');
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 500);
                }, 1500);
            }
        });
    });
    
    // Add CSS for dynamic elements
    const style = document.createElement('style');
    style.textContent = `
        .bounce {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .message {
            position: fixed;
            background-color: #FF6347;
            color: white;
            padding: 8px 15px;
            font-size: 1rem;
            transform: translate(-50%, -50%);
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            pointer-events: none;
            animation: pop-in 0.3s ease;
        }
        
        @keyframes pop-in {
            0% { transform: translate(-50%, -50%) scale(0); }
            80% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .fade-out {
            animation: fade-out 0.5s ease forwards;
        }
        
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* Cloud animation */
        .cloud {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            animation: float-cloud linear infinite;
            will-change: transform;
        }
        
        /* Night mode message */
        body.night-mode .message {
            background-color: #CC5039;
        }
    `;
    document.head.appendChild(style);
    
    // Optimize hover effects using event delegation
    document.querySelector('.basket').addEventListener('mouseover', function(e) {
        const vegLink = e.target.closest('.veg-link');
        if (vegLink) {
            const vegImage = vegLink.querySelector('.veg-image');
            if (vegImage) {
                vegImage.style.boxShadow = '0 0 15px rgba(255,255,255,0.7)';
            }
        }
    });
    
    document.querySelector('.basket').addEventListener('mouseout', function(e) {
        const vegLink = e.target.closest('.veg-link');
        if (vegLink) {
            const vegImage = vegLink.querySelector('.veg-image');
            if (vegImage) {
                setTimeout(() => {
                    if (document.body.classList.contains('night-mode')) {
                        vegImage.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
                    } else {
                        vegImage.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
                    }
                }, 300);
            }
        }
    });
});

// Function to initialize mode toggle
function initModeToggle() {
    const modeToggle = document.getElementById('mode-toggle');
    
    // Check if user has a preference saved
    const savedMode = localStorage.getItem('preferred-mode');
    if (savedMode === 'night') {
        document.body.classList.add('night-mode');
        modeToggle.checked = true;
    }
    
    modeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('night-mode');
            localStorage.setItem('preferred-mode', 'night');
            createStars();
            createMosquitos();
        } else {
            document.body.classList.remove('night-mode');
            localStorage.setItem('preferred-mode', 'day');
            removeNightElements('.star');
            removeNightElements('.mosquito');
        }
    });
}

// Function to initialize language selector
function initLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Check if user has a preference saved
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        document.documentElement.lang = savedLang;
        
        // Update active button
        langButtons.forEach(btn => {
            if (btn.dataset.lang === savedLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const language = this.dataset.lang;
            
            // Set the language attribute
            document.documentElement.lang = language;
            
            // Save preference
            localStorage.setItem('preferred-language', language);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Function to create floating clouds
function createClouds() {
    const container = document.querySelector('.container');
    
    // Create 5 clouds
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        
        // Random cloud size
        const size = Math.random() * 60 + 40; // 40-100px
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.6}px`;
        
        // Random position
        cloud.style.top = `${Math.random() * 30 + 5}%`;
        cloud.style.left = `${Math.random() * 100}%`;
        
        // Random speed (longer duration = slower)
        const duration = Math.random() * 60 + 60; // 60-120s
        cloud.style.animationDuration = `${duration}s`;
        
        // Add cloud parts for fluffiness
        for (let j = 0; j < 4; j++) {
            const fluff = document.createElement('div');
            fluff.style.position = 'absolute';
            fluff.style.background = 'white';
            fluff.style.borderRadius = '50%';
            
            const fluffSize = size * (0.5 + Math.random() * 0.5);
            fluff.style.width = `${fluffSize}px`;
            fluff.style.height = `${fluffSize}px`;
            
            fluff.style.top = `${Math.random() * 20}%`;
            fluff.style.left = `${Math.random() * 80}%`;
            fluff.style.opacity = '0.8';
            
            cloud.appendChild(fluff);
        }
        
        document.body.appendChild(cloud);
    }
    
    // Add the keyframes rule for cloud animation
    const styleSheet = document.styleSheets[document.styleSheets.length - 1];
    styleSheet.insertRule(`
        @keyframes float-cloud {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-150%); }
        }
    `, styleSheet.cssRules.length);
}

// Function to create stars for night mode
function createStars() {
    const container = document.body;
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random twinkle speed
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        
        container.appendChild(star);
    }
}

// Function to create mosquitos for night mode
function createMosquitos() {
    const container = document.body;
    const mosquitoCount = 10;
    const mosquitos = [];
    
    for (let i = 0; i < mosquitoCount; i++) {
        const mosquito = document.createElement('div');
        mosquito.className = 'mosquito';
        
        // Random position
        const posY = Math.random() * 100;
        const posX = Math.random() * 100;
        mosquito.style.top = posY + 'vh';
        mosquito.style.left = posX + 'vw';
        
        // For improved animation performance
        mosquito.style.willChange = 'transform';
        
        // Create wings
        const leftWing = document.createElement('div');
        leftWing.className = 'wing left';
        
        const rightWing = document.createElement('div');
        rightWing.className = 'wing right';
        
        mosquito.appendChild(leftWing);
        mosquito.appendChild(rightWing);
        
        // Store mosquito state for RAF animation
        mosquitos.push({
            element: mosquito,
            x: posX,
            y: posY,
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1
        });
        
        container.appendChild(mosquito);
    }
    
    // Animate all mosquitos in a single requestAnimationFrame loop
    function animateMosquitos() {
        if (!document.body.classList.contains('night-mode')) {
            return; // Stop animation if not in night mode
        }
        
        mosquitos.forEach(mosquito => {
            // Update position
            mosquito.x += mosquito.speedX;
            mosquito.y += mosquito.speedY;
            
            // Boundary check
            if (mosquito.x < 0 || mosquito.x > 100) mosquito.speedX *= -1;
            if (mosquito.y < 0 || mosquito.y > 100) mosquito.speedY *= -1;
            
            // Apply position
            mosquito.element.style.left = mosquito.x + 'vw';
            mosquito.element.style.top = mosquito.y + 'vh';
            
            // Occasionally change direction
            if (Math.random() < 0.01) {
                mosquito.speedX = Math.random() * 0.2 - 0.1;
                mosquito.speedY = Math.random() * 0.2 - 0.1;
            }
        });
        
        requestAnimationFrame(animateMosquitos);
    }
    
    // Start the animation loop
    requestAnimationFrame(animateMosquitos);
}

// Store user preferences
let userPreferences = {
    language: localStorage.getItem('language') || 'en',
    mode: localStorage.getItem('mode') || 'day'
};

// Set initial language and mode
document.documentElement.lang = userPreferences.language;
document.body.className = userPreferences.mode + '-mode';

// DOM elements
const modeToggle = document.getElementById('mode-toggle');
const langButtons = document.querySelectorAll('.lang-btn');

// Set toggle state based on mode
if (userPreferences.mode === 'night') {
    modeToggle.checked = true;
    createStars();
    createMosquitos();
}

// Toggle mode
modeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.className = 'night-mode';
        userPreferences.mode = 'night';
        createStars();
        createMosquitos();
    } else {
        document.body.className = 'day-mode';
        userPreferences.mode = 'day';
        removeNightElements('.star');
        removeNightElements('.mosquito');
    }
    localStorage.setItem('mode', userPreferences.mode);
});

// Change language
langButtons.forEach(button => {
    if (button.dataset.lang === userPreferences.language) {
        button.classList.add('active');
    }
    
    button.addEventListener('click', function() {
        userPreferences.language = this.dataset.lang;
        document.documentElement.lang = userPreferences.language;
        
        // Update active button
        langButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Save preference
        localStorage.setItem('language', userPreferences.language);
    });
});

// Remove night elements
function removeNightElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => element.remove());
} 