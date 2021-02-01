import { IStaff } from './staff.interface';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

export class Staff implements IStaff {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    _password: string;

    public constructor(init?: Partial<IStaff>) {
        Object.assign(this, init);
        this.setPassword();
    }

    setPassword(): void {
        if (!!this.password) {this._password = hashSync(this.password, genSaltSync());}
        delete this.password;
    }

    checkPassword(password: any): boolean {
        return compareSync(password, this._password);
    }

}
