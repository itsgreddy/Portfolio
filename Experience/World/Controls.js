import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

// ------ TESTING SECTION FOR CONTROLS ------ ////
export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.progress = 0;
        this.dummyCurve = new THREE.Vector3(0, 0, 0);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.position = new THREE.Vector3(0, 0, 0);
        this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        this.directionalVector = new THREE.Vector3(0, 0, 0); // Using vector for making the camera look to our likings
        this.StaticVector = new THREE.Vector3(0, 1, 0); // For example, cross product of vectors: We get camera angle
        this.crossVector = new THREE.Vector3(0, 0, 0); // that is always on one side depending on static vector

        this.setPath();
        this.onWheel();

    }

    setPath() {
        this.curve = new THREE.CatmullRomCurve3( // Takes in Array of vector points
            [
                new THREE.Vector3(-5, 0, 0), // All determine where the curve will go
                new THREE.Vector3(0, 0, -5),
                new THREE.Vector3(5, 12, 0),
                new THREE.Vector3(0, 5, 5),
                new THREE.Vector3(15, 0, 5),
                new THREE.Vector3(0, 5, 5),
                new THREE.Vector3(-12, 6, 5),
            ],
            true); // To make boolean value true, false by default. Helps to connect the whole curve

        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final object to add to the scene
        const curveObject = new THREE.Line(geometry, material);
        this.scene.add(curveObject);
    }

    onWheel() {
        window.addEventListener("wheel", (e) => {
            console.log(e);
            if (e.deltaY > 0) {
                this.lerp.target += 0.01;
                this.back = false; // This is to change the direction of scroll
            } else {
                this.lerp.target -= 0.01;
                this.back = true;
                // if (this.progress < 0) {
                //     this.progress = 1;
                // }
            }
        })
    }

    resize() { }

    update() {
        this.lerp.current = GSAP.utils.interpolate( // Lerping technique using GSAP
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.curve.getPointAt(this.lerp.current % 1, this.position); // Gets point on the curve and copies in target vector
        this.camera.orthographicCamera.position.copy(this.position);

        this.directionalVector.subVectors( // To get the directional vector, you need to subtract vectors
            this.curve.getPointAt((this.lerp.current % 1) + 0.00001), // You added coz we need the next point and lookat, coz we need the point
            this.position // Subtracting next point in the curve, with current point
        );
        this.directionalVector.normalize();
        this.crossVector.crossVectors(
            this.directionalVector,
            this.StaticVector,
        );
        this.crossVector.multiplyScalar(100000);
        this.camera.orthographicCamera.lookAt(0, 0, 0);


        // if (this.back) { // If forward or backward
        //     this.lerp.target -= 0.001; // Automatic + for going front and - for backwards
        // } else {
        //     this.lerp.target += 0.001;
        // }
        // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current); // Clamping to certain values
        // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target); // To avoid the use of modolus

        // this.curve.getPointAt(this.lerp.current, this.position) // .getPointAt Takes float, position on curve (vector 3)
        // // We use modulus if it goes beyond 1 then we get an error since its Range is 0 - 1

        // this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);
        // // console.log(this.progress, this.progress % 1)
        // this.camera.orthographicCamera.position.copy(this.position);
        // // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }
}