import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunLight();
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#FFFFFF", 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048); // Setting Quality
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera); // Shadow Camera Helper
        // this.scene.add(helper);
        this.sunLight.position.set(-1.5, 17, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#FFFFFF", 2); // Adding another light, to brighten the shadows
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) { // Grabbing the parameter
        console.log(this.sunLight);
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, { // Converting the RGB to either 1 or 0 by dividing, since that's what is accepted by threeJS 
                r: 0 / 255,                // as mentioned in the documentation
                g: 0 / 255,
                b: 0 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0 / 255,
                g: 0 / 255,
                b: 0 / 255,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
        }
    }

    resize() { }

    update() { }
}