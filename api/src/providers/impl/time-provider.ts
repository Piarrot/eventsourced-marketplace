import { ITimeProvider } from "marketplace-domain";

export class TimeProvider implements ITimeProvider {
    currentTimestamp(): number {
        return Date.now();
    }
}
