import { ObjectStoreMeta } from "ngx-indexed-db";

const STORE_NAME: string = 'staff';
export const FIELD_NAMES: any = {
  id: 'id',
  name: 'name',
  title: 'title',
  email: 'email',
  phone: 'phone',
  password: 'password',
}

export const StaffMetadata: ObjectStoreMeta = {
    store: STORE_NAME,
      storeConfig: { keyPath: FIELD_NAMES.id, autoIncrement: true },
      storeSchema: [
        { name: FIELD_NAMES.name, keypath: FIELD_NAMES.name, options: { unique: false } },
        { name: FIELD_NAMES.title, keypath: FIELD_NAMES.title, options: { unique: false } },
        { name: FIELD_NAMES.email, keypath: FIELD_NAMES.email, options: { unique: false } },
        { name: FIELD_NAMES.phone, keypath: FIELD_NAMES.phone, options: { unique: false } },
        { name: FIELD_NAMES.password, keypath: FIELD_NAMES.password, options: { unique: false } }
      ]
};
