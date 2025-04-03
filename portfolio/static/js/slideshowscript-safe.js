// Global slideIndex variable
let slideIndex = 1;

// Initialize the slideshow when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    // Start the automatic slideshow
    startSlideLoop();
});

// Function to handle next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    // Reset the timer when manually changing slides
    resetSlideLoop();
}

// Function to handle dot/thumbnail controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    // Reset the timer when manually changing slides
    resetSlideLoop();
}

// Function to display the slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Handle wrapping around at the end or beginning
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show the current slide and activate the corresponding dot
    if (slides.length > 0 && slideIndex > 0 && slideIndex <= slides.length) {
        slides[slideIndex-1].style.display = "block";
        if (dots.length > 0 && slideIndex <= dots.length) {
            dots[slideIndex-1].className += " active";
        }
    }
}

// Timer variable to store the interval ID
let slideTimer;

// Function to start the automatic slideshow
function startSlideLoop() {
    // Use a function reference instead of a string
    slideTimer = setInterval(function() {
        slideIndex++;
        let slides = document.getElementsByClassName("mySlides");
        if (slideIndex > slides.length) {slideIndex = 1}
        showSlides(slideIndex);
    }, 4000); // Change image every 4 seconds
}

// Function to reset the timer when manually changing slides
function resetSlideLoop() {
    clearInterval(slideTimer);
    startSlideLoop();
}
