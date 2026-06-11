document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation logic between files
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });
    });

    // 2. Submenu Toggle Logic (Setup page)
    const menuHeaders = document.querySelectorAll('.menu-header');

    menuHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                const isExpanded = submenu.classList.contains('expanded');
                const icon = header.querySelector('i');

                if (isExpanded) {
                    submenu.classList.remove('expanded');
                    if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                } else {
                    submenu.classList.add('expanded');
                    if (icon) icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                }
            }
        });
    });

    // 3. Dynamic content simulation within Setup page
    const submenuItems = document.querySelectorAll('.submenu-item');
    const contentArea = document.querySelector('main.page-body');
    let initialContent = contentArea ? contentArea.innerHTML : '';

    if (submenuItems.length > 0 && contentArea) {
        submenuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active state in menu
                submenuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Simulate URL change (Slug)
                const slug = item.getAttribute('data-slug');
                if (slug) {
                    updateContent(slug);
                }
            });
        });
    }

    function updateContent(slug) {
        if (slug === 'address-form') {
            contentArea.innerHTML = initialContent;
        } else {
            contentArea.innerHTML = `
                <div class="map-placeholder"></div>
                <div style="padding: 40px; position: relative; z-index: 10;">
                    <h2 style="color: #333; background: rgba(255,255,255,0.8); display: inline-block; padding: 5px 10px; border-radius: 4px;">Content for: ${slug.replace(/-/g, ' ')}</h2>
                    <p style="color: #666; background: rgba(255,255,255,0.8); padding: 5px 10px; border-radius: 4px;">This section is under construction.</p>
                </div>
            `;
        }
    }
});
