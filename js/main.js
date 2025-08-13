document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-toggle') && !e.target.closest('.nav-menu')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        }
    });

    // Smooth scroll for anchor links
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

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Contact form: disable submit until consent checked
    const consentCheckbox = document.getElementById('consent');
    const formSubmitButton = document.querySelector('.contact-form .submit-button');
    if (consentCheckbox && formSubmitButton) {
        // Initialize disabled state
        formSubmitButton.disabled = !consentCheckbox.checked;
        consentCheckbox.addEventListener('change', () => {
            formSubmitButton.disabled = !consentCheckbox.checked;
        });
    }

    // Cookie consent logic (contact page)
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const mapIframe = document.getElementById('contactMap');
    const mapOverlay = document.getElementById('mapConsentOverlay');

    const COOKIE_KEY = 'paton_cookie_consent'; // values: 'accepted' | 'rejected'

    function loadMapIfAllowed() {
        if (!mapIframe || !mapIframe.dataset || !mapIframe.dataset.src) return;
        const consentAccepted = localStorage.getItem(COOKIE_KEY) === 'accepted';
        const currentSrcAttr = mapIframe.getAttribute('src');
        if (consentAccepted) {
            if (!currentSrcAttr || currentSrcAttr === '' || currentSrcAttr === 'about:blank') {
                mapIframe.setAttribute('src', mapIframe.dataset.src);
            }
            if (mapOverlay) mapOverlay.style.display = 'none';
        } else {
            if (mapOverlay) mapOverlay.style.display = 'flex';
        }
    }

    // First-visit banner
    if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
        cookieBanner.hidden = false;
        // Show overlay for the map until a choice is made
        if (mapOverlay) mapOverlay.style.display = 'flex';
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem(COOKIE_KEY, 'accepted');
            if (cookieBanner) cookieBanner.hidden = true;
            loadMapIfAllowed();
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            localStorage.setItem(COOKIE_KEY, 'rejected');
            if (cookieBanner) cookieBanner.hidden = true;
            if (mapOverlay) mapOverlay.style.display = 'flex';
        });
    }

    const acceptCookiesMap = document.getElementById('acceptCookiesMap');
    if (acceptCookiesMap) {
        acceptCookiesMap.addEventListener('click', () => {
            localStorage.setItem(COOKIE_KEY, 'accepted');
            if (cookieBanner) cookieBanner.hidden = true;
            loadMapIfAllowed();
        });
    }

    // On load, decide whether to load the map
    loadMapIfAllowed();
});