import {JSEmitter} from "../src";


export class Clock extends JSEmitter {
    constructor() {
        super();
        (<any>window).setInterval(this.tickTock, 1000);
    }

    private tickTock(): void {
        this.emit('onTick', new Date())
    }
}
