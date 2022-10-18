import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import { RGBAFormat } from "three";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry(5, 32);
        const material1 = new THREE.MeshStandardMaterial({ color: 0x815B5B });
        const material2 = new THREE.MeshStandardMaterial({ color: 0xFBF4E4 });
        this.circleFirst = new THREE.Mesh(geometry, material1);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleFirst.position.y = - 0.68;
        this.circleSecond.position.y = - 0.67;
        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleFirst.rotation.x = this.circleSecond.rotation.x = -Math.PI / 2; // This is so that we have it horizontally and the color is facing towards us
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = true;
        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
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