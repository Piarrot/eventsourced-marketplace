export interface ITimeProvider {
    currentTimestamp(): Promise<number>;
}
