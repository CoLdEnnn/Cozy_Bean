document.addEventListener('DOMContentLoaded', function() {
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playNotificationSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    function addClickSound(element) {
        element.addEventListener('click', function(e) {
            playNotificationSound();
        });
    }
    
    function addHoverAnimation(element) {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    function addBounceAnimation(element) {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
        });
    }
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        addClickSound(button);
        addHoverAnimation(button);
        addBounceAnimation(button);
    });
    
    const contactBtn = document.getElementById('openPopupBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            playNotificationSound();
        }, { capture: true });
    }
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        addHoverAnimation(link);
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        addHoverAnimation(img);
    });
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.transform = 'scaleY(0)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.transform = 'scaleY(1)';
            }
            content.style.transition = 'max-height 0.3s ease, transform 0.3s ease';
            playNotificationSound();
        });
    });
});