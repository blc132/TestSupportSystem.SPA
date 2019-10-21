import { ICourse, ICourseGroupFormvalues } from "./course";

export interface IGroup {
    name: string;
    course: ICourse;
}

export interface IGroupFormValues {
    name: string;
    course: ICourseGroupFormvalues;
}