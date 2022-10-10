import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";


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

        this.setPath();
        this.onWheel();

    }

    setPath() {
        this.curve = new THREE.CatmullRomCurve3 // Takes in Array of vector points
            ([
                new THREE.Vector3(-10, 0, 10), // All determine where the curve will go
                new THREE.Vector3(-5, 5, 5),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(5, -5, 5),
                new THREE.Vector3(10, 0, 10)
            ], true); // To make boolean value true, false by default. Helps to connect the whole curve

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

        if (this.back) { // If forward or backward
            this.lerp.target -= 0.001; // Automatic + for going front and - for backwards
        } else {
            this.lerp.target += 0.001;
        }
        this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current); // Clamping to certain values
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target); // To avoid the use of modolus

        this.curve.getPointAt(this.lerp.current, this.position) // .getPointAt Takes float, position on curve (vector 3) 
        // We use modulus if it goes beyond 1 then we get an error since its Range is 0 - 1

        this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);
        // console.log(this.progress, this.progress % 1)
        this.camera.orthographicCamera.position.copy(this.position);
        this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }
}