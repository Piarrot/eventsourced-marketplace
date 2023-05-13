export interface Command<K extends string, T> {
    userId: string;
    type: K;
    timestamp: number;
    payload: T;
}
