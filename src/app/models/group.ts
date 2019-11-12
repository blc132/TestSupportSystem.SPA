import { ICourse } from "./course";
import { IUser } from "./user";
import { IExerciseOverview } from "./exercise";

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
    exercises: IExerciseOverview[];
}

export interface IAddUserToGroupFormValues {
    email: string;
    groupId: string;
}

export interface IAddExerciseToGroupForm {
    exerciseName: string;
    groupId: string;
}