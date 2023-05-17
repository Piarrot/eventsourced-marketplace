import { ResultRecord } from "./index.js";

export type PayloadParser<T> = (payload: any) => ResultRecord<T, string>;
