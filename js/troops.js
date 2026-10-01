document.addEventListener("DOMContentLoaded", () => {
    const troopCards = document.querySelectorAll(".troop-card-item");

    function runCounterAnimation(card) {
        const statNumbers = card.querySelectorAll(".stat-number");
        statNumbers.forEach((num) => {
            clearInterval(num.activeCardInterval);
            const target = parseInt(num.getAttribute("data-target"), 10);
            let current = 0;
            const increment = Math.ceil(target / 25); 
            
            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target; 
                    clearInterval(updateCounter);
                } else {
                    num.textContent = current;
                }
            }, 25);
            
            num.activeCardInterval = updateCounter;
        });
    }

    function resetCounterAnimation(card) {
        const statNumbers = card.querySelectorAll(".stat-number");
        statNumbers.forEach((num) => {
            clearInterval(num.activeCardInterval); 
            num.textContent = "0";          
        });
    }

    troopCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            runCounterAnimation(card);
        });

        card.addEventListener("mouseleave", () => {
            resetCounterAnimation(card);
        });

        card.addEventListener("click", (e) => {
            if (window.matchMedia("(hover: none)").matches) {
                const isActive = card.classList.contains("active-mobile");
                
                troopCards.forEach((c) => {
                    c.classList.remove("active-mobile");
                    resetCounterAnimation(c);
                });

                if (!isActive) {
                    card.classList.add("active-mobile");
                    runCounterAnimation(card);
                }
            }
        });
    });
});