interface IEvent {
    key: string;
    funcs: { (): void }[];
    count: number;
}
