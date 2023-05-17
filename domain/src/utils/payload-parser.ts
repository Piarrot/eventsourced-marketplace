import { ResultRecord } from ".";

export type PayloadParser<T> = (payload: any) => ResultRecord<T, string>;
