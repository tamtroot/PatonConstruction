document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    // Function to update slide visibility
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });

        // Show the current slide
        slides[index].style.opacity = '1';
        slides[index].style.visibility = 'visible';

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
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
        });
    });

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});