import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CourseStore from './courseStore';

configure({enforceActions: 'always'});

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    courseStore: CourseStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.courseStore = new CourseStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());