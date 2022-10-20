import { EventEmitter } from "events";
import GSAP from "gsap";

import Experience from "./Experience";
import convert from "./Utils/convertDivsToSpan";

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
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren); // using a reference object and not using a loop to get the childs
    }

    firstIntro() {
        return new Promise((resolve) => { // We are using asynchronous JS to make sure that the preloader animation is completed, even if the user tries to scroll down and skill it 

            this.firstTimeline = new GSAP.timeline();
            this.firstTimeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.firstTimeline
                .to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => {
                        document.querySelector(".preloader").classList.add("hidden"); // Grabbing the preloader then adding the class list
                    },
                });
            if (this.device === "desktop") {
                this.firstTimeline
                    .to(this.roomChildren.Cube.scale, {
                        x: 0.2,
                        y: 0.2,
                        z: 0.2,
                        ease: "back-out(3)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        x: -1.3,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.firstTimeline
                    .to(this.roomChildren.Cube.scale, {
                        x: 0.25,
                        y: 0.25,
                        z: 0.25,
                        ease: "back-out(3)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.firstTimeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve, // Fulfilling the promise we made after the preloader is done
                    },
                    "same"
                );
        });
    }

    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.roomChildren.Cube.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 4
                    },
                    "same"
                )
                .to(
                    this.roomChildren.Cube.scale,
                    {
                        x: 1.7,
                        y: 1.5,
                        z: 1.7,
                    },
                    "same"
                )
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 4,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.Cube.position,
                    {
                        x: -0.032309,
                        y: 1.733471,
                        z: 0.52467,
                    },
                    "same"
                )
                .set(this.roomChildren.Body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.Cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.7,
                    },
                    "introanimation"
                )
                .to(".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introanimation")
                .to(".hero-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introanimation")
                .to(".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introanimation")
                .to(".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introanimation")
                .to(
                    this.roomChildren.Shelves.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.Door.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.Socket.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.Table_main.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.Guitar.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.Telescope.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.Clock.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.2"
                )
                // .to(
                //     this.roomChildren.Clock.rotation,
                //     {
                //         // x: 4 * Math.PI + Math.PI / 4,
                //         z: 4 * Math.PI + Math.PI / 4,
                //         ease: "power2.out",
                //         duration: 1,
                //     },
                //     "clock"
                // )
                .set(this.roomChildren.Table.scale, {
                    x: 0.010262,
                    y: 0.010262,
                    z: 0.020636,
                })
                .to(
                    this.roomChildren.Screens.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-1"
                )
                .to(
                    this.roomChildren.Peripherals.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-1"
                )
                .to(
                    this.roomChildren.Flowers.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Lamps.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Books.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Stationary.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Cushion_Bag.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    "chair",
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Cushion_Bag.rotation,
                    {
                        y: 4 * Math.PI + Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair",
                    ">-0.1"
                )
                .to(
                    this.roomChildren.Office_Chair.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.5)",
                        duration: 0.5,
                    },
                    "chair",
                    ">-0.1"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                )
        });

    }

    onScroll(e) { // Grabbing the event object and checking for the event
        if (e.deltaY > 0) {
            // console.log("added event");
            // window.removeEventListener("wheel", this.onScroll.bind(this)); // this doesn't simply remove the event because its different now, we need to provide pointer variable for it to happen
            // window.removeEventListener("wheel", this.scrollOnceEvent); // We need to add a pointer fucntion for it 
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY; // Setting initial Y value
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY; // Setting the current Y value
        let difference = this.initialY - currentY; // Calculating the difference
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null; // Resetting the initial value
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        // console.log("continuing");
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent); // Binding this so that we dont lose context
        window.addEventListener("touchstart", this.touchStart); // Binding this so that we dont lose context
        window.addEventListener("touchmove", this.touchMove); // Binding this so that we dont lose context
    }

    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1.3, 0, 0);
            console.log("Desktop is here");
        } else {
            this.room.position.set(0, 0, -1);
            console.log("Mobile is here");
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.room.scale.set(0.8, 0.8, 0.8);
        } else {
            this.room.scale.set(0.35, 0.35, 0.35);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }

}