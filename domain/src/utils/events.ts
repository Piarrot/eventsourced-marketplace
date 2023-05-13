export interface Event<K extends string, T> {
    userId: string;
    type: K;
    timestamp: number;
    payload: T;
}

export function createEvent<K extends string, T>(
    type: K,
    userId: string,
    payload: T
): Event<K, T> {
    return {
        userId,
        type,
        timestamp: Date.now(),
        payload,
    };
}
