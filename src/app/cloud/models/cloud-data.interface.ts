import { ArraySchema } from 'joi';

export interface CloudData {
    promise: Promise<any>;
    filename: string;
    schema: ArraySchema;
    data?: any[];
}
