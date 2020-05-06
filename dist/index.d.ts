export declare class JSEmitter {
    private events;
    readonly count: number;
    functionCount(key: string): number;
    on(key: string, func: (data?: any) => void): number;
    once(key: string, func: (data?: any) => void): number;
    many(key: string, func: (data?: any) => void, count: number): number;
    emit(key: string, data?: any): void;
    off(key: string, func?: (data?: any) => void): void;
    offAll(): void;
    offKey(key: string): void;
    private findEvent;
    private removeEvents;
    private addEvent;
}
