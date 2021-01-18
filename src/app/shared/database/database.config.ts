import { DBConfig } from "ngx-indexed-db";
import { StaffMetadata } from "src/app/staff/models";

const DATABASE_NAME: string = 'crank-tools';
const DATABASE_VERSION: number = 1;

/**
 * Version history:
 * 
 * 1 - Add staff object store
 */
export const dbConfig: DBConfig  = {
    name: DATABASE_NAME,
    version: DATABASE_VERSION,
    objectStoresMeta: [
        StaffMetadata,
    ]
  };