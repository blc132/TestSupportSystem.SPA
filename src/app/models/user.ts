export interface IUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    username?: string;
}