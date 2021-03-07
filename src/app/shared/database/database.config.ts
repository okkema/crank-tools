import { DBConfig } from 'ngx-indexed-db';
import { STAFF_METADATA } from '../../pages/staff/models';
import { LOG_METADATA } from '../logger/models';

const DATABASE_NAME = 'crank-tools';
const DATABASE_VERSION = 2;

/**
 * Version history:
 *
 * 1 - Add staff object store
 * 2 - Add logs object store
 */
export const dbConfig: DBConfig  = {
    name: DATABASE_NAME,
    version: DATABASE_VERSION,
    objectStoresMeta: [
        STAFF_METADATA,
        LOG_METADATA,
    ]
  };
