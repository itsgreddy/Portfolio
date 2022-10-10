import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room";
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

        this.resources.on("ready", () => {
            this.environment = new Environment(); // Instantiaing Environment
            this.room = new Room();
            this.controls = new Controls();
            // console.log("Created room");
        })

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