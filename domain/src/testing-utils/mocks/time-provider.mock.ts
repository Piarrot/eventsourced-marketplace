import { ITimeProvider } from "../../providers/time-provider";

export class TimeProviderMock implements ITimeProvider {
    currentTimestamp() {
        return this.timestamp;
    }

    /// Mocking utilities
    private timestamp: number;
    constructor() {
        this.timestamp = Date.now();
    }
    advanceTimeBy(hours: number, minutes: number, seconds: number) {
        this.timestamp += hours * 60 * 60 * 1000;
        this.timestamp += minutes * 60 * 1000;
        this.timestamp += seconds * 1000;
    }
}
