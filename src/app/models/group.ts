import { ICourse } from "./course";
import { IUser } from "./user";

export interface IGroup {
    id: string;
    name: string;
    course: ICourse;
}

export interface IGroupFormValues {
    name: string;
    course: ICourse;
}

export interface IGroupDetails {
    id: string;
    name: string;
    course: ICourse;
    members: IUser[];
}