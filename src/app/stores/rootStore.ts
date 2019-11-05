import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import GroupStore from './groupStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CourseStore from './courseStore';
import ExerciseStore from './exerciseStore';

configure({ enforceActions: 'always' });

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    courseStore: CourseStore;
    groupStore: GroupStore;
    exerciseStore: ExerciseStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.courseStore = new CourseStore(this);
        this.groupStore = new GroupStore(this);
        this.exerciseStore = new ExerciseStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());