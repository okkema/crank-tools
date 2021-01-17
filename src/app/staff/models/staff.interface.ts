export interface IStaff {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    password: string;

    setPassword(password: string): void;
    checkPassword(password): boolean;
}