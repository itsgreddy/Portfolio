import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room";
import Floor from "./Floor";
import Controls from "./Controls";
import Environment from "./Environment";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment(); // Instantiaing Environment
            this.floor = new Floor(); // We will be getting errors for circles if it's after room
            this.room = new Room();
            this.controls = new Controls();
            // console.log("Created room");
        });

        this.theme.on("switch", (theme) => { // Grabbing the theme we passed in theme.js 
            this.switchTheme(theme); // Passing theme on to a function
        });
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme); // Creating new method and passing in theme
        }
    }

    resize() { }

    update() {
        if (this.room) { // Once the room has been created
            this.room.update(); // Start updating it
        }
        if (this.controls) {
            this.controls.update();
        }
    }
}