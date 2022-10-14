import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({ container: document.querySelector('.hero-main') }); // Creating new GUI
        // using the container and passing it as a parameter to change the position | Avaliable in documentation

        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 4,
        }

        this.setSunLight();
        // this.setGUI();
    }

    setGUI() { // Selecting colorObj, hence the passing
        this.gui.addColor(this.obj, "colorObj").onChange(() => { // Arrow fucntion to keep the context
            this.sunLight.color.copy(this.obj.colorObj);  // Copy is a threeJS method
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => { // Min = 0 , Max = 10
            this.sunLight.intensity = this.obj.intensity; // Can't use copy here because it doesn't work on intensity
            this.ambientLight.intensity = this.obj.intensity;
        })

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
                r: 0.17254901960784313,                // as mentioned in the documentation
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,                // as mentioned in the documentation
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunLight, {
                intensity: 1,
            });
            GSAP.to(this.ambientLight, {
                intensity: 3,
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
            GSAP.to(this.sunLight, {
                intensity: 4,
            });
            GSAP.to(this.ambientLight, {
                intensity: 2,
            });
        }
    }

    resize() { }

    update() { }
}