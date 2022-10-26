import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector(".experience-canvas")) // Passing the canvas element for ThreeJS to the class "Experience"

const tabsContainer = document.querySelector(".tab-titles"),
    practicumSection = document.querySelector(".second-section");

tabsContainer.addEventListener("click", (e) => {
    // console.log(e.target); // Shows in console whenever we click any of the sections
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        tabsContainer.querySelector(".active").classList.remove("active"); // Changing active variable here
        e.target.classList.add("active");
        // console.log("I am working")

        const target = e.target.getAttribute("data-target"); // Getting the ID
        // console.log(target);
        practicumSection.querySelector(".tab-content.active").classList.remove("active");
        practicumSection.querySelector(target).classList.add("active"); // using the target and adding the active
    }
})

const aboutContainer = document.querySelector(".about-tabs"),
    aboutSection = document.querySelector(".first-section");

aboutContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        aboutContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");

        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
})