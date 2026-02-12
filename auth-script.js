// ========================================
// AUTHENTICATION JAVASCRIPT
// Login & Registration Handlers
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // PASSWORD TOGGLE
    // ============================================
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = togglePassword.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // ============================================
    // LOGIN FORM SUBMISSION
    // ============================================
    const loginForm = document.getElementById('loginForm');
    const userTypeSelection = document.getElementById('userTypeSelection');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> <span>Signing In...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form, show user type selection
                loginForm.style.display = 'none';
                if (userTypeSelection) {
                    userTypeSelection.style.display = 'block';
                }
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ============================================
    // REGISTER FORM SUBMISSION
    // ============================================
    const registerForm = document.getElementById('registerForm');
    const registerSuccess = document.getElementById('registerSuccess');
    
    if (registerForm && registerSuccess) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            // Validate password match
            const password = document.getElementById('regPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                // Show error
                confirmPassword.setCustomValidity('Passwords do not match');
                confirmPassword.reportValidity();
                return;
            }
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> <span>Creating Account...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                registerForm.style.display = 'none';
                registerSuccess.classList.add('active');
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            }, 2000);
        });
        
        // Real-time password validation
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('regPassword');
        
        if (confirmPassword && password) {
            confirmPassword.addEventListener('input', () => {
                if (confirmPassword.value === password.value) {
                    confirmPassword.setCustomValidity('');
                } else {
                    confirmPassword.setCustomValidity('Passwords do not match');
                }
            });
        }
    }
    
    // ============================================
    // SOCIAL LOGIN BUTTONS
    // ============================================
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList.contains('google') ? 'Google' : 'Facebook';
            const originalHTML = btn.innerHTML;
            
            btn.classList.add('loading');
            btn.innerHTML = '<i class="fas fa-spinner"></i> <span>Connecting...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                alert(`${platform} authentication would connect here in production.`);
                btn.classList.remove('loading');
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1500);
        });
    });
    
    // ============================================
    // FORM FIELD ANIMATIONS
    // ============================================
    const formInputs = document.querySelectorAll('.auth-form input, .auth-form select');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
        
        // Add filled state
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });
    
    // ============================================
    // REMEMBER ME FUNCTIONALITY
    // ============================================
    const rememberCheckbox = document.getElementById('remember');
    const emailInput = document.getElementById('email');
    
    if (rememberCheckbox && emailInput) {
        // Load saved email
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
        }
        
        // Save email on form submit
        if (loginForm) {
            loginForm.addEventListener('submit', () => {
                if (rememberCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', emailInput.value);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            });
        }
    }
});
