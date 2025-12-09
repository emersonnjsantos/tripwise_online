/* ========================================
   TripWise - JavaScript Main Entry Point
   ======================================== */

// Import modules
import { Navbar } from './components/navbar.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navbar
    const navbar = new Navbar();
    navbar.init();

    // Log initialization
    console.log('TripWise: Application initialized');
});
