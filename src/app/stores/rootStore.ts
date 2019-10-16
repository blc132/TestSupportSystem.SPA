import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import { createContext } from 'react';
import { configure } from 'mobx';

configure({enforceActions: 'always'});

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());