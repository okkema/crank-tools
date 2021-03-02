import { ArraySchema, symbol } from 'joi';

export interface ICloudSyncService<T> {
    filename: string;
    schema: ArraySchema;
    dump(): Promise<T[]>;
    load(data: T[]): Promise<boolean>;
};

export const TOKEN = Symbol.for('ICloudSyncService');
