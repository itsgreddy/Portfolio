import EventEmitter from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide"); // Calling Slide class and using it to tranfrom
            this.theme = this.theme === "light" ? "dark" : "light"; // Ternary operater | If theme is light set to dark or vice versa
            console.log(this.theme);
        })
    }
}
