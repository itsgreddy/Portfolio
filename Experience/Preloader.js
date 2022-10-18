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

    firstIntro() {
        return new Promise((resolve) => { // We are using asynchronous JS to make sure that the preloader animation is completed, even if the user tries to scroll down and skill it 

            this.firstTimeline = new GSAP.timeline();

            if (this.device === "desktop") {
                this.firstTimeline.to(this.roomChildren.Cube.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                    ease: "back-out(3)",
                    duration: 0.5,
                })
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.5,
                        onComplete: resolve, // Fulfilling the promise we made after the preloader is done
                    });
            } else {
                this.firstTimeline.to(this.roomChildren.Cube.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                    ease: "back-out(3)",
                    duration: 0.5,
                })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.5,
                        onComplete: resolve,
                    });
            }
        })
    }

    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();

            if (this.device === "desktop") {
                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 0.5,
                });
            } else {
                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 0.5,
                });
            }
        });

    }

    onScroll(e) { // Grabbing the event object and checking for the event
        if (e.deltaY > 0) {
            // console.log("added event");
            // window.removeEventListener("wheel", this.onScroll.bind(this)); // this doesn't simply remove the event because its different now, we need to provide pointer variable for it to happen
            window.removeEventListener("wheel", this.scrollOnceEvent); // We need to add a pointer fucntion for it 
            this.playSecondIntro();
        }
    }

    async playIntro() {
        await this.firstIntro();
        // console.log("continuing");
        this.scrollOnceEvent = this.onScroll.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent); // Binding this so that we dont lose context
    }

    async playSecondIntro() {
        await this.secondIntro();
    }

}