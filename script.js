document.addEventListener('DOMContentLoaded', () => {
    // --- Persistent Dark Mode --- //

    // Function to apply the theme by setting the `data-theme` attribute
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    // Function to update the toggle's state to match the theme
    const updateToggleState = (theme) => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) { // Only run if the toggle exists
            themeToggle.checked = theme === 'dark';
        }
    };

    // Apply the saved theme on initial page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    updateToggleState(savedTheme);

    // Add event listener to the toggle switch (if it exists on the page)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // Save the choice
            applyTheme(newTheme); // Apply the new theme
        });
    }

    // Scroll Animations
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
        });
    }


    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentConfirmation = document.getElementById('appointment-confirmation');

    if (appointmentForm && appointmentConfirmation) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from submitting and reloading the page
            appointmentForm.style.display = 'none';
            appointmentConfirmation.style.display = 'block';
        });
    }

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // A bit more for mobile nav styling if needed
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.right = '20px';
            navLinks.style.background = 'var(--card-background)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '10px';
            navLinks.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            navLinks.style.display = 'none';
        }
    });
});
