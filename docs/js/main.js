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

    // 3. Dynamic content simulation within Setup and Marketing pages
    const submenuItems = document.querySelectorAll('.submenu-item');
    const contentArea = document.getElementById('dynamic-content-area');

    // Store original setup content if we are on the setup page
    let initialSetupContent = null;
    if (window.location.pathname.endsWith('setup.html') || window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        initialSetupContent = contentArea ? contentArea.innerHTML : null;
    }

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
        if (slug === 'address-form' && initialSetupContent) {
            contentArea.innerHTML = initialSetupContent;
        } else {
            contentArea.innerHTML = `
                <div style="padding: 40px; position: relative; z-index: 10;">
                    <h1 style="color: #333;">${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
                    <p style="color: #666;">This section is under construction.</p>
                </div>
            `;
        }
    }
});
