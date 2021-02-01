export interface IStaff {
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
