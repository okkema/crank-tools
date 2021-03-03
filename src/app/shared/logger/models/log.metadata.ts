import { ObjectStoreMeta } from 'ngx-indexed-db';

const STORE_NAME = 'logs';
export const FIELD_NAMES: any = {
  id: 'id',
  level: 'level',
  message: 'message'
};

export const LOG_METADATA: ObjectStoreMeta = {
    store: STORE_NAME,
      storeConfig: { keyPath: FIELD_NAMES.id, autoIncrement: true },
      storeSchema: [
        { name: FIELD_NAMES.level, keypath: FIELD_NAMES.level, options: { unique: false } },
        { name: FIELD_NAMES.message, keypath: FIELD_NAMES.message, options: { unique: false } },
      ]
};
