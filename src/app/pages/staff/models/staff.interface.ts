import { IBaseModel } from 'src/app/shared/base/model';

export interface IStaff extends IBaseModel {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    _password: string;

    setPassword(): void;
    checkPassword(password): boolean;
}
