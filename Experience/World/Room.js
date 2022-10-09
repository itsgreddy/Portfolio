import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room; // Getting object and using dot notation to get the room
        this.actualRoom = this.room.scene;

        this.setModel();

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

            console.log(child)
        });

        this.scene.add(this.actualRoom);
        // this.actualRoom.scale.set(0.11, 0.11, 0.11) // To scale the room 
        // this.actualRoom.rotation.y = Math.pi // For rotation
    }

    resize() { }

    update() { }
}