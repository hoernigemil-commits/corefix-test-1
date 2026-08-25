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

    /* =====================================================
       16. PORTAL DEMO (STARTSEITE)
       Static prototype only: no production authentication.
       ===================================================== */
    if (document.querySelector(".portal-page")) {

        const main = document.querySelector("main");

        main?.insertAdjacentHTML("beforeend", `
            <section class="portal-slide" id="portal">
                <div class="container portal-layout">
                    <div class="portal-intro">
                        <p class="eyebrow">COREFIX PORTAL</p>
                        <h2>Alles Wichtige.<br><em>An einem Ort.</em></h2>
                        <p>Behalten Sie Anfragen, Systeme und die Zusammenarbeit mit CoreFix im Blick. Der Portalbereich wird aktuell als Vorschau vorbereitet.</p>
                        <p class="portal-note">Für Mitarbeitende und Kunden. Klar, geschützt und jederzeit erreichbar.</p>
                    </div>
                    <div class="portal-card">
                        <div class="portal-tabs" role="tablist">
                            <button class="portal-tab active" type="button" data-portal-tab="register">Anmelden</button>
                            <button class="portal-tab" type="button" data-portal-tab="login">Einloggen</button>
                        </div>
                        <form class="portal-form" id="portalRegister" novalidate>
                            <h3>Portalzugang anfragen</h3>
                            <p>Wir richten Ihren Zugang nach einer kurzen Prüfung persönlich ein.</p>
                            <label>Geschäftliche E-Mail<input type="email" required placeholder="name@unternehmen.de"></label>
                            <label>Passwort festlegen<input id="portalPassword" type="password" required placeholder="Mindestens 10 Zeichen"></label>
                            <ul class="password-rules"><li data-rule="length">Mindestens 10 Zeichen</li><li data-rule="upper">Mindestens ein Großbuchstabe</li><li data-rule="lower">Mindestens ein Kleinbuchstabe</li><li data-rule="number">Mindestens eine Zahl</li></ul>
                            <button class="button button-primary" type="submit">Zugang anfragen <span>→</span></button>
                            <p class="portal-message" aria-live="polite"></p>
                        </form>
                        <form class="portal-form hidden" id="portalLogin" novalidate>
                            <h3>Willkommen zurück</h3>
                            <p>Bitte melden Sie sich mit Ihren Zugangsdaten an.</p>
                            <label>E-Mail-Adresse<input type="email" required placeholder="name@unternehmen.de"></label>
                            <label>Passwort<input type="password" required placeholder="Ihr Passwort"></label>
                            <button class="button button-primary" type="submit">Einloggen <span>→</span></button>
                            <p class="portal-message" aria-live="polite"></p>
                        </form>
                    </div>
                </div>
            </section>
            <div class="admin-demo" id="adminDemo" hidden>
                <div class="admin-demo-card">
                    <button class="admin-close" type="button" aria-label="Admin-Demo schließen">×</button>
                    <p class="eyebrow">ADMIN-DEMO</p><h2>Geschützter Bereich</h2>
                    <p>Dies ist ein visueller Prototyp. Er besitzt keine echte Zugriffskontrolle.</p>
                    <form id="adminDemoForm"><label>Benutzername<input autocomplete="username" required></label><label>Passwort<input type="password" autocomplete="current-password" required></label><button class="button button-primary" type="submit">Demo öffnen</button><p class="portal-message" aria-live="polite"></p></form>
                </div>
            </div>
        `);

        const register = document.getElementById("portalRegister");
        const password = document.getElementById("portalPassword");
        const setMessage = (form, message, type) => {
            const output = form.querySelector(".portal-message");
            output.textContent = message;
            output.className = `portal-message ${type}`;
        };
        const checkRules = () => {
            const value = password.value;
            const checks = { length: value.length >= 10, upper: /[A-Z]/.test(value), lower: /[a-z]/.test(value), number: /\d/.test(value) };
            document.querySelectorAll(".password-rules li").forEach(item => item.classList.toggle("valid", checks[item.dataset.rule]));
            return Object.values(checks).every(Boolean);
        };
        password.addEventListener("input", checkRules);
        register.addEventListener("submit", event => {
            event.preventDefault();
            if (!register.checkValidity() || !checkRules()) return setMessage(register, "Bitte erfüllen Sie alle Passwortkriterien.", "error");
            setMessage(register, "Vielen Dank. Ihre Zugangsanfrage wurde als Demo vorgemerkt.", "success");
            register.reset(); checkRules();
        });

        document.querySelectorAll(".portal-tab").forEach(tab => tab.addEventListener("click", () => {
            const registration = tab.dataset.portalTab === "register";
            document.querySelectorAll(".portal-tab").forEach(button => button.classList.toggle("active", button === tab));
            register.classList.toggle("hidden", !registration);
            document.getElementById("portalLogin").classList.toggle("hidden", registration);
        }));
        document.getElementById("portalLogin").addEventListener("submit", event => { event.preventDefault(); setMessage(event.currentTarget, "Diese Portal-Anmeldung ist in der Demo noch nicht mit einem Server verbunden.", "error"); });

        const admin = document.getElementById("adminDemo");
        document.addEventListener("keydown", event => { if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") admin.hidden = false; });
        admin.querySelector(".admin-close").addEventListener("click", () => admin.hidden = true);
        document.getElementById("adminDemoForm").addEventListener("submit", event => {
            event.preventDefault();
            const fields = event.currentTarget.querySelectorAll("input");
            const allowed = [...fields].every(field => field.value === "Temp12345678");
            setMessage(event.currentTarget, allowed ? "Admin-Demo geöffnet – keine produktive Anmeldung." : "Ungültige Demo-Zugangsdaten.", allowed ? "success" : "error");
        });
    }

    /* =====================================================
       17. ENTERPRISE MICRO-INTERACTIONS
       ===================================================== */
    if (document.querySelector(".hero-enterprise")) {
        document.querySelector(".solutions-section")?.insertAdjacentHTML("afterend", `
            <section class="campaign-section">
                <div class="container">
                    <div class="campaign-heading"><p class="eyebrow">COREFIX IM EINSATZ</p><h2>IT, die man<br><em>nicht erklären muss.</em></h2><p>Ein Blick auf das, was im Alltag wirklich zählt: Klarheit, Sicherheit und ein Ansprechpartner, der dranbleibt.</p></div>
                    <div class="campaign-grid">
                        <article class="campaign-card campaign-dark"><img src="assets/corefix-logo.png" alt="CoreFix Logo"><span class="campaign-kicker">IMMER ERREICHBAR</span><h3>Wenn es zählt,<br><b>sind wir da.</b></h3><p>Persönlicher Support für Fragen, Störungen und den nächsten Schritt.</p><div class="campaign-lines" aria-hidden="true"><i></i><i></i><i></i></div></article>
                        <article class="campaign-card campaign-light"><img src="assets/corefix-logo.png" alt="CoreFix Logo"><span class="campaign-kicker">MIT WEITBLICK</span><h3>Ihre IT.<br><b>Ihr Tempo.</b></h3><p>Wir verbinden sichere Technik mit Lösungen, die zu Ihrem Unternehmen passen.</p><div class="campaign-orbit" aria-hidden="true"><span>CF</span></div></article>
                        <article class="campaign-card campaign-blue"><img src="assets/corefix-logo.png" alt="CoreFix Logo"><span class="campaign-kicker">KLAR GESCHÜTZT</span><h3>Ein gutes Gefühl.<br><b>Jeden Tag.</b></h3><ul><li>Systeme im Blick</li><li>Daten geschützt</li><li>Hilfe, wenn sie gebraucht wird</li></ul></article>
                    </div>
                </div>
            </section>
        `);
        document.body.insertAdjacentHTML("afterbegin", '<div class="scroll-progress" aria-hidden="true"><span></span></div>');
        const progress = document.querySelector(".scroll-progress span");
        const updateProgress = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        };
        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });

        const interactiveNodes = document.querySelectorAll(".architecture-node");
        const coreLabel = document.querySelector(".architecture-core small");
        interactiveNodes.forEach(node => {
            node.tabIndex = 0;
            node.setAttribute("role", "button");
            node.setAttribute("aria-pressed", "false");
            const selectNode = () => {
                interactiveNodes.forEach(other => {
                    const selected = other === node;
                    other.classList.toggle("is-active", selected);
                    other.setAttribute("aria-pressed", String(selected));
                });
                coreLabel.innerHTML = `${node.querySelector("span").textContent.toUpperCase()}<br>VERBUNDEN`;
            };
            node.addEventListener("click", selectNode);
            node.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectNode(); }
            });
        });

        const revealTargets = document.querySelectorAll(".statement-grid, .enterprise-card, .principles-visual, .principles-copy, .industry-list, .portal-intro, .portal-card, .enterprise-cta");
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
        }), { threshold: .12 });
        revealTargets.forEach(target => { target.classList.add("enterprise-reveal"); observer.observe(target); });
    }

});
