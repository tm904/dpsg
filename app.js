// Detective-themed interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize detective theme
    initializeDetectiveTheme();
    
    // Track link clicks
    trackLinkClicks();
    
    // Add subtle animations
    addDetectiveAnimations();
    
    // Easter egg functionality
    addDetectiveEasterEgg();
});

function initializeDetectiveTheme() {
    // Add a subtle typewriter effect to the mission brief
    const briefText = document.querySelector('.brief-text');
    if (briefText) {
        const originalText = briefText.textContent;
        briefText.textContent = '';
        briefText.style.borderRight = '2px solid #704d37';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                briefText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    briefText.style.borderRight = 'none';
                }, 500);
            }
        };
        
        // Start typing effect after a brief delay
        setTimeout(typeWriter, 1000);
    }
}

function trackLinkClicks() {
    const detectionCards = document.querySelectorAll('.detective-card');
    
    detectionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const linkType = this.getAttribute('data-link');
            const linkTitle = this.querySelector('.card-title').textContent;
            
            // Log the click (in a real app, this would send to analytics)
            console.log(`Detective mission selected: ${linkTitle} (${linkType})`);
            
            // Add a brief visual feedback
            this.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover sound effect simulation (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 24px rgba(56, 54, 54, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

function addDetectiveAnimations() {
    // Animate elements on scroll (for mobile)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe detective cards for staggered animation
    const cards = document.querySelectorAll('.detective-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add floating animation to the badge
    const badge = document.querySelector('.badge-placeholder');
    if (badge) {
        badge.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
}

function addDetectiveEasterEgg() {
    let clickCount = 0;
    const badge = document.querySelector('.badge-placeholder');
    
    if (badge) {
        badge.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                console.log('🔍 Ein Detektiv ist immer aufmerksam...');
            } else if (clickCount === 3) {
                console.log('🕵️ Du hast ein gutes Auge für Details!');
                this.style.transform = 'rotate(360deg)';
                this.style.transition = 'transform 1s ease';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 1000);
            } else if (clickCount === 5) {
                console.log('🎖️ Herzlichen Glückwunsch! Du hast das Detektiv-Abzeichen freigeschaltet!');
                this.style.filter = 'drop-shadow(0 0 20px #dfc776)';
                
                // Show a brief message
                showDetectiveMessage('Geheimes Detektiv-Abzeichen freigeschaltet!');
                
                // Reset click count
                clickCount = 0;
            }
        });
    }
}

function showDetectiveMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(223, 199, 118, 0.95);
        color: #383636;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    // Add slide animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(slideStyle);
    
    document.body.appendChild(messageEl);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
    
    // Add slide up animation
    slideStyle.textContent += `
        @keyframes slideUp {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
}

// Handle touch events for better mobile experience
function handleTouchEvents() {
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        // Prevent bounce effect on iOS
        if (e.touches[0].clientY > touchStartY) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Initialize touch handling
handleTouchEvents();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in effect for the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Lazy load non-critical animations
function initializeLazyAnimations() {
    if ('IntersectionObserver' in window) {
        // Already handled in addDetectiveAnimations
        return;
    }
    
    // Fallback for older browsers
    const cards = document.querySelectorAll('.detective-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// Initialize lazy animations
initializeLazyAnimations();