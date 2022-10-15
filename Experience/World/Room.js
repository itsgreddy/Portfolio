import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"
import GUI from "lil-gui";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room; // Getting object and using dot notation to get the room
        this.actualRoom = this.room.scene;

        // this.gui = new GUI({ container: document.querySelector('.hero-second') });

        this.lerp = { // Lerping, covering less dist in same time quanta. Decreasing the speed of the transition
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        this.onMouseMove();
        // this.setGUI();

        // camera.position.z = 5; // You can't use this line here, coz you have another camera setup already
        // Or else you need to call it here
    }

    setGUI() {
        // ---- LIGHT 1 ---- //

        // const rectLightHelper = new RectAreaLightHelper(this.rectLight1);
        // this.rectLight1.add(rectLightHelper);

        this.gui.add(this.rectLight1.position, 'x').min(-50).max(50).step(0.2).name('light1 position x');
        this.gui.add(this.rectLight1.position, 'y').min(-50).max(50).step(0.2).name('light1 position y');
        this.gui.add(this.rectLight1.position, 'z').min(-50).max(50).step(0.2).name('light1 position z');

        this.gui.add(this.rectLight1.rotation, 'x').min(-50).max(50).step(0.2).name('light1 rotation x');
        this.gui.add(this.rectLight1.rotation, 'y').min(-50).max(50).step(0.2).name('light1 rotation y');
        this.gui.add(this.rectLight1.rotation, 'z').min(-50).max(50).step(0.2).name('light1 rotation z');

        // ---- LIGHT 2 ---- //

        // const rectLightHelper = new RectAreaLightHelper(this.rectLight2);
        // this.rectLight2.add(rectLightHelper);

        this.gui.add(this.rectLight2.position, 'x').min(-50).max(50).step(0.2).name('light2 position x');
        this.gui.add(this.rectLight2.position, 'y').min(-50).max(50).step(0.2).name('light2 position y');
        this.gui.add(this.rectLight2.position, 'z').min(-50).max(50).step(0.2).name('light2 position z');

        this.gui.add(this.rectLight2.rotation, 'x').min(-50).max(50).step(0.2).name('light2 rotation x');
        this.gui.add(this.rectLight2.rotation, 'y').min(-50).max(50).step(0.2).name('light2 rotation y');
        this.gui.add(this.rectLight2.rotation, 'z').min(-50).max(50).step(0.2).name('light2 rotation z');

        // ---- LIGHT 3 ---- //

        // const rectLightHelper = new RectAreaLightHelper(this.rectLight3);
        // this.rectLight2.add(rectLightHelper);

        this.gui.add(this.rectLight3.position, 'x').min(-50).max(50).step(0.2).name('light3 position x');
        this.gui.add(this.rectLight3.position, 'y').min(-50).max(50).step(0.2).name('light3 position y');
        this.gui.add(this.rectLight3.position, 'z').min(-50).max(50).step(0.2).name('light3 position z');

        this.gui.add(this.rectLight3.rotation, 'x').min(-50).max(50).step(0.2).name('light3 rotation x');
        this.gui.add(this.rectLight3.rotation, 'y').min(-50).max(50).step(0.2).name('light3 rotation y');
        this.gui.add(this.rectLight3.rotation, 'z').min(-50).max(50).step(0.2).name('light3 rotation z');

        // ---- LIGHT 4 ---- //

        // const rectLightHelper = new RectAreaLightHelper(this.rectLight4);
        // this.rectLight2.add(rectLightHelper);

        this.gui.add(this.rectLight4.position, 'x').min(-50).max(50).step(0.2).name('light4 position x');
        this.gui.add(this.rectLight4.position, 'y').min(-50).max(50).step(0.2).name('light4 position y');
        this.gui.add(this.rectLight4.position, 'z').min(-50).max(50).step(0.2).name('light4 position z');

        this.gui.add(this.rectLight4.rotation, 'x').min(-50).max(50).step(0.2).name('light4 rotation x');
        this.gui.add(this.rectLight4.rotation, 'y').min(-50).max(50).step(0.2).name('light4 rotation y');
        this.gui.add(this.rectLight4.rotation, 'z').min(-50).max(50).step(0.2).name('light4 rotation z');
    }

    setModel() {
        this.actualRoom.children.forEach(child => { // For shadows
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) { // Since with normal method shadows werent visible for groups
                child.children.forEach((groupchild) => { // This is the updated method for shadows
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // console.log(child);
        });

        // console.log(this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.8, 0.8, 0.8); // To scale the room 
        // this.actualRoom.rotation.y = Math.pi // For rotation

        // ---- LIGHT 1 ---- //

        this.width1 = 0.4;
        this.height1 = 0.4;
        this.intensity1 = 11;

        this.rectLight1 = new THREE.RectAreaLight(0xffffff, this.intensity1, this.width1, this.height1);
        this.rectLight1.position.set(1.2, 1.2, -0.4); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.rectLight1.rotation.set(0, 0.2, 0); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.actualRoom.add(this.rectLight1)

        // ---- LIGHT 2 ---- //

        this.width2 = 0.4;
        this.height2 = 0.4;
        this.intensity2 = 11;

        this.rectLight2 = new THREE.RectAreaLight(0xffffff, this.intensity2, this.width2, this.height2);
        this.rectLight2.position.set(-0.8, 1, -0.2); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.rectLight2.rotation.set(-0.2, 0.4, 0); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.actualRoom.add(this.rectLight2)

        // ---- LIGHT 3 ---- //

        this.width3 = 0.1;
        this.height3 = 0.1;
        this.intensity3 = 120;

        this.rectLight3 = new THREE.RectAreaLight(0xffffff, this.intensity3, this.width3, this.height3);
        this.rectLight3.position.set(-1.2, -0.4, -1.2); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.rectLight3.rotation.set(0.8, 1.2, 0); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.actualRoom.add(this.rectLight3)

        // ---- LIGHT 4 ---- //

        this.width4 = 0.1;
        this.height4 = 0.1;
        this.intensity4 = 120;

        this.rectLight4 = new THREE.RectAreaLight(0xffffff, this.intensity4, this.width4, this.height4);
        this.rectLight4.position.set(1.2, -0.2, -1.2); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.rectLight4.rotation.set(-2, -0.4, 0); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.actualRoom.add(this.rectLight4)

        // this.roomChildren["rectLight1", "rectLight2", "rectLight3", "rectLight4"] = rectLight;
    }

    onMouseMove() {
        window.addEventListener("mousemove", (m) => {

            this.rotation =
                ((m.clientX - window.innerWidth / 2) / window.innerWidth) * 2; // For reducing it to -1 -> 1
            // console.log(m.clientX, this.rotation);
            // 1. 0 -> 1200 | ClientX Value
            // 2. 1200 / 2 : 600 | Window.innerwidth Value
            // 3. -600 -> 600 | Total value of X (Rotation)
            // 4. -0.5 -> 0.5 | Dividing by window.innerwidth
            // 5. -1 -> 1 | Multiplying by 2

            this.lerp.target = this.rotation * 0.09;
        });
    }

    resize() { }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        // this.actualRoom.rotation.x = this.lerp.current;
        this.actualRoom.rotation.x = this.lerp.current;
        this.actualRoom.rotation.y = this.lerp.current;
    }
}