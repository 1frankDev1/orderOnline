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

    // 2. User Submenu Toggle
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userSubmenu = document.getElementById('user-submenu');
    if (userProfileBtn && userSubmenu) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userSubmenu.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            userSubmenu.classList.remove('active');
        });
    }

    // 3. Help Navigation
    const helpNavIcon = document.getElementById('help-nav-icon');
    if (helpNavIcon) {
        helpNavIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = 'help.html';
        });
    }

    // 4. Submenu Toggle Logic (Accordion behavior)
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
                            const icon = h.querySelector('i.fa-chevron-down') || h.querySelector('i.fa-chevron-right');
                            if (icon) {
                                icon.classList.remove('fa-chevron-down');
                                icon.classList.add('fa-chevron-right');
                            }
                        }
                    }
                });

                // Toggle current submenu
                const icon = header.querySelector('i.fa-chevron-down') || header.querySelector('i.fa-chevron-right');
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

    // 5. Dynamic Content and Sequential Navigation
    const submenuItems = Array.from(document.querySelectorAll('.submenu-item'));
    const contentArea = document.getElementById('dynamic-content-area');
    const nextBtn = document.getElementById('btn-next');

    // Track completed steps (stored in memory for this demo)
    const completedSteps = new Set();

    function updateCheckmarks() {
        submenuItems.forEach(item => {
            const slug = item.getAttribute('data-slug');
            const existingCheck = item.querySelector('.checkmark');

            if (completedSteps.has(slug)) {
                if (!existingCheck) {
                    const check = document.createElement('i');
                    check.className = 'fas fa-check checkmark';
                    item.appendChild(check);
                }
            }
        });
    }

    function navigateToNext() {
        const activeItem = document.querySelector('.submenu-item.active');
        if (!activeItem) return;

        const currentSlug = activeItem.getAttribute('data-slug');
        completedSteps.add(currentSlug);
        updateCheckmarks();

        const currentIndex = submenuItems.indexOf(activeItem);
        const nextIndex = currentIndex + 1;

        if (nextIndex < submenuItems.length) {
            const nextItem = submenuItems[nextIndex];

            // If next item is in a collapsed submenu, expand it
            const parentSubmenu = nextItem.closest('.submenu');
            if (parentSubmenu && !parentSubmenu.classList.contains('expanded')) {
                const header = parentSubmenu.previousElementSibling;
                if (header) header.click();
            }

            nextItem.click();
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', navigateToNext);
    }

    if (submenuItems.length > 0 && contentArea) {
        submenuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active state in menu
                submenuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update UI based on slug
                const slug = item.getAttribute('data-slug');
                if (slug) {
                    updateContent(slug);
                }
            });
        });
    }

    function updateContent(slug) {
        // Only the address-form shows the actual form in this prototype
        if (slug === 'address-form') {
            window.location.reload(); // Reload to show initial form if needed, or just keep as is
            return;
        }

        // For other slugs, show a placeholder
        contentArea.innerHTML = `
            <div style="padding: 100px; text-align: center; background: white; border-radius: 8px; margin: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
                <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Configuration for this section is coming soon.</p>
                <button id="btn-next-dynamic" class="btn-next">Next</button>
            </div>
        `;

        const dynamicNextBtn = document.getElementById('btn-next-dynamic');
        if (dynamicNextBtn) {
            dynamicNextBtn.addEventListener('click', navigateToNext);
        }
    }

    // Initial checkmark update
    updateCheckmarks();
});
