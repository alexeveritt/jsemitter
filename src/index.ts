export class JSEmitter {
    private events: IEvent[] = [];

    public get count() {
        return this.events ? this.events.length : 0
    }

    public functionCount(key: string) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        let evt = this.findEvent(key);
        if (evt && evt.funcs) {
            return evt.funcs.length;
        }
        return 0;
    }

    public on(key: string, func: (data?: any) => void): number {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, 0);
    }

    public once(key: string, func: (data?: any) => void): number {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, 1);
    }

    public many(key: string, func: (data?: any) => void, count: number): number {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        return this.addEvent(key, func, count);
    }

    public emit(key: string, data?: any): void {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        let evt = this.findEvent(key);

        if (evt) {
            let args = null;
            if (arguments.length > 1) {
                args = [].splice.call(arguments, 0);
                args = (<any>args).splice(1);
            }

            for (let i = 0; i < evt.funcs.length; i++) {
                evt.funcs[i].apply(this, args);
            }

            if (evt.count > 0 && --evt.count === 0) {
                // remove event
                this.removeEvents(key);
            }
        }
    }

    public off(key: string, func?: (data?: any) => void): void {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        this.removeEvents(key, func);
    };

    public offAll(): void {
        this.removeEvents();
    };

    public offKey(key: string) {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        this.removeEvents(key);
    };

    private findEvent(key: string): IEvent | null {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }

        let foundItem: IEvent = {key: '', funcs: [], count: 0};

        this.events.forEach(function (itm) {
            if (itm.key === key) {
                foundItem = itm;
            }
        });

        return foundItem.key ? foundItem : null;
    }

    private removeEvents(key?: string, func?: any): number {
        let evts = this.events;

        if (!key) {
            // remove all the events
            evts.splice(0, evts.length);
        } else {
            if (!func) {
                // remove all items associated with key
                for (let i = evts.length - 1; i > -1; i--) {
                    if (evts[i].key === key) {
                        evts.splice(i, 1);
                    }
                }
            }

            let evt = this.findEvent(key);
            if (evt) {
                for (let i = evt.funcs.length-1 ; i > -1 ;i--){
                    if (evt.funcs[i] === func) {
                        evt.funcs.splice(i, 1);
                    }
                }
            }
        }
        return evts.length;
    };

    private addEvent(key: string, func: () => void, count: number): number {
        if (!key) {
            throw new Error('Invalid Parameter, key missing');
        }
        let evt = this.findEvent(key);
        if (!evt) {
            evt = {key, funcs: [], count: count};
            this.events.push(evt);
        } else {
            for (let i = 0; i < evt.funcs.length; i++) {
                if (evt.funcs[i] === func) {
                    // function already bound to emitter
                    return evt.funcs.length;
                }
            }
        }

        evt.funcs.push(func);
        return evt.funcs.length;
    };
}
