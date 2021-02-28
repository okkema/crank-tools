import { ArraySchema } from 'joi';

export interface ICloudData {
    promise: Promise<any>;
    filename: string;
    schema: ArraySchema;
    data?: any[];
}
