import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IAddExerciseFormValues, IExercise, IExerciseDetails } from '../models/exercise';

export default class ExerciseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable exercise: IExercise | null = null;
    @observable exerciseDetails: IExerciseDetails | null = null;
    @observable exercises: IExercise[] = [];
    @observable submitting = false;
    @observable loadingInitialExercise = false;
    @observable code: string = ""

    @action createExercise = async (exercise: IAddExerciseFormValues) => {
        this.submitting = true;
        console.log(exercise);
        try {
            await agent.Exercises.create(exercise);
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

    @action loadExercises = async () => {
        this.loadingInitialExercise = true;
        try {
            const exercises = await agent.Exercises.list();
            runInAction('loading exercises', () => {
                exercises.forEach(exercise => {
                    if (this.exercises.find(x => x.name == exercise.name) == null)
                        this.exercises = [...this.exercises, exercise]
                });
            });
            this.loadingInitialExercise = false;
        } catch (error) {
            runInAction('load exercises error', () => {
                this.loadingInitialExercise = false;
            });
        }
    };

    @action loadExerciseDetails = async (id: string) => {
        this.loadingInitialExercise = true;
        try {
            const exercise = await agent.Exercises.getById(id);
            runInAction('loading exercise', () => {
                this.exerciseDetails = exercise;
                this.loadingInitialExercise = false;
            });
        } catch (error) {
            runInAction('load exercise error', () => {
                this.loadingInitialExercise = false;

            });
        }
    };
}


