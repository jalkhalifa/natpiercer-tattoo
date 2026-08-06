const languageButtons = document.querySelectorAll(".language-button");
const translatedElements = document.querySelectorAll("[data-pt][data-en]");

function changeLanguage(language) {
    translatedElements.forEach((element) => {
        const translation = element.dataset[language];

        if (translation) {
            element.textContent = translation;
        }
    });

    languageButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.language === language
        );
    });

    document.documentElement.lang =
        language === "pt" ? "pt-BR" : "en";

    localStorage.setItem("selectedLanguage", language);
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.language);
    });
});

const savedLanguage =
    localStorage.getItem("selectedLanguage") || "pt";

changeLanguage(savedLanguage);

/* ========================================
   CARROSSEL DE CERTIFICADOS
======================================== */

document
    .querySelectorAll("[data-certificados-carousel]")
    .forEach((carousel) => {

        const track =
            carousel.querySelector("[data-carousel-track]");

        const previousButton =
            carousel.querySelector("[data-carousel-prev]");

        const nextButton =
            carousel.querySelector("[data-carousel-next]");

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        let autoplayTimer;

        function cardStep() {
            const card =
                track.querySelector(".certificado-card");

            const styles =
                window.getComputedStyle(track);

            const gap =
                parseFloat(
                    styles.columnGap || styles.gap
                ) || 0;

            return card
                ? card.getBoundingClientRect().width + gap
                : track.clientWidth * 0.85;
        }

        function updateButtons() {
            const maxScroll =
                track.scrollWidth - track.clientWidth;

            previousButton.disabled =
                track.scrollLeft <= 4;

            nextButton.disabled =
                track.scrollLeft >= maxScroll - 4;
        }

        function move(direction) {
            track.scrollBy({
                left: direction * cardStep(),

                behavior:
                    reducedMotion
                        ? "auto"
                        : "smooth"
            });
        }

        function stopAutoplay() {
            window.clearInterval(autoplayTimer);
        }

        function startAutoplay() {
            stopAutoplay();

            if (reducedMotion) {
                return;
            }

            autoplayTimer =
                window.setInterval(() => {

                    const maxScroll =
                        track.scrollWidth -
                        track.clientWidth;

                    if (
                        track.scrollLeft >=
                        maxScroll - 4
                    ) {
                        track.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });
                    } else {
                        move(1);
                    }

                }, 4500);
        }

        previousButton.addEventListener(
            "click",
            () => move(-1)
        );

        nextButton.addEventListener(
            "click",
            () => move(1)
        );

        track.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    move(-1);
                }

                if (event.key === "ArrowRight") {
                    event.preventDefault();
                    move(1);
                }
            }
        );

        track.addEventListener(
            "scroll",
            updateButtons,
            { passive: true }
        );

        carousel.addEventListener(
            "mouseenter",
            stopAutoplay
        );

        carousel.addEventListener(
            "mouseleave",
            startAutoplay
        );

        carousel.addEventListener(
            "focusin",
            stopAutoplay
        );

        carousel.addEventListener(
            "focusout",
            startAutoplay
        );

        carousel.addEventListener(
            "touchstart",
            stopAutoplay,
            { passive: true }
        );

        carousel.addEventListener(
            "touchend",
            startAutoplay,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateButtons
        );

        updateButtons();
        startAutoplay();
    });

    /* ========================================
   GUIA DE PIERCINGS — ABAS
======================================== */

const guiaTabs =
    document.querySelectorAll("[data-guia-tab]");

const guiaPanels =
    document.querySelectorAll("[data-guia-panel]");

guiaTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const selectedPanel =
            tab.dataset.guiaTab;

        guiaTabs.forEach((currentTab) => {

            const isActive =
                currentTab === tab;

            currentTab.classList.toggle(
                "active",
                isActive
            );

            currentTab.setAttribute(
                "aria-selected",
                isActive
            );

        });

        guiaPanels.forEach((panel) => {

            const isActive =
                panel.id === selectedPanel;

            panel.classList.toggle(
                "active",
                isActive
            );

            panel.hidden = !isActive;

        });

    });

});