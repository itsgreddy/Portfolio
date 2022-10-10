import * as THREE from "three";
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
                this.progress += 0.1;
            } else {
                this.progress -= 0.1;
                if (this.progress < 0) {
                    this.progress = 1;
                }
            }
        })
    }

    resize() { }

    update() {
        this.curve.getPointAt(this.progress % 1, this.dummyCurve) // .getPointAt Takes float, position on curve (vector 3) 
        // We used modulus coz if it goes beyond 1 then we get an error since its Range is 0 - 1
        // this.progress += 0.001; // + for going front and - for backwards

        // console.log(this.progress, this.progress % 1)
        this.camera.orthographicCamera.position.copy(this.dummyCurve);
    }
}