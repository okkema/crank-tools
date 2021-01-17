import { ObjectStoreMeta } from "ngx-indexed-db";

const STORE_NAME: string = 'staff';

export const StaffMetadata: ObjectStoreMeta = {
    store: STORE_NAME,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'password', keypath: 'password', options: { unique: false } }
      ]
};
