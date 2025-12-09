/* ========================================
   Component: Navbar JavaScript
   Handles mobile menu, scroll behavior, etc.
   ======================================== */

export class Navbar {
    constructor() {
        // DOM Elements
        this.navbar = document.querySelector('.navbar');
        this.toggleBtn = document.querySelector('.navbar-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');

        // State
        this.isMobileMenuOpen = false;
        this.lastScrollY = 0;

        // Bind methods
        this.handleToggle = this.handleToggle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    init() {
        if (!this.navbar) return;

        // Event Listeners
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', this.handleToggle);
        }

        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('click', this.handleOutsideClick);

        // Initial scroll check
        this.handleScroll();
    }

    /**
     * Toggle mobile menu open/closed
     */
    handleToggle() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('is-open', this.isMobileMenuOpen);
        }

        // Update toggle button icon
        if (this.toggleBtn) {
            const icon = this.toggleBtn.querySelector('i');
            if (icon) {
                icon.className = this.isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }

    /**
     * Handle scroll behavior
     * - Show/hide navbar on scroll
     * - Add shadow on scroll
     */
    handleScroll() {
        const currentScrollY = window.scrollY;

        // Add shadow when scrolled
        if (currentScrollY > 10) {
            this.navbar.classList.add('navbar--scrolled');
        } else {
            this.navbar.classList.remove('navbar--scrolled');
        }

        // Optional: Hide navbar on scroll down, show on scroll up
        // Uncomment if desired:
        /*
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.navbar.classList.add('navbar--hidden');
        } else {
            this.navbar.classList.remove('navbar--hidden');
        }
        */

        this.lastScrollY = currentScrollY;
    }

    /**
     * Handle window resize
     * Close mobile menu on desktop breakpoint
     */
    handleResize() {
        if (window.innerWidth >= 1024 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    /**
     * Close mobile menu when clicking outside
     */
    handleOutsideClick(event) {
        if (!this.isMobileMenuOpen) return;

        const isClickInsideMenu = this.mobileMenu?.contains(event.target);
        const isClickOnToggle = this.toggleBtn?.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            this.closeMobileMenu();
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.isMobileMenuOpen = false;

        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('is-open');
        }

        if (this.toggleBtn) {
            const icon = this.toggleBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }

        document.body.style.overflow = '';
    }

    /**
     * Cleanup - remove event listeners
     */
    destroy() {
        if (this.toggleBtn) {
            this.toggleBtn.removeEventListener('click', this.handleToggle);
        }
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('click', this.handleOutsideClick);
    }
}
