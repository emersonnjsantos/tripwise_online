/**
 * Mega Menu Component
 * Carrega e inicializa o mega menu dropdown
 */

document.addEventListener('DOMContentLoaded', function() {
    // Carregar o mega menu HTML
    loadMegaMenu();
});

/**
 * Carrega o conteúdo do mega menu do arquivo externo
 */
async function loadMegaMenu() {
    const container = document.getElementById('mega-menu-container');
    
    if (!container) {
        console.warn('Mega menu container not found');
        return;
    }

    try {
        const response = await fetch('components/mega-menu.html');
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
            initMegaMenuEvents();
        } else {
            console.error('Failed to load mega menu:', response.status);
        }
    } catch (error) {
        console.error('Error loading mega menu:', error);
    }
}

/**
 * Inicializa eventos do mega menu
 */
function initMegaMenuEvents() {
    const megaMenu = document.querySelector('.mega-menu');
    const dropdownBtn = document.querySelector('.nav-dropdown-btn');
    
    if (!megaMenu || !dropdownBtn) return;

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown-container')) {
            megaMenu.classList.remove('active');
        }
    });

    // Acessibilidade: fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            megaMenu.classList.remove('active');
            dropdownBtn.focus();
        }
    });

    // Analytics: rastrear cliques nos itens do menu
    const menuItems = document.querySelectorAll('.mega-menu-item, .featured-resource');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('h5')?.textContent || 'Unknown';
            console.log('Menu item clicked:', itemName);
            // Aqui você pode adicionar tracking analytics
        });
    });
}
