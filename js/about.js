document.addEventListener("DOMContentLoaded", () => {
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