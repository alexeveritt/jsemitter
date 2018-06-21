import {EventEmitter} from 'event-emitter';

export class Clock extends EventEmitter {
    constructor() {
        super();
        (<any>window).setInterval(this.tickTock, 1000);
    }

    private tickTock(): void {
        this.emit('onTick', new Date())
    }
}
