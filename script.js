
// ===========================
// Keyboard Navigation for Sidebar
// ===========================

const sidebarLinks = document.querySelectorAll('#section-sidebar nav a');
let currentIndex = 0;

sidebarLinks[currentIndex].focus();

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();

    sidebarLinks[currentIndex].classList.remove('active');

    if (e.key === 'ArrowDown') {
      currentIndex = (currentIndex + 1) % sidebarLinks.length;
    } else if (e.key === 'ArrowUp') {
      currentIndex = (currentIndex - 1 + sidebarLinks.length) % sidebarLinks.length;
    }

    sidebarLinks[currentIndex].classList.add('active');

    sidebarLinks[currentIndex].focus();

    const targetId = sidebarLinks[currentIndex].getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// ===========================
// Sound Effects and Animations
// ===========================
// Create audio context for sound effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play notification sound
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

// Function to add click sound to buttons
function addClickSound(element) {
    element.addEventListener('click', function(e) {
        playNotificationSound();
    });
}

// Function to add hover animation
function addHoverAnimation(element) {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Apply sound and animations to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    addClickSound(button);
    addHoverAnimation(button);
});

// Special handler for Contact Us button
const contactBtn = document.getElementById('openPopupBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
        playNotificationSound();
    }, { capture: true });
}

// Apply hover animations to navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    addHoverAnimation(link);
});

// Apply animations to images
const images = document.querySelectorAll('img');
images.forEach(img => {
    addHoverAnimation(img);
});

// Add fade-in animation to main content
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

// Add accordion animation for about.html
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

// ===========================
// Day-Night Mode
// ===========================
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  };

  // Восстановить из localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  btn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();

