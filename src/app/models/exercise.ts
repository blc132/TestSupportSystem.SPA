export interface IExercise {
    id: string;
    name: string;
    content: string;
    initialCode: string;
}


export interface IAddExerciseFormValues {
    id: string;
    name: string;
    content: string;
    initialCode: string;
    input1: string;
    output1: string;
    input2: string;
    output2: string;
    input3: string;
    output3: string;
}