import { ArraySchema } from 'joi';

export interface ICloudSync<T> {
    filename: string;
    schema: ArraySchema;
    dump(): Promise<T[]>;
    load(data: T[]): Promise<boolean>;
};
