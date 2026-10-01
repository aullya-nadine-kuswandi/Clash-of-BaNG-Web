document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide-item");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const dotsContainer = document.getElementById("dotsContainer");
    
    let currentIndex = 0;
    let slideTimer = null;
    const intervalDuration = 5000;

    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(index);
            restartAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function goToSlide(index) {
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    function startAutoSlide() {
        slideTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalDuration);
    }

    function restartAutoSlide() {
        clearInterval(slideTimer);
        startAutoSlide();
    }

    nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
        restartAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
        restartAutoSlide();
    });

    startAutoSlide();

    const scrollItems = document.querySelectorAll(".reveal-on-scroll");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollItems.forEach(item => {
        scrollObserver.observe(item);
    });
});