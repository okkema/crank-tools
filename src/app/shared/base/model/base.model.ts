import { IBaseModel } from './base.model.interface';

export class BaseModel<T> implements IBaseModel {
    id: number;

    constructor(init?: Partial<T>) {
        Object.assign(this, init);
    }
}
