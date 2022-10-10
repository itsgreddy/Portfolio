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
        this.prespectiveCamera.position.x = 29;
        this.prespectiveCamera.position.y = 16;
        this.prespectiveCamera.position.z = 13;
    }

    createOrthographicCamera() {
        // this.orthographicCamera = new THREE.OrthographicCamera(
        //     (-this.sizes.aspect * this.sizes.frustrum) / 2,
        //     (this.sizes.aspect * this.sizes.frustrum) / 2,
        //     this.sizes.frustrum / 2,
        //     -this.sizes.frustrum / 2,
        //     -10,
        //     10
        // );

        this.orthographicCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );

        console.log(this.orthographicCamera); // We found that bottom is NaN, hence the error

        this.scene.add(this.orthographicCamera);

        this.helper = new THREE.CameraHelper(this.orthographicCamera); // Orthograhic Camera Helper
        this.scene.add(this.helper); // For this to work, we need to manage few things in update

        const size = 20; // These help with the grid
        const divisions = 20;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const AxesHelper = new THREE.AxesHelper(5);
        this.scene.add(AxesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.prespectiveCamera, this.canvas); // Giving it to camera and canvas
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize() {
        // Prespective Camera on Resize
        this.prespectiveCamera.aspect = this.sizes.aspect;
        this.prespectiveCamera.updateProjectionMatrix();

        // Orthographic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom - this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.prespectiveCamera.position); // To check and set up the model
        this.controls.update();
        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position); // Helpers position to copy the camera's postion
        this.helper.rotation.copy(this.orthographicCamera.rotation); // and camera's rotation


    }
}