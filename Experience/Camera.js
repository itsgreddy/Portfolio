// Camera needs Scene, Sizes and a tool called Orbit Control which needs Canvas
// So, export from experience since it has all 4 of it for us

import * as THREE from 'three';
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AxesHelper } from 'three';
export default class Camera {
    constructor() {
        this.experience = new Experience(); //Singleton Pattern
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPrespectiveCamera(); // We generally need only one camera
        this.createOrthographicCamera(); // But, these will be helpful during pathing  
        this.setOrbitControls();
    }

    createPrespectiveCamera() {
        this.prespectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.prespectiveCamera)
        this.prespectiveCamera.position.z = 5;
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

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const AxesHelper = new THREE.AxesHelper(5);
        this.scene.add(AxesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.prespectiveCamera, this.canvas); // Giving it to camera and canvas
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
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
        this.controls.update();
    }
}