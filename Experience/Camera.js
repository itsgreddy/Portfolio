// Camera needs Scene, Sizes and a tool called Orbit Control which needs Canvas
// So, export from experience since it has all 4 of it for us

import * as THREE from 'three';
import Experience from "./Experience";
export default class Camera {
    constructor() {
        this.experience = new Experience(); //Singleton Pattern
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPrespectiveCamera(); // We generally need only one camera
        this.createOrthographicCamera(); // But, these will be helpful during pathing  
    }

    createPrespectiveCamera() {
        this.prespectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.prespectiveCamera)
    }

    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera);
    }

    resize() {
        // Prespective Camera on ResizeA
        this.prespectiveCamera.aspect = this.sizes.aspect;
        this.prespectiveCamera.updateProjectionMatrix();

        // Orthographic Camera on ResizeA
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom - this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {

    }
}