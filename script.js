'use strict';

//Changing the language
document.addEventListener("DOMContentLoaded", function () {
    // // Check for a saved theme preference in localStorage
    // let savedTheme = localStorage.getItem("theme");
    // let theme;

    // if (savedTheme) {
    //     theme = savedTheme;
    // } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     // If no saved preference, check the system preference
    //     theme = "dark";
    // } else {
    //     // Fallback default to dark mode
    //     theme = "dark";
    // }

    // // Apply the theme
    // setTheme(theme);

    // document.getElementById("theme-toggle").addEventListener("click", function () {
    //     let currentTheme = document.documentElement.getAttribute("data-theme");

    //     // Toggle between "dark" and "light"
    //     let newTheme = (currentTheme === "dark") ? "light" : "dark";

    //     // Save the new theme in localStorage
    //     localStorage.setItem("theme", newTheme);

    //     // Apply the new theme
    //     setTheme(newTheme);
    // });


    // // Function to apply the theme by setting an attribute on <html>
    // function setTheme(theme) {
    //     document.documentElement.setAttribute("data-theme", theme);
    // }

    let themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) {
        console.error("Theme toggle button not found!");
        return; // Exit if button doesn't exist
    }

    // themeToggle.addEventListener("click", function () {
    //     console.log("adding theme event listener");
    //     let currentTheme = document.documentElement.getAttribute("data-theme");
    //     let newTheme = (currentTheme === "dark") ? "light" : "dark";

    //     localStorage.setItem("theme", newTheme);
    //     setTheme(newTheme);
    // });
    themeToggle.addEventListener("click", function () {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "light") {
            console.log("lights out! switching to dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.removeAttribute("data-theme");
        } else {
            console.log("heads up! turning on the lights");
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        }
        console.log("switched!");
        console.log("Current data-theme:", document.documentElement.getAttribute("data-theme"));
    });


    function setTheme(theme) {
        console.log("setting theme");
        document.documentElement.setAttribute("data-theme", theme);
    }

    // language change // 
    let currentLang = localStorage.getItem("lang") || "en";
    let translations = {};

    // Load translations from lang.json file
    fetch("lang.json")
        .then((response) => response.json())
        .then((data) => {
            translations = data;
            applyTranslations(currentLang);
        })
        .catch((error) =>
            console.error("Error loading lang.json:", error)
        );

    // Toggle language when button is clicked
    document.getElementById("lang-toggle").addEventListener("click", function () {
        currentLang = currentLang === "en" ? "ru" : "en";
        localStorage.setItem("lang", currentLang);
        applyTranslations(currentLang);
    });

    // Apply translations based on the selected language
    function applyTranslations(lang) {
        document.querySelectorAll("[data-key]").forEach((el) => {
            const key = el.getAttribute("data-key");
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });
    }
});


//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

// const testimonialsModalFunc = function () {
//     modalContainer.classList.toggle('active');
//     overlay.classList.toggle('active');
// }

// for (let i = 0; i < testimonialsItem.length; i++) {
//     testimonialsItem[i].addEventListener('click', function () {
//         modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
//         modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
//         modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
//         modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

//         testimonialsModalFunc();
//     })
// }

//Activating close button in modal-testimonial

// modalCloseBtn.addEventListener('click', testimonialsModalFunc);
// overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener('click', function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else {
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function () {

        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i].classList.remove('active');
            }
        }
    });
}