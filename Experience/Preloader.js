import { EventEmitter } from "events";
import GSAP from "gsap";

import Experience from "./Experience";

export default class Preloader extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevices", (device) => { // Using the resize function in sizes to change devices
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren); // using a reference object and not using a loop to get the childs
    }

    playIntro() {
        this.firstIntro();
    }

    firstIntro() {
        this.timeline = new GSAP.timeline();

        this.timeline.to(this.roomChildren.Cube.scale, {
            x: 0.25,
            y: 0.25,
            z: 0.25,
            ease: "back-out(3)",
            duration: 0.7,
        })
            .to(this.room.position, {
                x: -1,
                ease: "power1.out",
                duration: 0.7,
            });
    }
}