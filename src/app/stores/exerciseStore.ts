import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IAddExerciseFormValues, IExercise } from '../models/exercise';

export default class ExerciseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable exercise: IExercise | null = null;
    @observable exercises: IExercise[] = [];
    @observable submitting = false;
    @observable loadingInitial = false;
    @observable code: string = ""

    @action createExercise = async (exercise: IAddExerciseFormValues) => {
        this.submitting = true;
        console.log(exercise);
        try {
            await agent.Exercise.create(exercise);
            runInAction('create exercise', () => {
                this.submitting = false;
            });
            toast.info('Dodano zadanie');
        } catch (error) {
            runInAction('create exercise error', () => {
                this.submitting = false;
            });
            toast.error('Błąd przesyłania danych');
            console.log(error.response);
        }
    };
}


