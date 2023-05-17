import { ITimeProvider } from "mercadoliebre-domain";

export class TimeProvider implements ITimeProvider {
    currentTimestamp(): number {
        return Date.now();
    }
}
