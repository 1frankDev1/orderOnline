document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation logic between main modules
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });
    });

    // 2. Help Navigation
    const helpNavIcon = document.getElementById('help-nav-icon');
    if (helpNavIcon) {
        helpNavIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = 'help.html';
        });
    }

    // 3. Submenu Toggle Logic (Accordion behavior)
    const menuHeaders = document.querySelectorAll('.menu-header');

    menuHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            const isSubmenu = submenu && submenu.classList.contains('submenu');

            if (isSubmenu) {
                const isExpanded = submenu.classList.contains('expanded');

                // Close all other submenus
                document.querySelectorAll('.submenu.expanded').forEach(openSubmenu => {
                    if (openSubmenu !== submenu) {
                        openSubmenu.classList.remove('expanded');
                        const otherHeader = openSubmenu.previousElementSibling;
                        const otherIcon = otherHeader.querySelector('.fa-chevron-down');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-down');
                            otherIcon.classList.add('fa-chevron-right');
                        }
                    }
                });

                // Toggle current submenu
                const icon = header.querySelector('.fas');
                if (isExpanded) {
                    submenu.classList.remove('expanded');
                    if (icon) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-right');
                    }
                } else {
                    submenu.classList.add('expanded');
                    if (icon) {
                        icon.classList.remove('fa-chevron-right');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });

    // 4. Submenu Item Selection
    const submenuItems = Array.from(document.querySelectorAll('.submenu-item'));
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            submenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // In a real app, this would change the content area
            const slug = item.getAttribute('data-slug');
            console.log('Selected:', slug);
        });
    });

    // 5. "Next" Button logic
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activeItem = document.querySelector('.submenu-item.active');
            if (!activeItem) return;

            const currentIndex = submenuItems.indexOf(activeItem);
            if (currentIndex !== -1 && currentIndex < submenuItems.length - 1) {
                // Navigate to next item in current submenu
                const nextItem = submenuItems[currentIndex + 1];

                // If next item is in a different submenu, expand it
                const nextSubmenu = nextItem.parentElement;
                if (!nextSubmenu.classList.contains('expanded')) {
                    const nextHeader = nextSubmenu.previousElementSibling;
                    if (nextHeader) nextHeader.click();
                }

                nextItem.click();
            } else {
                console.log('End of setup items');
            }
        });
    }
});
