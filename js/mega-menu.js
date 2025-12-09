/**
 * Mega Menu Controller
 * Controla múltiplos mega menus com click ao invés de hover
 */
document.addEventListener('DOMContentLoaded', function () {

    // Função para fechar todos os menus
    function closeAllMenus() {
        document.querySelectorAll('.mega-menu').forEach(function (menu) {
            menu.classList.remove('open');
        });
        document.querySelectorAll('.nav-dropdown-btn').forEach(function (btn) {
            btn.classList.remove('active');
        });
    }

    // Configurar todos os mega menus automaticamente
    var dropdownContainers = document.querySelectorAll('.nav-dropdown-container');

    dropdownContainers.forEach(function (container) {
        var btn = container.querySelector('.nav-dropdown-btn');
        var menu = container.querySelector('.mega-menu');

        if (btn && menu) {
            // Toggle menu ao clicar no botão
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var isOpen = menu.classList.contains('open');

                // Fechar todos os outros menus primeiro
                closeAllMenus();

                // Se não estava aberto, abrir este menu
                if (!isOpen) {
                    menu.classList.add('open');
                    btn.classList.add('active');
                }
            });

            // Manter menu aberto ao clicar dentro dele
            menu.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            // Fechar menu ao clicar em um link dentro dele
            var menuLinks = menu.querySelectorAll('a');
            menuLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    closeAllMenus();
                });
            });
        }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
        var clickedInsideMenu = false;
        document.querySelectorAll('.nav-dropdown-container').forEach(function (container) {
            if (container.contains(e.target)) {
                clickedInsideMenu = true;
            }
        });

        if (!clickedInsideMenu) {
            closeAllMenus();
        }
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllMenus();
        }
    });
});
