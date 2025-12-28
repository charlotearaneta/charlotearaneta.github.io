// script.js - All JavaScript for the portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FADE-IN ANIMATIONS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // ===== CARD HOVER EFFECTS =====
    document.querySelectorAll('.card-shadow').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ===== NAVIGATION ACTIVE STATE =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-accent-caramel', 'font-semibold');
            if(link.getAttribute('href').substring(1) === current) {
                link.classList.add('text-accent-caramel', 'font-semibold');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize on load

    // ===== EMAIL BUTTON ENHANCEMENT =====
    const emailButton = document.querySelector('a[href^="mailto:"]');
    if(emailButton) {
        emailButton.addEventListener('click', function() {
            // Optional: Add tracking or analytics here
            console.log('Email button clicked');
        });
    }

    // ===== LINKEDIN BUTTON ENHANCEMENT =====
    const linkedinButton = document.querySelector('a[href*="linkedin.com"]');
    if(linkedinButton) {
        linkedinButton.addEventListener('click', function() {
            // Optional: Add tracking or analytics here
            console.log('LinkedIn button clicked');
        });
    }

    // ===== ADD COPYRIGHT YEAR =====
    const copyrightElement = document.querySelector('footer p:last-child');
    if(copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }

    // ===== CONSOLE GREETING =====
    console.log('%c👋 Hello! Thanks for checking out my portfolio.', 
        'color: #b45309; font-size: 14px; font-weight: bold;');
    console.log('%cBuilt with Tailwind CSS and vanilla JavaScript.', 
        'color: #666; font-size: 12px;');
});

// ===== HELPER FUNCTIONS =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    // Add loaded class for any post-load animations
    document.body.classList.add('loaded');
    
    // Remove any preloader if it exists
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});
