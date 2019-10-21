import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import GroupStore from './groupStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CourseStore from './courseStore';

configure({enforceActions: 'always'});

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    courseStore: CourseStore;
    groupStore: GroupStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.courseStore = new CourseStore(this);
        this.groupStore = new GroupStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());