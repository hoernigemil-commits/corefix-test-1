/* =========================================================
   COREFIX GMBH – GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("active");
            menuButton.setAttribute(
                "aria-label",
                navigation.classList.contains("active")
                    ? "Navigation schließen"
                    : "Navigation öffnen"
            );
        });


        // Menü nach Klick auf Link schließen
        const links = navigation.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-label", "Navigation öffnen");

            });

        });

    }


    /* =====================================================
       2. AKTUELLES JAHR
       ===================================================== */

    const yearElements = document.querySelectorAll("#year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       3. SCROLL-EFFEKT FÜR HEADER
       ===================================================== */

    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


    /* =====================================================
       4. NACH-OBEN-BUTTON
       ===================================================== */

    const topButton = document.getElementById("topButton");

    if (topButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                topButton.classList.add("show");
            } else {
                topButton.classList.remove("show");
            }

        });


        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, " +
        ".business-card, " +
        ".target-box, " +
        ".advantage, " +
        ".founding-card, " +
        ".process-card, " +
        ".faq-item, " +
        ".contact-card"
    );


    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       6. FAQ – AUFKLAPPEN
       ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");


            // Andere FAQ schließen
            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            // Aktuelles FAQ öffnen
            if (!isActive) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       7. SMOOTH SCROLL FÜR ANKER
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetID = this.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       8. AKTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";


    const navigationLinks =
        document.querySelectorAll(".navigation a");


    navigationLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");


        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       9. BUTTON HOVER EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(".button");


    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.classList.add("button-hover");

        });


        button.addEventListener("mouseleave", () => {

            button.classList.remove("button-hover");

        });

    });


    /* =====================================================
       10. KONTAKTFORMULAR
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (!name || !email || !message) {

                showMessage(
                    "Bitte fülle alle Pflichtfelder aus.",
                    "error"
                );

                return;

            }


            if (!validateEmail(email)) {

                showMessage(
                    "Bitte gib eine gültige E-Mail-Adresse ein.",
                    "error"
                );

                return;

            }


            showMessage(
                "Vielen Dank! Deine Anfrage wurde vorbereitet.",
                "success"
            );


            contactForm.reset();

        });

    }


    /* =====================================================
       11. E-MAIL VALIDIERUNG
       ===================================================== */

    function validateEmail(email) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);

    }


    /* =====================================================
       12. FORMULAR MELDUNGEN
       ===================================================== */

    function showMessage(text, type) {

        let message =
            document.getElementById("formMessage");


        if (!message) {

            message =
                document.createElement("div");

            message.id = "formMessage";

            const form =
                document.getElementById("contactForm");

            if (form) {
                form.appendChild(message);
            }

        }


        message.textContent = text;

        message.className =
            "form-message " + type;


        setTimeout(() => {

            message.classList.add("hide");

        }, 5000);

    }


    /* =====================================================
       13. ZAHLEN-ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    if (counters.length > 0) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;


                        const counter =
                            entry.target;

                        const target =
                            parseInt(
                                counter.dataset.target
                            );


                        let current = 0;

                        const duration = 1500;

                        const steps = 60;

                        const increment =
                            target / steps;


                        const timer =
                            setInterval(() => {

                                current += increment;


                                if (current >= target) {

                                    current = target;

                                    clearInterval(timer);

                                }


                                counter.textContent =
                                    Math.floor(current);

                            }, duration / steps);


                        counterObserver.unobserve(counter);

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       14. SERVICE CARD INTERAKTION
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                (y - rect.height / 2) / 25;

            const rotateY =
                (rect.width / 2 - x) / 25;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       15. ESC-TASTE
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navigation) {
                navigation.classList.remove("active");
            }

            if (menuButton) {
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-label", "Navigation öffnen");
            }


            faqItems.forEach(item => {

                item.classList.remove("active");

            });

        }

    });

});