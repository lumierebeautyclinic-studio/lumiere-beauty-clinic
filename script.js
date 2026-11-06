
document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Menu
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

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

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }

    // 3. Booking Date
    const dateInput = document.getElementById("date");

    function setMinimumDate() {
        if (!dateInput) return;

        const today = new Date();

        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;
    }

    setMinimumDate();

    // 4. Booking Form
    const bookingForm = document.getElementById("booking-form");
    const formMessage = document.getElementById("form-message");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;

            if (!name || !phone || !service) {
                formMessage.textContent = "Please complete all required fields.";
                return;
            }

            formMessage.textContent =
                "Thank you, " + name +
                "! Your booking request has been received.";

            bookingForm.reset();

            setMinimumDate();

        });

    }

    // 5. Footer Year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
