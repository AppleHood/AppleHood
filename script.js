document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // There are 7 pages. totalPages represents the number of total flips (7 flips: 0->1, 1->2, ..., 6->7)
    const totalPages = 7; 
    let currentPageIndex = 0; // Starts at 0 (Page 1/Cover is showing)

    // Function to update the page view and set the flip state
    function updateBook() {
        pages.forEach((page, index) => {
            // Only handle the first 7 pages
            if (index < totalPages) {
                
                // If the page index is less than the current view index, it has been flipped.
                if (index < currentPageIndex) {
                    page.classList.add('flipped');
                    // Flipped pages stack lower (z-index 1, 2, 3...)
                    page.style.zIndex = index + 1; 
                } else {
                    page.classList.remove('flipped');
                    // Unflipped pages stack from front to back (highest z-index is the current front page)
                    page.style.zIndex = totalPages - index; 
                }
            } else {
                 // Hide any pages beyond the 7th one (e.g., page-8 if it was accidentally left in HTML)
                page.style.display = 'none';
            }
        });

        // The previous button is disabled only at the very beginning (index 0).
        prevBtn.disabled = currentPageIndex === 0;
        
        // The next button is never disabled because of the looping logic.
        nextBtn.disabled = false; 
    }

    // Next Page Handler with Looping
    function nextPage() {
        if (currentPageIndex < totalPages) {
            // Normal flip: 0 -> 1, 1 -> 2, ..., 6 -> 7
            currentPageIndex++;
        } else {
            // LOOPING FIX: If we are on the last flip (index 7), go back to the start (index 0)
            currentPageIndex = 0; 
        }
        updateBook();
    }

    // Previous Page Handler 
    function prevPage() {
        // Stops at the cover (index 0)
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updateBook();
        }
    }

    // Event Listeners for buttons
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);

    // Initial setup
    updateBook(); 

    // Keyboard Arrow Key Navigation 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
});
