import { IUserGroupDetails } from "./group";

export interface IUser {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token?: string;
}

export interface IUserFormValues {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
}

export interface IUserDetails {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    groups: IUserGroupDetails[]
}