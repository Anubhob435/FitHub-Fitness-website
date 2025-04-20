// Loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        animateHeroElements();
    }, 1500);
});

// Animate hero elements with staggered timing
function animateHeroElements() {
    const heroElements = [
        document.querySelector('.hero-title'),
        document.querySelector('.hero-subtitle'),
        document.querySelector('.hero-actions'),
        document.querySelector('.stats-container')
    ];
    
    heroElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, 300 * index);
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

darkModeToggle.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    updateDarkModeIcon();
    updateDarkModeIconMobile();
    localStorage.setItem('theme', html.dataset.theme);
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (html.dataset.theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Update both dark mode toggles
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');

darkModeToggleMobile.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    updateDarkModeIcon();
    updateDarkModeIconMobile();
    localStorage.setItem('theme', html.dataset.theme);
});

function updateDarkModeIconMobile() {
    const icon = darkModeToggleMobile.querySelector('i');
    if (html.dataset.theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Update initial state for mobile toggle
updateDarkModeIconMobile();

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.dataset.theme = savedTheme;
updateDarkModeIcon();
updateDarkModeIconMobile();

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to various elements that should animate on scroll
document.querySelectorAll('.feature-card, .blog-card, .article, .section-header, .contact-info, #contactForm').forEach((el) => {
    observer.observe(el);
});

// Enhanced form submission with validation and feedback
function submitForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.getElementById('contactForm').querySelector('button');
    
    // Reset previous error states
    document.querySelectorAll('.error').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    // Validate
    let isValid = true;
    
    if (!name) {
        addError('name', 'Please enter your name');
        isValid = false;
    }
    
    if (!email) {
        addError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        addError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!subject) {
        addError('subject', 'Please select a topic');
        isValid = false;
    }
    
    if (!message) {
        addError('message', 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
            // Show success message
            const formContainer = document.getElementById('contactForm');
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, ${name}! We'll get back to you soon.`;
            formContainer.parentNode.insertBefore(successMsg, formContainer.nextSibling);
            
            setTimeout(() => {
                successMsg.classList.add('show');
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    setTimeout(() => {
                        successMsg.remove();
                    }, 300);
                }, 5000);
            }, 100);
        }, 1500);
    }
}

function addError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('input-error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Add active class to current section in navigation
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            document.querySelector('.scroll-to-top').classList.add('visible');
        } else {
            document.querySelector('.scroll-to-top').classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate counting for stat numbers
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        // Get the target number
        const target = parseInt(stat.innerText);
        // Set start at 0
        let count = 0;
        // Set duration for counting animation (in ms)
        const duration = 2000;
        // Calculate increment step based on target and duration
        const increment = target / (duration / 30);
        
        // Start counting
        const counter = setInterval(() => {
            count += increment;
            // Update the content
            if (count < target) {
                if (target > 1000) {
                    stat.innerText = Math.floor(count / 1000) + 'K+';
                } else {
                    stat.innerText = Math.floor(count) + '%';
                }
            } else {
                // Ensure we end with the exact target
                if (target > 1000) {
                    stat.innerText = Math.floor(target / 1000) + 'K+';
                } else {
                    stat.innerText = target + '%';
                }
                clearInterval(counter);
            }
        }, 30);
    });
}

// Run counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}
