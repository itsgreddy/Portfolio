// This is to load all the resources and store them 
// So, whenever we need access anything we access if from resources

import EventEmitter from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import Experience from "../Experience";
import { urlToHttpOptions } from "url";

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
        this.loaders.dracoLoader.setDecoderPath("/public/draco");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader); // Assigning draco Loader -> gltf Loader
    }

    startLoading() {
        for (const Asset of this.Assets) {
            if (Asset.type === "glbModel") {
                this.loaders.gltfLoader.load(Asset.path, (file) => {
                    this.singleAssetLoaded(Asset, file);
                });
            }
            // else if (Asset.type === "videoTexture") {
            //     this.video = {}; // Holds HTML Part
            //     this.videoTexture = {}; // Holds Three JS Configuration

            //     this.video[Asset.name] = document.createElement("video"); // Key value Pairs
            //     this.video[Asset.name].src = Asset.path;
            //     this.video[Asset.name].playsInLine = true;
            //     this.video[Asset.name].autoplay = true;
            //     this.video[Asset.name].loop = true;
            //     this.video[Asset.name].play();

            //     this.videoTexture[Asset.name] = new THREE.VideoTexture(
            //         this.video[Asset.name]
            //     );
            //     this.videoTexture[Asset.name].flipY = true; // Depending on UVs of the Model
            //     this.videoTexture[Asset.name].minFilter = THREE.NearestFilter;
            //     this.videoTexture[Asset.name].magFilter = THREE.NearestFilter;
            //     this.videoTexture[Asset.name].generateMipmaps = false;
            //     this.videoTexture[Asset.name].encoding = THREE.sRGBEncoding;
            // }
        }
    }

    singleAssetLoaded() // This function creates key value pairs and makes life easier
    {
        this.items[Asset.name] = file;
        this.loaded++;
        if (this.loaded === this.queue) // If true, all our assets are loaded
        {
            this.emit("ready");
        }
    }
}