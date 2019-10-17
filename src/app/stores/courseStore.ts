import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import { ICourse } from '../models/course'
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { history } from '../..';



export default class CourseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable course: ICourse | null = null;
    @observable submitting = false;


    @action createCourse = async (course: ICourse) => {
        this.submitting = true;
        try {
          await agent.Courses.create(course);
          runInAction('create course', () => {
            this.submitting = false;
          });
          this.rootStore.modalStore.closeModal();
          toast.info('Dodano kurs');
        } catch (error) {
          runInAction('create course error', () => {
            this.submitting = false;
          });
          toast.error('Błąd przesyłania danych');
          console.log(error.response);
        }
      };
}

