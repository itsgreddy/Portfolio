import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room; // Getting object and using dot notation to get the room
        this.actualRoom = this.room.scene;

        this.lerp = { // Lerping, covering less dist in same time quanta. Decreasing the speed of the transition
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        this.onMouseMove();

        // camera.position.z = 5; // You can't use this line here, coz you have another camera setup already
        // Or else you need to call it here
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
        });

        const width = 0.5;
        const height = 0.5;
        const intensity = 4;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(0, 0, 0); // Location from blender | The Z axis in ThreeJS is Y axis in Blender 
        this.actualRoom.add(rectLight)

        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.8, 0.8, 0.8) // To scale the room 
        // this.actualRoom.rotation.y = Math.pi // For rotation
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