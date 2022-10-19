// We are using Singleton Pattern here
import * as THREE from "three";

// Utils Imports
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Assets from "./Utils/Assets"

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
import Controls from "./World/Controls";

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance //If It's avaliable then return it or else make it by going to this and then in next if look return it
        }
        Experience.instance = this
        this.canvas = canvas; // Setting variable named canvas to the canvas we passed in
        this.scene = new THREE.Scene();
        this.sizes = new Sizes(); // Making new sizes for any utils who need it
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(Assets); // Calling in Asset's Array and Passing them to Resources class
        this.theme = new Theme();
        this.world = new World(); // Order matters here
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        })

        this.sizes.on("resize", () => { // We are emitting in Size.JS here with "on" we are listening and executing the update fucntion
            this.resize();
        })
        this.time.on("update", () => { // We are emitting in Time.JS here with "on" we are listening and executing the update fucntion
            this.update();
        })
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

}