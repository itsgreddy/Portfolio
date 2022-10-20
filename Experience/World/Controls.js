import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

import { ScrollTrigger } from "gsap/ScrollTrigger"
import ASScroll from "@ashthornton/asscroll"

import Experience from "../Experience";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom; // Taking it from World.js instead of Experience.js
        // this.room.children.forEach(child => { // Scalling up the lights
        //     if (child.type === "RectAreaLight") { // ThreeJS provides the type to us for all the assets
        //         this.rectLight1 = child;
        //         this.rectLight2 = child;
        //         this.rectLight3 = child;
        //         this.rectLight4 = child;
        //     }
        // });

        // this.gui = new GUI({ container: document.querySelector('.hero-main') });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        GSAP.registerPlugin(ScrollTrigger); // Registering plugin

        document.querySelector('.page').style.overflow = "visible"; // This is hacky, figure out how to resolve the bug with asscroll GSAP

        this.setSmoothScroll();
        this.setScrollTrigger();
        // this.setGUI();
    }

    // setGUI() {
    //     this.gui.add(this.camera.position, 'x').min(-50).max(50).step(0.2).name('camera position x');
    //     this.gui.add(this.camera.position, 'y').min(-50).max(50).step(0.2).name('camera position y');
    //     this.gui.add(this.camera.position, 'z').min(-50).max(50).step(0.2).name('camera position z');
    // }

    setupASScroll() {
        const asscroll = new ASScroll({
            ease: 0.5,
            disableRaf: true
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]"),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 969px)": () => { // If we use regular function we lose context, thats why we use arrow fucntion to save context and we can access class variables
                // console.log("Fired Desktop");

                // ---- Resets ---- //

                this.room.scale.set(0.8, 0.8, 0.8);
                this.room.position.set(0, 0, 0);
                // this.rectLight1.width1 = 0.4
                // this.rectLight1.height1 = 0.4
                // this.rectLight2.width2 = 0.4
                // this.rectLight2.height2 = 0.4
                // this.rectLight3.width3 = 0.1
                // this.rectLight3.height3 = 0.1
                // this.rectLight4.width4 = 0.1
                // this.rectLight4.height4 = 0.1

                // -------------------- First Section -------------------- //

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move", // Specifying the section margin
                        // markers: true,
                        start: "top top", // Starting marker, activation
                        end: "bottom bottom", // Ending marker, Trigger
                        scrub: 0.6,
                        // scrub: 1,
                        invalidateOnRefresh: true, // Invalidating it on refresh, so that it checks again
                    },
                })
                    // --- Camera --- //

                    // .to(this.camera.prespectiveCamera.position, { x: 5, y: 0, z: 5 })
                    // .to(this.camera.orthographicCamera.rotation, { z: Math.PI / 2 }, "same")
                    // .to(
                    //     this.camera.orthographicCamera.rotation,
                    //     {
                    //         y: () => {
                    //             return Math.PI / 19;
                    //         },
                    //         z: () => {
                    //             return Math.PI / 19;
                    //         },
                    //     },
                    //     "same"
                    // )

                    // --- Room --- //

                    .to(
                        this.room.position, // Moving the mesh instead of the camera
                        {
                            // x: 2.5,
                            // x: this.sizes.width * 0.00094, // Making the animation depend on the size of window
                            x: () => { // To update the model on window changing we need to provide it as a function
                                return this.sizes.width * 0.00155; // Providing a fucntional wrap
                            },
                            y: () => {
                                return 0;
                            },
                            z: () => {
                                return 0;
                            },
                        },
                        "same"
                    )
                // .to(
                //     this.room.rotation,
                //     {
                //         // x: () => {
                //         //     return 3;
                //         // },
                //         z: () => {
                //             return Math.PI / 19;
                //         },
                //     },
                //     "same"
                // )
                // .to(
                //     this.room.scale,
                //     {
                //         x: 0.8,
                //         y: 0.8,
                //         z: 0.8,
                //     },
                //     "same"
                // )

                // -------------------- Second Section -------------------- //

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        // markers: true,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // scrub: 1,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 4;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * -0.0020;
                            },
                            z: () => {
                                return 10;
                            },
                            y: () => {
                                return 1.5;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            // x: () => {
                            //     return 3;
                            // },
                            z: () => {
                                return Math.PI / 4;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 3.2,
                            y: 3.2,
                            z: 3.2,
                        },
                        "same"
                    )

                // --- Lights --- //

                // .to(
                //     this.rectLight1,
                //     {
                //         width: 0.4 * 4,
                //         height: 0.4 * 4,
                //     },
                //     "same"
                // )

                // -------------------- Third Section -------------------- //

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return - Math.PI / 8;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * 0.0006;
                            },
                            z: () => {
                                return 8;
                            },
                            y: () => {
                                return 0.5;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return - Math.PI / 6;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 2.5,
                            y: 2.5,
                            z: 2.5,
                        },
                        "same"
                    )

                // -------------------- Forth Section -------------------- //

                this.forthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".forth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 7;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return 2.5;
                            },
                            z: () => {
                                return 13;
                            },
                            y: () => {
                                return 0.5;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return Math.PI / 12;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 4.5,
                            y: 4.5,
                            z: 4.5,
                        },
                        "same"
                    )

                // -------------------- Fifth Section -------------------- //

                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 6;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * 0.0019;
                            },
                            z: () => {
                                return -4;
                            },
                            y: () => {
                                return 0.5;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return Math.PI / 15;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 2.5,
                            y: 2.5,
                            z: 2.5,
                        },
                        "same"
                    )

                // -------------------- Sixth Section -------------------- //

                this.sixthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".sixth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            y: () => {
                                return - Math.PI / 19;
                            },
                            z: () => {
                                return - Math.PI / 19;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * -0.0009;
                            },
                            y: () => {
                                return 0;
                            },
                            z: () => {
                                return -1;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return - Math.PI / 19;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 0.8,
                            y: 0.8,
                            z: 0.8,
                        },
                        "same"
                    )
            },

            //mobile
            "(max-width: 968px)": () => {
                // console.log("Fired Mobile");

                // ---- Resets ---- //

                this.room.scale.set(0.45, 0.45, 0.45);
                this.room.position.set(0, 0, 0);
                // this.rectLight1.width1 = 0.25
                // this.rectLight1.height1 = 0.25
                // this.rectLight2.width2 = 0.25
                // this.rectLight2.height2 = 0.25
                // this.rectLight3.width3 = 0.06
                // this.rectLight3.height3 = 0.06
                // this.rectLight4.width4 = 0.06
                // this.rectLight4.height4 = 0.06

                // -------------------- First Section -------------------- //

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.room.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5,
                    })

                // -------------------- Second Section -------------------- //

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 4;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * -0.0055;
                            },
                            y: () => {
                                return 1.5;
                            },
                            z: () => {
                                return 6;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return Math.PI / 4;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 3.2,
                            y: 3.2,
                            z: 3.2,
                        },
                        "same"
                    )

                // -------------------- Third Section -------------------- //

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return - Math.PI / 8;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * -0.004;
                            },
                            y: () => {
                                return 2;
                            },
                            z: () => {
                                return 9;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return - Math.PI / 6;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 2,
                            y: 2,
                            z: 2,
                        },
                        "same"
                    )

                // -------------------- Forth Section -------------------- //

                this.forthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".forth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 7;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return 4.2;
                            },
                            y: () => {
                                return 2;
                            },
                            z: () => {
                                return 13;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return Math.PI / 12;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 4,
                            y: 4,
                            z: 4,
                        },
                        "same"
                    )

                // -------------------- Fifth Section -------------------- //

                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            z: () => {
                                return Math.PI / 6;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * 0.0015;
                            },
                            y: () => {
                                return 0.05;
                            },
                            z: () => {
                                return -3;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return Math.PI / 15;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 2,
                            y: 2,
                            z: 2,
                        },
                        "same"
                    )


                // -------------------- Sixth Section -------------------- //

                this.sixthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".sixth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    // --- Camera --- //

                    .to(
                        this.camera.orthographicCamera.rotation,
                        {
                            y: () => {
                                return - Math.PI / 19;
                            },
                            z: () => {
                                return - Math.PI / 19;
                            },
                        },
                        "same"
                    )

                    // --- Room --- //

                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return this.sizes.width * 0.0028;
                            },
                            y: () => {
                                return 0;
                            },
                            z: () => {
                                return -1;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.rotation,
                        {
                            z: () => {
                                return - Math.PI / 19;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 0.4,
                            y: 0.4,
                            z: 0.4,
                        },
                        "same"
                    )
            },

            // all 
            "all": () => {
                // ScrollTriggers created here aren't associated with a particular media query,
                // so they persist.

                // ---- Progress Bars --- //

                this.section = document.querySelectorAll(".section");
                this.section.forEach((section) => { // Essentially we are looping through all sections and selecting progress-wrapper of them all  
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: { // Since it's an individual tween, there won't be any logical errors
                                trigger: section,
                                start: "top bottom",
                                // markers: "true",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });

                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                // markers: "true",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                // markers: "true",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });

                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                // markers: "true",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scurb: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // ---- Circle Animations ---- // 

                // -------------------- First Section -------------------- //

                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                // -------------------- Sixth Section -------------------- //

                this.secondCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".sixth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                // ---- Mini Table Animations ---- //

                // console.log(this.room.children);
                this.lastPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        start: "center center",
                        // end: "bottom bottom",
                        // scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                });

                // We didn't add tweens directly to the timeline because if we did, the order would be different every single time 
                // This is a inefficient way in respective to time and code performance because everytime we assign a tween to the asset we are looping through the object
                // Instead since we already have a loop in Room.JS so for tweening a asset we can ask that loop in Room.JS (Reference Object)

                this.room.children.forEach(child => { // Assigning a tween for each child
                    if (child.name === "Table") {
                        this.first = GSAP.to(child.position, { // Blender hack, or use console.log for position or lil GUI OR we can also use transform controls three.js
                            x: -0.25035,
                            y: 0.024414,
                            z: 0.839047, // Making it positive because it's flipped
                            ease: "back.out(4)",
                            duration: 0.5,
                        })
                    }
                    if (child.name === "Visiting_Card") {
                        this.second = GSAP.to(child.scale, {
                            x: 0.09,
                            y: 0.01,
                            z: 0.09,
                            ease: "back.out(4)",
                            duration: 0.5,
                        });
                    }
                    if (child.name === "Phone") {
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.5,
                        });
                    }
                    if (child.name === "Car") {
                        this.forth = GSAP.to(child.scale, { // Scale is relative to scene, scene is relative to World
                            x: 0.0007,
                            y: 0.0007,
                            z: 0.0007,
                            ease: "back.out(2)",
                            duration: 0.5,
                        });
                    }
                });
                this.lastPartTimeline.add(this.first);
                this.lastPartTimeline.add(this.second, "-=0.2");
                this.lastPartTimeline.add(this.third, "-=0.2");
                this.lastPartTimeline.add(this.forth, "-=0.2");

            }
        });

    }

    resize() { }

    update() {

    }
}


// ------ TESTING SECTION FOR CONTROLS ------ ////
// export default class Controls {
//     constructor() {
//         this.experience = new Experience();
//         this.scene = this.experience.scene;
//         this.resources = this.experience.resources;
//         this.time = this.experience.time;
//         this.camera = this.experience.camera;

//         this.progress = 0;
//         this.dummyCurve = new THREE.Vector3(0, 0, 0);

//         this.lerp = {
//             current: 0,
//             target: 0,
//             ease: 0.1,
//         }

//         this.position = new THREE.Vector3(0, 0, 0);
//         this.lookAtPosition = new THREE.Vector3(0, 0, 0);

//         this.directionalVector = new THREE.Vector3(0, 0, 0); // Using vector for making the camera look to our likings
//         this.StaticVector = new THREE.Vector3(0, 1, 0); // For example, cross product of vectors: We get camera angle
//         this.crossVector = new THREE.Vector3(0, 0, 0); // that is always on one side depending on static vector

//         this.setPath();
//         this.onWheel();

//     }

//     setPath() {
//         this.curve = new THREE.CatmullRomCurve3( // Takes in Array of vector points
//             [
//                 new THREE.Vector3(-5, 0, 0), // All determine where the curve will go
//                 new THREE.Vector3(0, 0, -5),
//                 new THREE.Vector3(5, 12, 0),
//                 new THREE.Vector3(0, 5, 5),
//                 new THREE.Vector3(15, 0, 5),
//                 new THREE.Vector3(0, 5, 5),
//                 new THREE.Vector3(-12, 6, 5),
//             ],
//             true); // To make boolean value true, false by default. Helps to connect the whole curve

//         const points = this.curve.getPoints(50);
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);

//         const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

//         // Create the final object to add to the scene
//         const curveObject = new THREE.Line(geometry, material);
//         this.scene.add(curveObject);
//     }

//     onWheel() {
//         window.addEventListener("wheel", (w) => {
//             console.log(w);
//             if (w.deltaY > 0) {
//                 this.lerp.target += 0.01;
//                 this.back = false; // This is to change the direction of scroll
//             } else {
//                 this.lerp.target -= 0.01;
//                 this.back = true;
//                 // if (this.progress < 0) {
//                 //     this.progress = 1;
//                 // }
//             }
//         })
//     }

//     resize() { }

//     update() {
//         this.lerp.current = GSAP.utils.interpolate( // Lerping technique using GSAP
//             this.lerp.current,
//             this.lerp.target,
//             this.lerp.ease
//         );

//         this.curve.getPointAt(this.lerp.current % 1, this.position); // Gets point on the curve and copies in target vector
//         this.camera.orthographicCamera.position.copy(this.position);

//         this.directionalVector.subVectors( // To get the directional vector, you need to subtract vectors
//             this.curve.getPointAt((this.lerp.current % 1) + 0.00001), // You added coz we need the next point and lookat, coz we need the point
//             this.position // Subtracting next point in the curve, with current point
//         );
//         this.directionalVector.normalize();
//         this.crossVector.crossVectors(
//             this.directionalVector,
//             this.StaticVector,
//         );
//         this.crossVector.multiplyScalar(100000);
//         this.camera.orthographicCamera.lookAt(0, 0, 0);


//         // if (this.back) { // If forward or backward
//         //     this.lerp.target -= 0.001; // Automatic + for going front and - for backwards
//         // } else {
//         //     this.lerp.target += 0.001;
//         // }
//         // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current); // Clamping to certain values
//         // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target); // To avoid the use of modolus

//         // this.curve.getPointAt(this.lerp.current, this.position) // .getPointAt Takes float, position on curve (vector 3)
//         // // We use modulus if it goes beyond 1 then we get an error since its Range is 0 - 1

//         // this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);
//         // // console.log(this.progress, this.progress % 1)
//         // this.camera.orthographicCamera.position.copy(this.position);
//         // // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
//     }
// }