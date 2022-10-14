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
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            // console.log(this.theme);

            this.emit("switch", this.theme); // Passing argument called this.theme
        })
    }
}
