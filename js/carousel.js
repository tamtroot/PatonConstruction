class TestimonialCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');

        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Show first slide
        this.showSlide(0);

        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigate(1));
        }

        // Add dot click events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Auto advance slides every 5 seconds
        setInterval(() => this.navigate(1), 5000);
    }

    showSlide(index) {
        // Handle index bounds
        if (index >= this.slides.length) {
            index = 0;
        } else if (index < 0) {
            index = this.slides.length - 1;
        }

        // Update current slide
        this.currentSlide = index;

        // Hide all slides
        this.slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });

        // Show current slide
        this.slides[this.currentSlide].style.opacity = '1';
        this.slides[this.currentSlide].style.visibility = 'visible';

        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }

    navigate(direction) {
        this.showSlide(this.currentSlide + direction);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});