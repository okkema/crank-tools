import { ArraySchema } from 'joi';

export interface ICloudSync<T> {
    filename: string;
    schema: ArraySchema;
    export(): Promise<T[]>;
    import(data: T[]): Promise<boolean>;
};
