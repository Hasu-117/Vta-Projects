// ========================================
// HAPPY PET VETERINARY - MODERN JAVASCRIPT
// Interactive Features & Animations
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // THEME SWITCHER
    // ============================================
    const themeSwitcher = document.getElementById('themeSwitcher');
    const html = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add bounce animation
            themeSwitcher.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeSwitcher.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // ============================================
    // LANGUAGE DROPDOWN
    // ============================================
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const currentLang = document.getElementById('currentLang');
    
    if (langMenu) {
        const langLinks = langMenu.querySelectorAll('a');
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                
                switch(lang) {
                    case 'en':
                        currentLang.textContent = 'EN';
                        break;
                    case 'si':
                        currentLang.textContent = 'සිං';
                        break;
                    case 'ta':
                        currentLang.textContent = 'த';
                        break;
                }
                
                localStorage.setItem('language', lang);
            });
        });
    }
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
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
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .feature-item, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Animate success message
                formSuccess.style.opacity = '0';
                formSuccess.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    formSuccess.style.transition = 'all 0.3s ease-out';
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transform = 'scale(1)';
                }, 10);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                    contactForm.style.display = 'grid';
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }, 1500);
        });
    }
    
    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            const originalHTML = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                input.value = '';
            }, 2000);
        });
    }
    
    // ============================================
    // PARALLAX EFFECT FOR GRADIENT ORBS
    // ============================================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed) - (speed / 2);
            const y = (mouseY * speed) - (speed / 2);
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ============================================
    // HOVER EFFECT FOR SERVICE CARDS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-content h3, .stat-box h3');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const num = parseInt(text);
        
        if (!isNaN(num)) {
            const duration = 2000;
            const steps = 60;
            const increment = num / steps;
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= num) {
                    element.textContent = text;
                    clearInterval(counter);
                } else {
                    element.textContent = Math.floor(current) + text.replace(/[0-9]/g, '');
                }
            }, duration / steps);
        }
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ============================================
    // ADD HOVER TILT EFFECT TO CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('.team-card, .service-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // ============================================
    // TYPING EFFECT FOR HERO TITLE (Optional)
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease-in-out';
            heroTitle.style.opacity = '1';
        }, 500);
    }
    
    // ============================================
    // IMAGE LAZY LOADING
    // ============================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ============================================
    // CURSOR TRAIL EFFECT (Optional - Desktop Only)
    // ============================================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary-gradient);
            pointer-events: none;
            z-index: 9999;
            opacity: 0.3;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.3';
        });
    }
    
    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    console.log('🐾 Happy Pet Veterinary Clinic - Ready!');
});
