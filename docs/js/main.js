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

    // 2. Submenu Toggle Logic (Accordion behavior)
    const menuHeaders = document.querySelectorAll('.menu-header');
    const allSubmenus = document.querySelectorAll('.submenu');

    menuHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                const isExpanded = submenu.classList.contains('expanded');

                // Close all other submenus
                allSubmenus.forEach(s => {
                    if (s !== submenu) {
                        s.classList.remove('expanded');
                        const h = s.previousElementSibling;
                        if (h) {
                            const icon = h.querySelector('i.fa-chevron-down');
                            if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                        }
                    }
                });

                // Toggle current submenu
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

    // 4. Help Modal Logic
    const helpModal = document.getElementById('help-modal');
    const openHelpBtn = document.getElementById('open-help-modal');
    const closeHelpBtn = document.getElementById('close-help-modal');

    if (helpModal && openHelpBtn && closeHelpBtn) {
        openHelpBtn.addEventListener('click', () => {
            helpModal.classList.add('active');
        });

        closeHelpBtn.addEventListener('click', () => {
            helpModal.classList.remove('active');
        });

        // Close modal when clicking outside content
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.classList.remove('active');
            }
        });
    }
});
