document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const body = document.body;

    function toggleMobileNav() {
        const isOpening = !mobileNav.classList.contains('active');
        
        mobileNavToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.style.overflow = isOpening ? 'hidden' : '';
        
        // Toggle aria-expanded for accessibility
        mobileNavToggle.setAttribute('aria-expanded', isOpening);
    }

    function closeMobileNav() {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
        mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    mobileNavToggle.addEventListener('click', toggleMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);

    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav when clicking outside
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            closeMobileNav();
        }
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });

    
    // Feedback Form Handling with Formspree
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            const successMessage = document.getElementById('form-success');
            const errorMessage = document.getElementById('form-error');
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Reset form
                    this.reset();
                    
                    // Reset stars
                    const stars = this.querySelectorAll('input[name="rating"]');
                    stars.forEach(star => star.checked = false);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
    

    // Star rating interaction
    const ratingStars = document.querySelectorAll('.rating-stars input');
    ratingStars.forEach(star => {
        star.addEventListener('change', function() {
            const ratingValue = this.value;
            console.log('Rating selected:', ratingValue);
        });
    });
});