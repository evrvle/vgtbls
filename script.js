document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    document.documentElement.lang = 'en';
    
    // Initialize mode toggle and language selector
    initModeToggle();
    initLanguageSelector();
    
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
        }
        
        /* Night mode message */
        body.night-mode .message {
            background-color: #CC5039;
        }
    `;
    document.head.appendChild(style);
    
    // Create floating clouds for background ambiance (day mode)
    createClouds();
    
    // Create stars for night mode
    createStars();
    
    // Add mosquitos for night mode
    createMosquitos();
    
    // Initialize DJ Pepe
    initDJPepe();
    
    // Add subtle hover sound effect
    vegLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create a subtle pop sound
            const hoverSound = new Audio();
            hoverSound.volume = 0.2;
            
            // We're not actually loading a sound file to keep things simple
            // This is just a placeholder for where you would add sound if desired
            
            // Light shadow pulse effect on hover
            link.querySelector('.veg-image').style.boxShadow = '0 0 15px rgba(255,255,255,0.7)';
        });
        
        link.addEventListener('mouseleave', () => {
            // Reset shadow
            setTimeout(() => {
                if (document.body.classList.contains('night-mode')) {
                    link.querySelector('.veg-image').style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
                } else {
                    link.querySelector('.veg-image').style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
                }
            }, 300);
        });
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
        } else {
            document.body.classList.remove('night-mode');
            localStorage.setItem('preferred-mode', 'day');
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
    
    for (let i = 0; i < mosquitoCount; i++) {
        const mosquito = document.createElement('div');
        mosquito.className = 'mosquito';
        
        // Random position
        mosquito.style.top = Math.random() * 100 + 'vh';
        mosquito.style.left = Math.random() * 100 + 'vw';
        
        // Create wings
        const leftWing = document.createElement('div');
        leftWing.className = 'wing left';
        
        const rightWing = document.createElement('div');
        rightWing.className = 'wing right';
        
        mosquito.appendChild(leftWing);
        mosquito.appendChild(rightWing);
        
        // Add movement
        setInterval(() => {
            const newTop = parseFloat(mosquito.style.top) + (Math.random() * 10 - 5);
            const newLeft = parseFloat(mosquito.style.left) + (Math.random() * 10 - 5);
            
            mosquito.style.top = Math.max(0, Math.min(100, newTop)) + 'vh';
            mosquito.style.left = Math.max(0, Math.min(100, newLeft)) + 'vw';
        }, 1000);
        
        container.appendChild(mosquito);
    }
}

// Function to initialize DJ Pepe behavior
function initDJPepe() {
    const djPepe = document.querySelector('.dj-pepe');
    
    // Extra random movements for Pepe
    let timeoutId;
    
    function addRandomMovement() {
        // Stop any previous timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // Only proceed if in night mode
        if (!document.body.classList.contains('night-mode')) return;
        
        // Random jump to a new position
        if (Math.random() < 0.3) {  // 30% chance of random jump
            const randomTop = Math.random() * 80 + 10; // 10% to 90% of viewport height
            const randomLeft = Math.random() * 80 + 10; // 10% to 90% of viewport width
            const randomScale = Math.random() * 0.5 + 0.7; // 0.7 to 1.2 scale
            const randomRotation = Math.random() * 360; // 0 to 360 degrees
            
            // Apply the jump animation
            djPepe.style.transition = 'none'; // Disable transition for instant jump
            djPepe.style.animationPlayState = 'paused'; // Pause main animation temporarily
            
            // Move to random position
            djPepe.style.top = `${randomTop}%`;
            djPepe.style.left = `${randomLeft}%`;
            djPepe.style.transform = `scale(${randomScale}) rotate(${randomRotation}deg)`;
            
            // Resume animation after a short delay
            setTimeout(() => {
                djPepe.style.transition = 'all 0.5s ease'; // Re-enable transitions
                djPepe.style.animationPlayState = 'running'; // Resume animation
            }, 100);
        }
        
        // Add a brief shake effect occasionally
        if (Math.random() < 0.2) {  // 20% chance of shaking
            djPepe.style.animation = 'pepe-shake 0.5s ease';
            
            setTimeout(() => {
                djPepe.style.animation = 'pepe-float 60s infinite alternate ease-in-out';
            }, 500);
        }
        
        // Schedule next random movement
        const nextMovementDelay = Math.random() * 10000 + 5000; // 5-15 seconds
        timeoutId = setTimeout(addRandomMovement, nextMovementDelay);
    }
    
    // Click interaction with DJ Pepe
    djPepe.addEventListener('click', function() {
        // Add a reaction animation
        this.style.animation = 'pepe-excited 1s ease';
        
        // Play a sound or do something fun on click
        // (Placeholder for actual interaction)
        
        // Reset animation after effect completes
        setTimeout(() => {
            this.style.animation = 'pepe-float 60s infinite alternate ease-in-out';
        }, 1000);
    });
    
    // Start random movements when night mode is activated
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('night-mode')) {
                    addRandomMovement();
                    
                    // Add click interaction
                    djPepe.style.pointerEvents = 'auto';
                } else {
                    // Remove click interaction in day mode
                    djPepe.style.pointerEvents = 'none';
                    
                    // Clear any pending timeouts
                    if (timeoutId) clearTimeout(timeoutId);
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Start if already in night mode
    if (document.body.classList.contains('night-mode')) {
        addRandomMovement();
        djPepe.style.pointerEvents = 'auto';
    }
    
    // Add shake keyframe animation
    const styleSheet = document.styleSheets[document.styleSheets.length - 1];
    styleSheet.insertRule(`
        @keyframes pepe-shake {
            0%, 100% { transform: translateX(0) rotate(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-5deg); }
            20%, 40%, 60%, 80% { transform: translateX(10px) rotate(5deg); }
        }
    `, styleSheet.cssRules.length);
    
    // Add excited keyframe animation
    styleSheet.insertRule(`
        @keyframes pepe-excited {
            0% { transform: scale(1); }
            10% { transform: scale(1.3) rotate(10deg); }
            20% { transform: scale(0.8) rotate(-15deg); }
            30% { transform: scale(1.2) rotate(5deg); }
            40% { transform: scale(0.9) rotate(-5deg); }
            50% { transform: scale(1.1); }
            60% { transform: scale(1) rotate(15deg); }
            70% { transform: scale(1.2) rotate(-10deg); }
            80% { transform: scale(0.9) rotate(5deg); }
            90% { transform: scale(1.1) rotate(-5deg); }
            100% { transform: scale(1); }
        }
    `, styleSheet.cssRules.length);
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

// Owl tap counter functionality
let owlTapCount = 0;
const owl = document.querySelector('.owl');
const rickrollURL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const RICKROLL_THRESHOLD = 28;

// Create counter display element
const tapCounter = document.createElement('div');
tapCounter.className = 'tap-counter';
tapCounter.innerText = '0';
tapCounter.style.pointerEvents = 'none'; // Prevent interference with clicks
// Set initial position off-screen
tapCounter.style.left = '-9999px';
tapCounter.style.top = '-9999px';
document.body.appendChild(tapCounter); // Append to body instead of owl for global positioning

// Handle owl taps/clicks
owl.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default behavior
    
    // Increment counter
    owlTapCount++;
    
    // Generate random position for the counter
    const randomX = Math.floor(Math.random() * (window.innerWidth - 100));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 100));
    
    // Position the counter at random coordinates
    tapCounter.style.left = randomX + 'px';
    tapCounter.style.top = randomY + 'px';
    
    // Generate a random bright color for the counter
    const hue = Math.floor(Math.random() * 360); // Random hue (0-359)
    tapCounter.style.color = `hsl(${hue}, 100%, 70%)`; // Bright, saturated color
    tapCounter.style.textShadow = `0 0 5px hsl(${hue}, 100%, 40%), 0 0 10px rgba(255,255,255,0.5)`; // Matching shadow
    
    // Update counter text
    tapCounter.innerText = owlTapCount;
    
    // Remove previous animation if still active
    tapCounter.classList.remove('show');
    
    // Trigger reflow to restart animation
    void tapCounter.offsetWidth;
    
    // Add animation class
    tapCounter.classList.add('show');
    
    // Add a small "tap" animation to the owl
    this.style.transform = 'translateY(5px)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
    
    // Fade out counter
    setTimeout(() => {
        tapCounter.classList.remove('show');
    }, 1500);
    
    // Check for rickroll threshold
    if (owlTapCount >= RICKROLL_THRESHOLD) {
        // Show message in a random position
        const finalRandomX = Math.floor(Math.random() * (window.innerWidth - 300));
        const finalRandomY = Math.floor(Math.random() * (window.innerHeight - 100));
        
        tapCounter.style.left = finalRandomX + 'px';
        tapCounter.style.top = finalRandomY + 'px';
        // Special color for rickroll message
        tapCounter.style.color = '#FF6347'; // Tomato red
        tapCounter.style.textShadow = '0 0 5px #800000, 0 0 10px rgba(255,255,255,0.5)';
        tapCounter.innerText = "Never gonna give you up!";
        tapCounter.classList.add('show');
        
        // Add special animation to owl using our CSS class
        owl.classList.add('rickroll');
        owl.querySelector('.owl-image').style.filter = 'hue-rotate(180deg) brightness(1.3)';
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = rickrollURL;
        }, 1000);
    }
}); 