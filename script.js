const header = document.querySelector('header');
const imgContainer = document.querySelector('.img-container');

let requestId = null;

function updateHeaderClipPath() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDistance = Math.min(600, Math.max(0, scrollPosition));
    
    // Only apply effects if scrolling down
    if (scrollPosition > 0) {
        const progress = scrollDistance / 600;
        const clipPathValue = `polygon(
            0 0, 
            100% 0%, 
            ${100 - (progress * 100)}% ${progress * 100}%,
            0 100%
        )`;
        
        header.style.clipPath = clipPathValue;
        
        // Subtle zoom effect
        const scaleValue = 1 + (progress * 0.2);
        imgContainer.style.transform = `scale(${scaleValue})`;
    } else {
        // Reset to initial state when at top
        header.style.clipPath = 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)';
        imgContainer.style.transform = 'scale(1)';
    }
    
    requestId = null;
}

function scrollHandler() {
    if (!requestId) {
        requestId = window.requestAnimationFrame(updateHeaderClipPath);
    }
}

window.addEventListener('scroll', scrollHandler);





function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }




  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// Apply dark mode if previously enabled
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading with intersection observer for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src; // Use data-src if available
            observer.unobserve(img);
        }
    });
}, { rootMargin: "0px 0px 200px 0px" });

lazyImages.forEach(img => imageObserver.observe(img));