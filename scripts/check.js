// Optional JavaScript code for carousel functionality

// Get the carousel element
const carousel = document.querySelector('.carousel');

// Function to rotate the carousel to the next item
function rotateCarousel() {
    const currentItem = carousel.querySelector('.item:first-child');
    const nextItem = currentItem.nextElementSibling || carousel.querySelector('.item:first-child');
    carousel.appendChild(currentItem);
    nextItem.style.transform = 'rotateY(0deg) translateZ(250px)';
}

// Rotate the carousel every 3 seconds
setInterval(rotateCarousel, 3000);
