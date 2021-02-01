import { DBConfig } from 'ngx-indexed-db';
import { STAFF_METADATA } from 'src/app/staff/models';

const DATABASE_NAME = 'crank-tools';
const DATABASE_VERSION = 1;

/**
 * Version history:
 *
 * 1 - Add staff object store
 */
export const dbConfig: DBConfig  = {
    name: DATABASE_NAME,
    version: DATABASE_VERSION,
    objectStoresMeta: [
        STAFF_METADATA,
    ]
  };
