document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalPages = pages.length; // This will correctly be 6
    let currentPageIndex = 0; // Starts at 0 (representing page 1/cover)

    // Function to update the page view and set the flip state
    function updateBook() {
        pages.forEach((page, index) => {
            // Check if the page should be flipped over (i.e., its index is before the current view index)
            if (index < currentPageIndex) {
                // Pages that have already been read/flipped (to the left)
                page.classList.add('flipped');
                // Ensure flipped pages stay underneath
                page.style.zIndex = index + 1; 
            } else {
                // Pages that are not yet flipped
                page.classList.remove('flipped');
                // Stack them visually from back to front (highest z-index is the cover/current page)
                page.style.zIndex = totalPages - index; 
            }
        });

        // Disable navigation buttons when at the start (page 1) or end (after page 6)
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages; 
    }

    // Next Page Handler
    function nextPage() {
        // We can only move to the next "view" up to 6 times (0 to 6)
        if (currentPageIndex < totalPages) {
            currentPageIndex++;
            updateBook();
        }
    }

    // Previous Page Handler
    function prevPage() {
        // We can only move back as long as we are not at the cover (index 0)
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updateBook();
        }
    }

    // Event Listeners for buttons
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);

    // Initial setup: call updateBook() to set the cover (page 1) as the current view
    updateBook(); 

    // Keyboard Arrow Key Navigation (Enhances desktop UX)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
});