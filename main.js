import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector(".experience-canvas")) // Passing the canvas element for ThreeJS to the class "Experience"

const tabsContainer = document.querySelector(".tab-titles"),
    aboutSection = document.querySelector(".second-section");

tabsContainer.addEventListener("click", (e) => {
    // console.log(e.target); // Shows in console whenever we click any of the sections
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        console.log("I am working")
    }
})