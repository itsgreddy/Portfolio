import EventEmitter from "events";
export default class Sizes extends EventEmitter {
    constructor() {
        super();
        this.width = window.innerWidth; // Since our canvas takes up 100% that's why we use window width and height
        this.height = window.innerHeight; // If it doesn't then use the canvas width and height 
        this.aspect = this.width / this.height; // We need aspect ratio for the camera
        this.pixelRatio = Math.min(window.devicePixelRatio, 2) // To choose the pixel ratio acc to the device (minimum)
        this.frustrum = 5; // To avoid the NaN error with cam

        window.addEventListener("resize", () => { // We need this to update the values on resize
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit("resize");
        })
    }
}