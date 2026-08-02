// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animate skill categories
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.classList.add('slide-up');
        observer.observe(skill);
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('slide-up');
        observer.observe(card);
    });

    // Animate insight and architecture cards on content pages
    document.querySelectorAll('.insight-card, .architecture-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Mobile navigation: hamburger toggle
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');

if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close the menu when a leaf link is tapped
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const parentLi = link.parentElement;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            const hasSubmenu = parentLi.classList.contains('dropdown');

            if (isMobile && hasSubmenu) {
                // First tap opens the submenu instead of navigating
                if (!parentLi.classList.contains('open')) {
                    e.preventDefault();
                    parentLi.classList.add('open');
                    return;
                }
            }

            if (isMobile && !hasSubmenu) {
                nav.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Reset menu state when resizing to desktop
    window.addEventListener('resize', () => {
        if (!window.matchMedia('(max-width: 768px)').matches) {
            nav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            nav.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});
