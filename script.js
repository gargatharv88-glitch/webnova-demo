/* =========================================
   WEBNOVA JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");

            menuButton.textContent =
                mobileMenu.classList.contains("open")
                    ? "✕"
                    : "☰";
        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.textContent = "☰";

            });

        });

    }


    /* =========================================
       FAQ ACCORDION
    ========================================= */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const currentItem =
                question.parentElement;

            const currentAnswer =
                currentItem.querySelector(".faq-answer");


            document.querySelectorAll(".faq-item")
                .forEach(item => {

                    if (item !== currentItem) {

                        item.classList.remove("active");

                        const answer =
                            item.querySelector(".faq-answer");

                        if (answer) {
                            answer.style.maxHeight = null;
                        }

                    }

                });


            currentItem.classList.toggle("active");


            if (currentItem.classList.contains("active")) {

                currentAnswer.style.maxHeight =
                    currentAnswer.scrollHeight + "px";

            } else {

                currentAnswer.style.maxHeight = null;

            }

        });

    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       NAVBAR ACTIVE SECTION
    ========================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    if (sections.length && navLinks.length) {

        const updateActiveNav = () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 180;

                if (window.scrollY >= sectionTop) {
                    currentSection = section.id;
                }

            });


            navLinks.forEach(link => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (href === "#" + currentSection) {
                    link.classList.add("active");
                }

            });

        };


        window.addEventListener(
            "scroll",
            updateActiveNav,
            { passive: true }
        );

        updateActiveNav();

    }


    /* =========================================
       SIMPLE CARD REVEAL
    ========================================= */

    const revealItems =
        document.querySelectorAll(
            ".service-card, .why-card, .work-card, .pricing-card, .process-step"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(item => {
            observer.observe(item);
        });

    }


    /* =========================================
       CLOSE MOBILE MENU ON OUTSIDE CLICK
    ========================================= */

    document.addEventListener("click", event => {

        if (!mobileMenu || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);


        if (
            mobileMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileMenu.classList.remove("open");

            menuButton.textContent = "☰";

        }

    });

});
