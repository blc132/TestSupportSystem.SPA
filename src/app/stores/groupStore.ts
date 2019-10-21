import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import { ICourse } from '../models/course'
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IGroup, IGroupFormValues } from '../models/group';



export default class GroupStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable group: IGroup | null = null;
    @observable submitting = false;


    @action createGroup = async (group: IGroupFormValues) => {
        this.submitting = true;
        console.log(group);
        try {
          await agent.Groups.create(group);
          runInAction('create group', () => {
            this.submitting = false;
          });
          this.rootStore.modalStore.closeModal();
          toast.info('Dodano grupę');
        } catch (error) {
          runInAction('create group error', () => {
            this.submitting = false;
          });
          toast.error('Błąd przesyłania danych');
          console.log(error.response);
        }
      };
}

