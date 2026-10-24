
const pages = document.getElementById("pages");
const sections = document.querySelectorAll("#pages > section");
const navLinks = document.querySelectorAll("header nav a");

function showSection(sectionId) {
    const index = Array.from(sections).findIndex(
        section => section.id === sectionId
    );

    if (index === -1) return;

    pages.style.transform = `translateX(-${index * 100}%)`;

    navLinks.forEach(link => {
        const linkId = link.getAttribute("href").slice(1);

        link.classList.toggle("active", linkId === sectionId);
    });

    history.replaceState(null, "", `#${sectionId}`);
}

// Navigation menu
navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const sectionId = this.getAttribute("href").slice(1);
        showSection(sectionId);
    });
});

// Links inside the page, such as View My Projects
document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.closest("nav")) return;

    link.addEventListener("click", function (event) {
        const sectionId = this.getAttribute("href").slice(1);

        if (document.getElementById(sectionId)) {
            event.preventDefault();
            showSection(sectionId);
        }
    });
});

// Open the correct section when the page loads
const initialSection = window.location.hash.slice(1);
showSection(
    Array.from(sections).some(section => section.id === initialSection)
        ? initialSection
        : "home"
);
