import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super(); // Calling super constructor because we are use EventEmitter which is present alreadt in node modules
        this.start = Date.now(); // Initiated
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; // Time between each frame

        this.update();
    }

    update() {
        const currentTime = Date.now(); // We get time one after "this.current" between the frames
        this.delta = currentTime - this.current; // So, just subtract them to get the delta time between each frame
        this.current = currentTime; // Again, we need to update it back because it need to match on each window request
        this.elapsed = this.current - this.start;

        this.emit("update"); // Whenever time is updated, emit this event 
        window.requestAnimationFrame(() => this.update());

    }
}