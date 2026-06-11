document.addEventListener('DOMContentLoaded', () => {
    // Submenu Toggle Logic
    const restaurantBasicsHeader = document.getElementById('restaurant-basics-header');
    const restaurantBasicsSubmenu = document.getElementById('restaurant-basics-submenu');

    if (restaurantBasicsHeader && restaurantBasicsSubmenu) {
        restaurantBasicsHeader.addEventListener('click', () => {
            const isExpanded = restaurantBasicsSubmenu.classList.contains('expanded');
            const icon = restaurantBasicsHeader.querySelector('i');

            if (isExpanded) {
                restaurantBasicsSubmenu.classList.remove('expanded');
                icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            } else {
                restaurantBasicsSubmenu.classList.add('expanded');
                icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            }
        });
    }

    // Active State Simulation for Menu Items
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', () => {
            submenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Icon Sidebar Active State
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
        item.addEventListener('click', () => {
            iconItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
