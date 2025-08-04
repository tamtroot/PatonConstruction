class Lightbox {
    constructor() {
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.id = 'lightbox';
        this.container.className = 'lightbox';
        document.body.appendChild(this.container);

        this.lightboxImg = document.createElement('img');
        this.container.appendChild(this.lightboxImg);

        this.caption = document.createElement('p');
        this.caption.className = 'lightbox-caption';
        this.container.appendChild(this.caption);

        // Navigation buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'lightbox-btn prev';
        this.prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        this.container.appendChild(this.prevBtn);

        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'lightbox-btn next';
        this.nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        this.container.appendChild(this.nextBtn);

        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'lightbox-btn close';
        this.closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        this.container.appendChild(this.closeBtn);

        this.currentIndex = 0;
        this.galleryImages = [];
        this.bindEvents();
    }

    bindEvents() {
        // Collect all gallery images
        document.querySelectorAll('.gallery-item img').forEach((img, index) => {
            this.galleryImages.push({
                src: img.src,
                alt: img.alt
            });

            img.addEventListener('click', (e) => {
                this.currentIndex = index;
                this.showLightbox(img.src, img.alt);
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.hideLightbox());

        // Navigation
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.container.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.hideLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
            }
        });

        // Close on background click
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.hideLightbox();
            }
        });
    }

    showLightbox(src, alt) {
        this.lightboxImg.src = src;
        this.caption.textContent = alt;
        this.container.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateNavigation();
    }

    hideLightbox() {
        this.container.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigate(direction) {
        this.currentIndex += direction;
        if (this.currentIndex >= this.galleryImages.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.galleryImages.length - 1;
        }

        const { src, alt } = this.galleryImages[this.currentIndex];
        this.lightboxImg.src = src;
        this.caption.textContent = alt;
        this.updateNavigation();
    }

    updateNavigation() {
        // Show/hide navigation buttons based on image count
        if (this.galleryImages.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = '';
            this.nextBtn.style.display = '';
        }
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});