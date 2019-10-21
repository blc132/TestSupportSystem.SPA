import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import { ICourse, ICourseOption } from '../models/course'
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { history } from '../..';



export default class CourseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable courseOptions: ICourseOption[] = [];
    @observable course: ICourse | null = null;
    @observable courses: ICourse[] = [];
    @observable submitting = false;
    @observable loadingInitial = false;


    @action createCourse = async (course: ICourse) => {
        this.submitting = true;
        try {
          await agent.Courses.create(course);
          runInAction('create course', () => {
            this.submitting = false;
          });
          this.rootStore.modalStore.closeModal();
          runInAction('adding group to list', () => {
            this.courses = [...this.courses, course ]
          });
          toast.info('Dodano kurs');
        } catch (error) {
          runInAction('create course error', () => {
            this.submitting = false;
          });
          toast.error('Błąd przesyłania danych');
          console.log(error.response);
        }
      };

      @action loadCoursesOptions = async () => {
        try {
          const courses = await agent.Courses.list();
          runInAction('loading courses', () => {
            courses.forEach(course => {
              if(this.courseOptions.find(x => x.key == course.id) == null)
                this.courseOptions = [...this.courseOptions, {key: course.id, value: course.id, text: course.name} ]
            });
          });
        } catch (error) {
          runInAction('load courses options error', () => {
          });
        }
      };

      @action loadCourses = async () => {
        try {
          const courses = await agent.Courses.list();
          runInAction('loading courses', () => {
            courses.forEach(course => {
              if(this.courses.find(x => x.name == course.name) == null)              
                this.courses = [...this.courses, course ]
            });
          });
        } catch (error) {
          runInAction('load courses error', () => {
          });
        }
      };
}

