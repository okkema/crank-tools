import { IStaff } from "./staff.interface";

export class Staff implements IStaff {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    setPassword(password: string): void {
        throw new Error("Method not implemented.");
    }
    
    checkPassword(password: any): boolean {
        throw new Error("Method not implemented.");
    }

}