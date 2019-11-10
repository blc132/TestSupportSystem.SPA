import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IAddExerciseFormValues, IExercise, IExerciseDetails, ISolveExerciseForm } from '../models/exercise';
import { history } from '../..';

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
        try {
            await agent.Exercises.create(exercise);
            runInAction('create exercise', () => {
                this.submitting = false;
            });
            toast.info('Dodano zadanie');
            history.push('/exercises');
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
                    if (this.exercises.find(x => x.name === exercise.name) == null)
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

    @action loadExerciseToSolve = async (id: string) => {
        const exercise = this.exercises.find(x => x.id === id)
        if (exercise != undefined) {
            runInAction('loading exercise', () => {
                this.exercise = exercise;
                this.code = exercise.initialCode;
            });
        }
        else {
            await this.loadExercises();
            const exercise = this.exercises.find(x => x.id === id)
            runInAction('loading exercise', () => {
                this.exercise = exercise == undefined ? null : exercise;
                this.code = exercise == undefined ? "" : exercise.initialCode;
            });
        }
    };

    @action solveExercise = async (exercise: ISolveExerciseForm) => {
        this.submitting = true;
        console.log(exercise);
        try {
            await agent.Exercises.solve(exercise);
            runInAction('solve exercise', () => {
                this.submitting = false;
            });
            toast.info('Wysłano zadanie do sprawdzenia!');
        } catch (error) {
            runInAction('solve exercise error', () => {
                this.submitting = false;
            });
            toast.error('Błąd przesyłania danych');
            console.log(error.response);
        }
        history.push('/exercises');
    };

    @action updateCode = async (code: string) => {
        try {
            runInAction('update code', () => {
                this.code = code;
            });
        } catch (error) {
            runInAction('update code error', () => {
            });
            console.log(error.response);
        }
    };
}


