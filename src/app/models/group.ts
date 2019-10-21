import { ICourse, ICourseGroupFormvalues } from "./course";

export interface IGroup {
    id: string;
    name: string;
    course: ICourse;
}

export interface IGroupFormValues {
    name: string;
    course: ICourse;
}