import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IAddExerciseFormValues, IExercise, IExerciseDetails, ISolveExerciseForm, ISolvedExerciseDetails, IExerciseOverview } from '../models/exercise';
import { history } from '../..';

export default class ExerciseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable exercise: IExercise | null = null;
    @observable exerciseDetails: IExerciseDetails | null = null;
    @observable solvedExerciseDetails: ISolvedExerciseDetails | null = null;
    @observable exercises: IExerciseOverview[] = [];
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
                this.exercises = exercises
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

        try {
            const exercise = await agent.Exercises.getById(id);
            runInAction('loading exercise', () => {
                this.exercise = exercise;
            });
        } catch (error) {
            runInAction('loading exercise error', () => {
                this.submitting = false;
            });
            toast.error('Błąd przesyłania danych');
            console.log(error.response);
        }

    };

    @action solveExercise = async (exercise: ISolveExerciseForm) => {
        this.submitting = true;
        console.log(exercise);
        try {
            exercise.groupId = this.rootStore.groupStore.groupDetails!.id;
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
            // console.log(error.response);
        }
        history.push('/group/' + exercise.groupId);
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

    @action loadSolvedExerciseDetails = async (id: string) => {
        this.loadingInitialExercise = true;
        try {
            const groupId = this.rootStore.groupStore.groupDetails!.id;
            const solvedExercise = await agent.Exercises.getSolved(id, groupId);
            runInAction('loading exercise', () => {
                this.solvedExerciseDetails = solvedExercise;
                this.loadingInitialExercise = false;
            });
        } catch (error) {
            runInAction('load exercise error', () => {
                this.loadingInitialExercise = false;

            });
        }
    };
}


