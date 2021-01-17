import { IStaff } from "./staff.interface";
import { hash, compare, genSalt } from "bcryptjs";

export class Staff implements IStaff {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    async setPassword(password: string): Promise<void> {
        this.password = await hash(password, await genSalt());
    }
    
    async checkPassword(password: any): Promise<boolean> {
        return compare(password, this.password);
    }

}