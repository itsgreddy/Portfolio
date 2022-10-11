// This is to load all the resources and store them 
// So, whenever we need access anything we access if from resources

import * as THREE from "three";

import EventEmitter from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import Experience from "../Experience";


export default class Resources extends EventEmitter {
    constructor(Assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.Assets = Assets; // Setting class variable

        this.items = {} // An object to hold all our loaded items 
        // Therefore, we will import Resources into other classes where we need them and use this object

        this.queue = this.Assets.length; // Equals to number of items in Assets
        this.loaded = 0;

        this.setLoader();
        this.startLoading();
    }

    setLoader() {
        this.loaders = {}; // Loaders object which contains loaders
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader(); // Since we exported with compression in Blender (Draco Mesh Compression)
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader); // Assigning draco Loader -> gltf Loader
    }

    startLoading() {
        for (const asset of this.Assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            }
            // else if (asset.type === "videoTexture") {
            //     this.video = {}; // Holds HTML Part
            //     this.videoTexture = {}; // Holds Three JS Configuration

            //     this.video[asset.name] = document.createElement("video"); // Key value Pairs
            //     this.video[asset.name].src = asset.path;
            //     this.video[asset.name].muted = true;
            //     this.video[asset.name].playsInLine = true;
            //     this.video[asset.name].autoplay = true;
            //     this.video[asset.name].loop = true;
            //     this.video[asset.name].play();

            //     this.videoTexture[asset.name] = new THREE.VideoTexture(
            //         this.video[asset.name]
            //     );
            //     this.videoTexture[asset.name].flipY = true; // Depending on UVs of the Model
            //     this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
            //     this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
            //     this.videoTexture[asset.name].generateMipmaps = false;
            //     this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

            //     this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            // }
        }
    }

    singleAssetLoaded(asset, file) // Creates key value pairs and makes life easier
    {
        this.items[asset.name] = file;
        this.loaded++;

        // console.log("Assets are loading");
        if (this.loaded === this.queue) // If true, all our Assets are loaded
        {
            // console.log("All assets are done");
            this.emit("ready"); // When it's ready, then we create the world
        }
    }
}
