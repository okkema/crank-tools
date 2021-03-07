import { IStaff } from './staff.interface';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { BaseModel } from 'src/app/shared/base/model';

export class Staff extends BaseModel<IStaff> implements IStaff {
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    _password: string;

    public constructor(init?: Partial<IStaff>) {
        super(init);
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
