// We are using Singleton Pattern here
import * as THREE from "three";
import Sizes from "./Utils/Sizes";

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance //If It's avaliable then return it or else make it by going to this and then in next if look return it
        }
        Experience.instance = this
        this.canvas = canvas; // Setting variable named canvas to the canvas we passed in
        this.scene = new THREE.Scene();
        this.sizes = new Sizes(); // 
    }
}