/* =========================================================
   OREGANO RESTAURANT
   Main JavaScript
========================================================= */


/* ================= DOM ELEMENTS ================= */

const header = document.getElementById("header");

const mobileMenu = document.getElementById("mobileMenu");

const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const menuTabs = document.querySelectorAll(".menu-tab");

const menuItems = document.querySelectorAll(".menu-item");

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");

const reservationForm =
    document.getElementById("reservationForm");

const toast = document.getElementById("toast");

const toastClose = document.getElementById("toastClose");

const backToTop = document.getElementById("backToTop");

const year = document.getElementById("year");


/* ================= CURRENT YEAR ================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ================= MOBILE NAVIGATION ================= */

mobileMenu.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = mobileMenu.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* CLOSE MOBILE NAV WHEN CLICKING LINK */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = mobileMenu.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= HEADER SCROLL EFFECT ================= */

function handleHeaderScroll() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* ================= MENU FILTER ================= */

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const category =
            tab.getAttribute("data-category");


        /* ACTIVE TAB */

        menuTabs.forEach(item => {

            item.classList.remove("active");

        });

        tab.classList.add("active");


        /* FILTER ITEMS */

        menuItems.forEach(item => {

            const itemCategory =
                item.getAttribute("data-category");


            if (
                category === "all" ||
                category === itemCategory
            ) {

                item.classList.remove("hidden");

                setTimeout(() => {

                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";

                }, 20);

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* ================= GALLERY LIGHTBOX ================= */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");

        if (!image) return;

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});


/* CLOSE LIGHTBOX */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* CLOSE WHEN CLICKING BACKGROUND */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* CLOSE WITH ESCAPE */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* ================= RESERVATION FORM ================= */

reservationForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const guests =
        document.getElementById("guests").value;


    if (
        !name ||
        !phone ||
        !date ||
        !time ||
        !guests
    ) {

        alert(
            "Please complete all required fields."
        );

        return;

    }


    /* SHOW SUCCESS MESSAGE */

    toast.classList.add("show");


    /* RESET FORM */

    reservationForm.reset();


    /* HIDE TOAST AFTER 6 SECONDS */

    setTimeout(() => {

        toast.classList.remove("show");

    }, 6000);

});


/* ================= TOAST CLOSE ================= */

toastClose.addEventListener("click", () => {

    toast.classList.remove("show");

});


/* ================= DATE RESTRICTION ================= */

const dateInput =
    document.getElementById("date");

if (dateInput) {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.setAttribute(
        "min",
        today
    );

}


/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= SCROLL ANIMATION ================= */

const animatedElements = document.querySelectorAll(
    ".feature-card, .menu-item, .review-card, .contact-card, .about-content, .about-images, .reservation-form-wrapper"
);


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const animationObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    animationObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    animationObserver.observe(element);

});


/* ================= SMOOTH ANCHOR SCROLL ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId === "#" ||
            !targetId
        ) {

            return;

        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

        const targetPosition =
            target.offsetTop -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ================= IMAGE ERROR FALLBACK ================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background =
            "#183b2b";

        img.style.objectFit =
            "contain";

        img.alt =
            "Oregano Restaurant";

    });

});


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%c Oregano Restaurant ",
    "background:#183b2b;color:#dfbb7b;font-size:18px;font-weight:bold;padding:8px;"
);

console.log(
    "Website loaded successfully."
);
