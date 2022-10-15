import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import { RGBAFormat } from "three";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: "rgb(255, 202, 117)",
            side: THREE.DoubleSide, // Adds texture to both sides of the floor
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.x = -Math.PI / 2
        this.plane.position.y = -0.69;
        this.plane.receiveShadow = true;

        this.scene.add(this.plane);

    }

    resize() { }

    update() { }
}