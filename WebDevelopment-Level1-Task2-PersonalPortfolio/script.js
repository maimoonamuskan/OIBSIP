const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contactForm");
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .about-details, .skills-grid, .projects-grid, .contact-info, .contact-form, .footer"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");

    Array.from(element.children).forEach((child, index) => {
        child.style.setProperty("--index", index);
    });
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
        `mailto:maimoonamuskan89@gmail.com?subject=${mailSubject}&body=${mailBody}`;
});