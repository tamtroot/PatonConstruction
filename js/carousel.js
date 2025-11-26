document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return; // Exit if carousel doesn't exist
    
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    // Only initialize carousel if there are multiple slides
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    let autoAdvanceInterval;

    // Function to update container height based on tallest slide
    function updateContainerHeight() {
        const container = document.querySelector('.carousel-container');
        if (!container) return;
        
        let maxHeight = 0;
        
        // Measure all slides to find the tallest one
        slides.forEach((slide, index) => {
            const content = slide.querySelector('.testimonial-content');
            if (content) {
                // Temporarily make slide visible to measure
                const wasVisible = slide.style.opacity === '1';
                slide.style.opacity = '1';
                slide.style.visibility = 'visible';
                slide.style.position = 'static';
                
                const height = content.offsetHeight;
                maxHeight = Math.max(maxHeight, height);
                
                // Restore original state
                slide.style.opacity = wasVisible ? '1' : '0';
                slide.style.visibility = wasVisible ? 'visible' : 'hidden';
                slide.style.position = 'absolute';
            }
        });
        
        // Set container height to accommodate tallest slide
        if (maxHeight > 0) {
            container.style.minHeight = (maxHeight + 40) + 'px';
        }
    }

    // Function to update slide visibility
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });

        // Show the current slide
        if (slides[index]) {
            slides[index].style.opacity = '1';
            slides[index].style.visibility = 'visible';
        }

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        // Container height is set on initialization, no need to update here
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            // Reset auto-advance timer
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = setInterval(nextSlide, 30000);
        });
    });

    // Initialize first slide
    showSlide(0);
    
    // Update container height after content loads and on window resize
    setTimeout(updateContainerHeight, 200);
    window.addEventListener('resize', updateContainerHeight);

    // Auto advance slides every 18 seconds (allows plenty of time to read testimonials)
    autoAdvanceInterval = setInterval(nextSlide, 18000);
});