import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

import { ScrollTrigger } from "gsap/ScrollTrigger"

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
        this.room.children.forEach(child => { // Scalling up the lights
            if (child.type === "RectAreaLight") { // ThreeJS provides the type to us for all the assets
                this.rectLight1 = child;
                // this.rectLight2 = child;
                // this.rectLight3 = child;
                // this.rectLight4 = child;
            }
        })

        // this.gui = new GUI({ container: document.querySelector('.hero-main') });

        GSAP.registerPlugin(ScrollTrigger); // Registering plugin

        this.setScrollTrigger();
        // this.setGUI();
    }

    // setGUI() {
    //     this.gui.add(this.camera.position, 'x').min(-50).max(50).step(0.2).name('camera position x');
    //     this.gui.add(this.camera.position, 'y').min(-50).max(50).step(0.2).name('camera position y');
    //     this.gui.add(this.camera.position, 'z').min(-50).max(50).step(0.2).name('camera position z');
    // }

    setScrollTrigger() {

        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 969px)": () => { // If we use regular function we lose context, thats why we use arrow fucntion to save context and we can access class variables
                console.log("Fired Desktop");

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
                                return this.sizes.width * 0.0015; // Providing a fucntional wrap
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
                                return this.sizes.width * -0.0025;
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
                        // markers: true,
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
                                return this.sizes.width * 0.0003;
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
                            // x: () => {
                            //     return 3;
                            // },
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
                        // markers: true,
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
                            // x: () => {
                            //     return 3;
                            // },
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
                        // markers: true,
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
                                return this.sizes.width * 0.0017;
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
                            // x: () => {
                            //     return 3;
                            // },
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
                        // markers: true,
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
                                return this.sizes.width * -0.0010;
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
                            // x: () => {
                            //     return 3;
                            // },
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
            "(max-width: 968px)": () => { // Matches our mediaquery in CSS
                console.log("Fired Mobile");
            },

            // all 
            "all": function () {
                // ScrollTriggers created here aren't associated with a particular media query,
                // so they persist.
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