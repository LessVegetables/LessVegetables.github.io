'use strict';

function disableScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('no-scroll');
}

function enableScroll() {
    document.body.style.paddingRight = ''; // Reset padding
    document.body.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', () => {
    const overlayContainer = document.createElement('div');

    // Load the overlay template and append it to the body.
    fetch('overlayTemplate.html')
        .then(response => response.text())
        .then(template => {
            overlayContainer.innerHTML = template;
            document.body.appendChild(overlayContainer);
            console.log('Overlay template loaded');
            addOverlayEventListeners();
        })
        .catch(err => console.error('Error loading overlay template:', err));


    function addOverlayEventListeners() {
        const overlay = document.getElementById('project-overlay');
        const closeBtn = overlay.querySelector('.close-btn');
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Determine which project was clicked. For example, using a data attribute:
                const projectId = item.getAttribute('data-project-id');
                // Construct the URL for the project details HTML file.
                const projectUrl = `projects/${projectId}.html`;

                // Load the project-specific content.
                fetch(projectUrl)
                    .then(response => response.text())
                    .then(projectContent => {
                        document.getElementById('project-content').innerHTML = projectContent;
                        // overlay.classList.remove('hidden');
                        overlay.classList.add('active');  // To show the overlay
                        // document.body.classList.add('no-scroll');   // To disable the scrolling of the main body
                        disableScroll();
                    })
                    .catch(err => console.error('Error loading project content:', err));
            });
        });

        closeBtn.addEventListener('click', () => {
            // overlay.classList.add('hidden');
            overlay.classList.remove('active');  // To hide the overlay
            // document.body.classList.remove('no-scroll');
            enableScroll();
        });

        // Optional: close overlay if clicking outside the content area
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                // overlay.classList.add('hidden');
                overlay.classList.remove('active');
                // document.body.classList.remove('no-scroll');
                enableScroll();
            }
        });
    }
});
