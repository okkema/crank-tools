export interface IStaff {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    setPassword(password: string): Promise<void>;
    checkPassword(password): Promise<boolean>;
}